use tokio::sync::watch;
use zksync_config::configs::eth_sender::SenderConfig;
use zksync_contracts::BaseSystemContractsHashes;
use zksync_dal::{Connection, ConnectionPool, Core, CoreDal};
use zksync_eth_client::{BoundEthInterface, CallFunctionArgs, ContractCallError};
use zksync_health_check::{Health, HealthStatus, HealthUpdater, ReactiveHealthCheck};
use zksync_l1_contract_interface::{
    i_executor::{
        commit::kzg::{KzgInfo, ZK_SYNC_BYTES_PER_BLOB},
        methods::CommitBatches,
    },
    multicall3::{Multicall3Call, Multicall3Result},
    Tokenizable, Tokenize,
};
use zksync_shared_metrics::BlockL1Stage;
use zksync_types::{
    aggregated_operations::AggregatedActionType,
    commitment::{L1BatchCommitmentMode, L1BatchWithMetadata, SerializeCommitment},
    eth_sender::{EthTx, EthTxBlobSidecar, EthTxBlobSidecarV1, SidecarBlobV1},
    ethabi::{Function, Token},
    l2_to_l1_log::UserL2ToL1Log,
    protocol_version::{L1VerifierConfig, PACKED_SEMVER_MINOR_MASK},
    pubdata_da::PubdataSendingMode,
    settlement::SettlementMode,
    web3::{contract::Error as Web3ContractError, BlockNumber},
    Address, L2ChainId, ProtocolVersionId, SLChainId, H256, U256,
};

use super::aggregated_operations::AggregatedOperation;
use crate::{
    health::{EthTxAggregatorHealthDetails, EthTxDetails},
    metrics::{PubdataKind, METRICS},
    publish_criterion::L1GasCriterion,
    zksync_functions::ZkSyncFunctions,
    Aggregator, EthSenderError,
};

/// Data queried from L1 using multicall contract.
#[derive(Debug)]
#[allow(dead_code)]
pub struct MulticallData {
    pub base_system_contracts_hashes: BaseSystemContractsHashes,
    pub verifier_address: Address,
    pub protocol_version_id: ProtocolVersionId,
}

/// The component is responsible for aggregating l1 batches into eth_txs:
/// Such as CommitBlocks, PublishProofBlocksOnchain and ExecuteBlock
/// These eth_txs will be used as a queue for generating signed txs and send them later
#[derive(Debug)]
pub struct EthTxAggregator {
    aggregator: Aggregator,
    eth_client: Box<dyn BoundEthInterface>,
    config: SenderConfig,
    timelock_contract_address: Address,
    l1_multicall3_address: Address,
    pub(super) state_transition_chain_contract: Address,
    functions: ZkSyncFunctions,
    base_nonce: u64,
    base_nonce_custom_commit_sender: Option<u64>,
    rollup_chain_id: L2ChainId,
    /// If set to `Some` node is operating in the 4844 mode with two operator
    /// addresses at play: the main one and the custom address for sending commit
    /// transactions. The `Some` then contains the address of this custom operator
    /// address.
    custom_commit_sender_addr: Option<Address>,
    pool: ConnectionPool<Core>,
    settlement_mode: SettlementMode,
    sl_chain_id: SLChainId,
    health_updater: HealthUpdater,
}

struct TxData {
    calldata: Vec<u8>,
    sidecar: Option<EthTxBlobSidecar>,
}

const FFLONK_VERIFIER_TYPE: i32 = 1;

impl EthTxAggregator {
    #[allow(clippy::too_many_arguments)]
    pub async fn new(
        pool: ConnectionPool<Core>,
        config: SenderConfig,
        aggregator: Aggregator,
        eth_client: Box<dyn BoundEthInterface>,
        timelock_contract_address: Address,
        l1_multicall3_address: Address,
        state_transition_chain_contract: Address,
        rollup_chain_id: L2ChainId,
        custom_commit_sender_addr: Option<Address>,
        settlement_mode: SettlementMode,
    ) -> Self {
        let eth_client = eth_client.for_component("eth_tx_aggregator");
        let functions = ZkSyncFunctions::default();
        let base_nonce = eth_client.pending_nonce().await.unwrap().as_u64();

        let base_nonce_custom_commit_sender = match custom_commit_sender_addr {
            Some(addr) => Some(
                (*eth_client)
                    .as_ref()
                    .nonce_at_for_account(addr, BlockNumber::Pending)
                    .await
                    .unwrap()
                    .as_u64(),
            ),
            None => None,
        };

        let sl_chain_id = (*eth_client).as_ref().fetch_chain_id().await.unwrap();

        Self {
            config,
            aggregator,
            eth_client,
            timelock_contract_address,
            l1_multicall3_address,
            state_transition_chain_contract,
            functions,
            base_nonce,
            base_nonce_custom_commit_sender,
            rollup_chain_id,
            custom_commit_sender_addr,
            pool,
            settlement_mode,
            sl_chain_id,
            health_updater: ReactiveHealthCheck::new("eth_tx_aggregator").1,
        }
    }

    pub async fn run(mut self, stop_receiver: watch::Receiver<bool>) -> anyhow::Result<()> {
        self.health_updater
            .update(Health::from(HealthStatus::Ready));

        tracing::info!(
            "Initialized eth_tx_aggregator with is_pre_fflonk_verifier: {:?}",
            self.config.is_verifier_pre_fflonk
        );

        let pool = self.pool.clone();
        loop {
            let mut storage = pool.connection_tagged("eth_sender").await.unwrap();

            if *stop_receiver.borrow() {
                tracing::info!("Stop signal received, eth_tx_aggregator is shutting down");
                break;
            }

            if let Err(err) = self.loop_iteration(&mut storage).await {
                // Web3 API request failures can cause this,
                // and anything more important is already properly reported.
                tracing::warn!("eth_sender error {err:?}");
            }

            tokio::time::sleep(self.config.aggregate_tx_poll_period()).await;
        }
        Ok(())
    }

    pub(super) async fn get_multicall_data(&mut self) -> Result<MulticallData, EthSenderError> {
        let (calldata, evm_emulator_hash_requested) = self.generate_calldata_for_multicall();
        let args = CallFunctionArgs::new(&self.functions.aggregate3.name, calldata).for_contract(
            self.l1_multicall3_address,
            &self.functions.multicall_contract,
        );
        let aggregate3_result: Token = args.call((*self.eth_client).as_ref()).await?;
        self.parse_multicall_data(aggregate3_result, evm_emulator_hash_requested)
    }

    // Multicall's aggregate function accepts 1 argument - arrays of different contract calls.
    // The role of the method below is to tokenize input for multicall, which is actually a vector of tokens.
    // Each token describes a specific contract call.
    pub(super) fn generate_calldata_for_multicall(&self) -> (Vec<Token>, bool) {
        const ALLOW_FAILURE: bool = false;

        // First zksync contract call
        let get_l2_bootloader_hash_input = self
            .functions
            .get_l2_bootloader_bytecode_hash
            .encode_input(&[])
            .unwrap();
        let get_bootloader_hash_call = Multicall3Call {
            target: self.state_transition_chain_contract,
            allow_failure: ALLOW_FAILURE,
            calldata: get_l2_bootloader_hash_input,
        };

        // Second zksync contract call
        let get_l2_default_aa_hash_input = self
            .functions
            .get_l2_default_account_bytecode_hash
            .encode_input(&[])
            .unwrap();
        let get_default_aa_hash_call = Multicall3Call {
            target: self.state_transition_chain_contract,
            allow_failure: ALLOW_FAILURE,
            calldata: get_l2_default_aa_hash_input,
        };

        // Third zksync contract call
        let get_verifier_params_input = self
            .functions
            .get_verifier_params
            .encode_input(&[])
            .unwrap();
        let get_verifier_params_call = Multicall3Call {
            target: self.state_transition_chain_contract,
            allow_failure: ALLOW_FAILURE,
            calldata: get_verifier_params_input,
        };

        // Fourth zksync contract call
        let get_verifier_input = self.functions.get_verifier.encode_input(&[]).unwrap();
        let get_verifier_call = Multicall3Call {
            target: self.state_transition_chain_contract,
            allow_failure: ALLOW_FAILURE,
            calldata: get_verifier_input,
        };

        // Fifth zksync contract call
        let get_protocol_version_input = self
            .functions
            .get_protocol_version
            .encode_input(&[])
            .unwrap();
        let get_protocol_version_call = Multicall3Call {
            target: self.state_transition_chain_contract,
            allow_failure: ALLOW_FAILURE,
            calldata: get_protocol_version_input,
        };

        let mut token_vec = vec![
            get_bootloader_hash_call.into_token(),
            get_default_aa_hash_call.into_token(),
            get_verifier_params_call.into_token(),
            get_verifier_call.into_token(),
            get_protocol_version_call.into_token(),
        ];

        let mut evm_emulator_hash_requested = false;
        let get_l2_evm_emulator_hash_input = self
            .functions
            .get_evm_emulator_bytecode_hash
            .as_ref()
            .and_then(|f| f.encode_input(&[]).ok());
        if let Some(input) = get_l2_evm_emulator_hash_input {
            let call = Multicall3Call {
                target: self.state_transition_chain_contract,
                allow_failure: ALLOW_FAILURE,
                calldata: input,
            };
            token_vec.insert(2, call.into_token());
            evm_emulator_hash_requested = true;
        }

        (token_vec, evm_emulator_hash_requested)
    }

    // The role of the method below is to de-tokenize multicall call's result, which is actually a token.
    // This token is an array of tuples like `(bool, bytes)`, that contain the status and result for each contract call.
    pub(super) fn parse_multicall_data(
        &self,
        token: Token,
        evm_emulator_hash_requested: bool,
    ) -> Result<MulticallData, EthSenderError> {
        let parse_error = |tokens: &[Token]| {
            Err(EthSenderError::Parse(Web3ContractError::InvalidOutputType(
                format!("Failed to parse multicall token: {:?}", tokens),
            )))
        };

        if let Token::Array(call_results) = token {
            let number_of_calls = if evm_emulator_hash_requested { 6 } else { 5 };
            // 5 or 6 calls are aggregated in multicall
            if call_results.len() != number_of_calls {
                return parse_error(&call_results);
            }
            let mut call_results_iterator = call_results.into_iter();

            let multicall3_bootloader =
                Multicall3Result::from_token(call_results_iterator.next().unwrap())?.return_data;

            if multicall3_bootloader.len() != 32 {
                return Err(EthSenderError::Parse(Web3ContractError::InvalidOutputType(
                    format!(
                        "multicall3 bootloader hash data is not of the len of 32: {:?}",
                        multicall3_bootloader
                    ),
                )));
            }
            let bootloader = H256::from_slice(&multicall3_bootloader);

            let multicall3_default_aa =
                Multicall3Result::from_token(call_results_iterator.next().unwrap())?.return_data;
            if multicall3_default_aa.len() != 32 {
                return Err(EthSenderError::Parse(Web3ContractError::InvalidOutputType(
                    format!(
                        "multicall3 default aa hash data is not of the len of 32: {:?}",
                        multicall3_default_aa
                    ),
                )));
            }
            let default_aa = H256::from_slice(&multicall3_default_aa);

            let evm_emulator = if evm_emulator_hash_requested {
                let multicall3_evm_emulator =
                    Multicall3Result::from_token(call_results_iterator.next().unwrap())?
                        .return_data;
                if multicall3_evm_emulator.len() != 32 {
                    return Err(EthSenderError::Parse(Web3ContractError::InvalidOutputType(
                        format!(
                            "multicall3 EVM emulator hash data is not of the len of 32: {:?}",
                            multicall3_evm_emulator
                        ),
                    )));
                }
                Some(H256::from_slice(&multicall3_evm_emulator))
            } else {
                None
            };

            let base_system_contracts_hashes = BaseSystemContractsHashes {
                bootloader,
                default_aa,
                evm_emulator,
            };

            call_results_iterator.next().unwrap(); // FIXME: why is this value requested?

            let multicall3_verifier_address =
                Multicall3Result::from_token(call_results_iterator.next().unwrap())?.return_data;
            if multicall3_verifier_address.len() != 32 {
                return Err(EthSenderError::Parse(Web3ContractError::InvalidOutputType(
                    format!(
                        "multicall3 verifier address data is not of the len of 32: {:?}",
                        multicall3_verifier_address
                    ),
                )));
            }
            let verifier_address = Address::from_slice(&multicall3_verifier_address[12..]);

            let multicall3_protocol_version =
                Multicall3Result::from_token(call_results_iterator.next().unwrap())?.return_data;
            if multicall3_protocol_version.len() != 32 {
                return Err(EthSenderError::Parse(Web3ContractError::InvalidOutputType(
                    format!(
                        "multicall3 protocol version data is not of the len of 32: {:?}",
                        multicall3_protocol_version
                    ),
                )));
            }

            let protocol_version = U256::from_big_endian(&multicall3_protocol_version);
            // In case the protocol version is smaller than `PACKED_SEMVER_MINOR_MASK`, it will mean that it is
            // equal to the `protocol_version_id` value, since it the interface from before the semver was supported.
            let protocol_version_id = if protocol_version < U256::from(PACKED_SEMVER_MINOR_MASK) {
                ProtocolVersionId::try_from(protocol_version.as_u32() as u16).unwrap()
            } else {
                ProtocolVersionId::try_from_packed_semver(protocol_version).unwrap()
            };

            return Ok(MulticallData {
                base_system_contracts_hashes,
                verifier_address,
                protocol_version_id,
            });
        }
        parse_error(&[token])
    }

    /// Loads current verifier config on L1
    async fn get_snark_wrapper_vk_hash(
        &mut self,
        verifier_address: Address,
    ) -> Result<H256, EthSenderError> {
        let get_vk_hash = &self.functions.verification_key_hash;

        let vk_hash: H256 = CallFunctionArgs::new(&get_vk_hash.name, ())
            .for_contract(verifier_address, &self.functions.verifier_contract)
            .call((*self.eth_client).as_ref())
            .await?;
        Ok(vk_hash)
    }

    async fn get_fflonk_snark_wrapper_vk_hash(
        &mut self,
        verifier_address: Address,
    ) -> Result<Option<H256>, EthSenderError> {
        let get_vk_hash = &self.functions.verification_key_hash;
        // We are getting function separately to get the second function with the same name, but
        // overriden one
        let function = self
            .functions
            .verifier_contract
            .functions_by_name(&get_vk_hash.name)
            .map_err(|x| EthSenderError::ContractCall(ContractCallError::Function(x)))?
            .get(1);

        if let Some(function) = function {
            let vk_hash: Option<H256> =
                CallFunctionArgs::new(&get_vk_hash.name, U256::from(FFLONK_VERIFIER_TYPE))
                    .for_contract(verifier_address, &self.functions.verifier_contract)
                    .call_with_function((*self.eth_client).as_ref(), function.clone())
                    .await
                    .ok();
            Ok(vk_hash)
        } else {
            Ok(None)
        }
    }

    #[tracing::instrument(skip_all, name = "EthTxAggregator::loop_iteration")]
    async fn loop_iteration(
        &mut self,
        storage: &mut Connection<'_, Core>,
    ) -> Result<(), EthSenderError> {
        let MulticallData {
            base_system_contracts_hashes,
            verifier_address,
            protocol_version_id,
        } = self.get_multicall_data().await.map_err(|err| {
            tracing::error!("Failed to get multicall data {err:?}");
            err
        })?;

        let snark_wrapper_vk_hash = self
            .get_snark_wrapper_vk_hash(verifier_address)
            .await
            .map_err(|err| {
                tracing::error!("Failed to get VK hash from the Verifier {err:?}");
                err
            })?;
        let fflonk_snark_wrapper_vk_hash = self
            .get_fflonk_snark_wrapper_vk_hash(verifier_address)
            .await
            .map_err(|err| {
                tracing::error!("Failed to get FFLONK VK hash from the Verifier {err:?}");
                err
            })?;

        let l1_verifier_config = L1VerifierConfig {
            snark_wrapper_vk_hash,
            fflonk_snark_wrapper_vk_hash,
        };
        if let Some(agg_op) = self
            .aggregator
            .get_next_ready_operation(
                storage,
                base_system_contracts_hashes,
                protocol_version_id,
                l1_verifier_config,
            )
            .await
        {
            if self.config.tx_aggregation_paused {
                tracing::info!(
                    "Skipping sending operation of type {} for batches {}-{} \
                as tx_aggregation_paused=true",
                    agg_op.get_action_type(),
                    agg_op.l1_batch_range().start(),
                    agg_op.l1_batch_range().end()
                );
                return Ok(());
            }
            if self.config.tx_aggregation_only_prove_and_execute && !agg_op.is_prove_or_execute() {
                tracing::info!(
                    "Skipping sending commit operation for batches {}-{} \
                as tx_aggregation_only_prove_and_execute=true",
                    agg_op.l1_batch_range().start(),
                    agg_op.l1_batch_range().end()
                );
                return Ok(());
            }
            let is_gateway = self.settlement_mode.is_gateway();
            let tx = self.save_eth_tx(storage, &agg_op, is_gateway).await?;
            Self::report_eth_tx_saving(storage, &agg_op, &tx).await;

            self.health_updater.update(
                EthTxAggregatorHealthDetails {
                    last_saved_tx: EthTxDetails::new(&tx, None),
                }
                .into(),
            );
        }
        Ok(())
    }

    async fn report_eth_tx_saving(
        storage: &mut Connection<'_, Core>,
        aggregated_op: &AggregatedOperation,
        tx: &EthTx,
    ) {
        let l1_batch_number_range = aggregated_op.l1_batch_range();
        tracing::info!(
            "eth_tx with ID {} for op {} was saved for L1 batches {l1_batch_number_range:?}",
            tx.id,
            aggregated_op.get_action_caption()
        );

        if let AggregatedOperation::Commit(_, l1_batches, _) = aggregated_op {
            for batch in l1_batches {
                METRICS.pubdata_size[&PubdataKind::StateDiffs]
                    .observe(batch.metadata.state_diffs_compressed.len());
                METRICS.pubdata_size[&PubdataKind::UserL2ToL1Logs]
                    .observe(batch.header.l2_to_l1_logs.len() * UserL2ToL1Log::SERIALIZED_SIZE);
                METRICS.pubdata_size[&PubdataKind::LongL2ToL1Messages]
                    .observe(batch.header.l2_to_l1_messages.iter().map(Vec::len).sum());
                METRICS.pubdata_size[&PubdataKind::RawPublishedBytecodes]
                    .observe(batch.raw_published_factory_deps.iter().map(Vec::len).sum());
            }
        }

        let range_size = l1_batch_number_range.end().0 - l1_batch_number_range.start().0 + 1;
        METRICS.block_range_size[&aggregated_op.get_action_type().into()]
            .observe(range_size.into());
        METRICS
            .track_eth_tx_metrics(storage, BlockL1Stage::Saved, tx)
            .await;
    }

    fn encode_aggregated_op(&self, op: &AggregatedOperation) -> TxData {
        let mut args = vec![Token::Uint(self.rollup_chain_id.as_u64().into())];
        let is_op_pre_gateway = op.protocol_version().is_pre_gateway();

        let (calldata, sidecar) = match op {
            AggregatedOperation::Commit(last_committed_l1_batch, l1_batches, pubdata_da) => {
                let commit_batches = CommitBatches {
                    last_committed_l1_batch,
                    l1_batches,
                    pubdata_da: *pubdata_da,
                    mode: self.aggregator.mode(),
                };
                let commit_data_base = commit_batches.into_tokens();

                args.extend(commit_data_base);
                let commit_data = args;
                let encoding_fn = if is_op_pre_gateway {
                    &self.functions.post_shared_bridge_commit
                } else {
                    &self.functions.post_gateway_commit
                };

                let l1_batch_for_sidecar =
                    if PubdataSendingMode::Blobs == self.aggregator.pubdata_da() {
                        Some(l1_batches[0].clone())
                    } else {
                        None
                    };

                Self::encode_commit_data(encoding_fn, &commit_data, l1_batch_for_sidecar)
            }
            AggregatedOperation::PublishProofOnchain(op) => {
                args.extend(op.conditional_into_tokens(self.config.is_verifier_pre_fflonk));
                let encoding_fn = if is_op_pre_gateway {
                    &self.functions.post_shared_bridge_prove
                } else {
                    &self.functions.post_gateway_prove
                };
                let calldata = encoding_fn
                    .encode_input(&args)
                    .expect("Failed to encode prove transaction data");
                (calldata, None)
            }
            AggregatedOperation::Execute(op) => {
                args.extend(op.into_tokens());
                let encoding_fn = if is_op_pre_gateway {
                    &self.functions.post_shared_bridge_execute
                } else {
                    &self.functions.post_gateway_execute
                };
                let calldata = encoding_fn
                    .encode_input(&args)
                    .expect("Failed to encode execute transaction data");
                (calldata, None)
            }
        };
        TxData { calldata, sidecar }
    }

    fn encode_commit_data(
        commit_fn: &Function,
        commit_payload: &[Token],
        l1_batch: Option<L1BatchWithMetadata>,
    ) -> (Vec<u8>, Option<EthTxBlobSidecar>) {
        let calldata = commit_fn
            .encode_input(commit_payload)
            .expect("Failed to encode commit transaction data");

        let sidecar = match l1_batch {
            None => None,
            Some(l1_batch) => {
                let sidecar = l1_batch
                    .header
                    .pubdata_input
                    .clone()
                    .unwrap()
                    .chunks(ZK_SYNC_BYTES_PER_BLOB)
                    .map(|blob| {
                        let kzg_info = KzgInfo::new(blob);
                        SidecarBlobV1 {
                            blob: kzg_info.blob.to_vec(),
                            commitment: kzg_info.kzg_commitment.to_vec(),
                            proof: kzg_info.blob_proof.to_vec(),
                            versioned_hash: kzg_info.versioned_hash.to_vec(),
                        }
                    })
                    .collect::<Vec<SidecarBlobV1>>();

                let eth_tx_blob_sidecar = EthTxBlobSidecarV1 { blobs: sidecar };
                Some(eth_tx_blob_sidecar.into())
            }
        };

        (calldata, sidecar)
    }

    pub(super) async fn save_eth_tx(
        &self,
        storage: &mut Connection<'_, Core>,
        aggregated_op: &AggregatedOperation,
        is_gateway: bool,
    ) -> Result<EthTx, EthSenderError> {
        let mut transaction = storage.start_transaction().await.unwrap();
        let op_type = aggregated_op.get_action_type();
        // We may be using a custom sender for commit transactions, so use this
        // var whatever it actually is: a `None` for single-addr operator or `Some`
        // for multi-addr operator in 4844 mode.
        let sender_addr = match (op_type, is_gateway) {
            (AggregatedActionType::Commit, false) => self.custom_commit_sender_addr,
            (_, _) => None,
        };
        let nonce = self.get_next_nonce(&mut transaction, sender_addr).await?;
        let encoded_aggregated_op = self.encode_aggregated_op(aggregated_op);
        let l1_batch_number_range = aggregated_op.l1_batch_range();

        let eth_tx_predicted_gas = match (op_type, is_gateway, self.aggregator.mode()) {
            (AggregatedActionType::Execute, false, _) => Some(
                L1GasCriterion::total_execute_gas_amount(
                    &mut transaction,
                    l1_batch_number_range.clone(),
                )
                .await,
            ),
            (AggregatedActionType::Commit, false, L1BatchCommitmentMode::Validium) => Some(
                L1GasCriterion::total_validium_commit_gas_amount(l1_batch_number_range.clone()),
            ),
            _ => None,
        };

        let eth_tx = transaction
            .eth_sender_dal()
            .save_eth_tx(
                nonce,
                encoded_aggregated_op.calldata,
                op_type,
                self.timelock_contract_address,
                eth_tx_predicted_gas,
                sender_addr,
                encoded_aggregated_op.sidecar,
                is_gateway,
            )
            .await
            .unwrap();

        transaction
            .eth_sender_dal()
            .set_chain_id(eth_tx.id, self.sl_chain_id.0)
            .await
            .unwrap();

        transaction
            .blocks_dal()
            .set_eth_tx_id(l1_batch_number_range, eth_tx.id, op_type)
            .await
            .unwrap();
        transaction.commit().await.unwrap();
        Ok(eth_tx)
    }

    async fn get_next_nonce(
        &self,
        storage: &mut Connection<'_, Core>,
        from_addr: Option<Address>,
    ) -> Result<u64, EthSenderError> {
        let is_gateway = self.settlement_mode.is_gateway();
        let db_nonce = storage
            .eth_sender_dal()
            .get_next_nonce(from_addr, is_gateway)
            .await
            .unwrap()
            .unwrap_or(0);
        // Between server starts we can execute some txs using operator account or remove some txs from the database
        // At the start we have to consider this fact and get the max nonce.
        Ok(if from_addr.is_none() {
            db_nonce.max(self.base_nonce)
        } else {
            db_nonce.max(
                self.base_nonce_custom_commit_sender
                    .expect("custom base nonce is expected to be initialized; qed"),
            )
        })
    }

    /// Returns the health check for eth tx aggregator.
    pub fn health_check(&self) -> ReactiveHealthCheck {
        self.health_updater.subscribe()
    }
}