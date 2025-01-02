#![allow(clippy::upper_case_acronyms, clippy::derive_partial_eq_without_eq)]

use std::str::FromStr;

use tokio::sync::oneshot;

pub mod temp_config_store;

/// Sets up an interrupt handler and returns a future that resolves once an interrupt signal
/// is received.
pub fn setup_sigint_handler() -> oneshot::Receiver<()> {
    let (sigint_sender, sigint_receiver) = oneshot::channel();
    let mut sigint_sender = Some(sigint_sender);
    ctrlc::set_handler(move || {
        if let Some(sigint_sender) = sigint_sender.take() {
            sigint_sender.send(()).ok();
            // ^ The send fails if `sigint_receiver` is dropped. We're OK with this,
            // since at this point the node should be stopping anyway, or is not interested
            // in listening to interrupt signals.
        }
    })
    .expect("Error setting Ctrl+C handler");

    sigint_receiver
}

#[derive(Debug, Clone, Copy, PartialEq)]
pub enum Component {
    /// Public Web3 API running on HTTP server.
    HttpApi,
    /// Public Web3 API (including PubSub) running on WebSocket server.
    WsApi,
    /// REST API for contract verification.
    ContractVerificationApi,
    /// Metadata calculator.
    Tree,
    /// Merkle tree API.
    TreeApi,
    EthWatcher,
    /// Eth tx generator.
    EthTxAggregator,
    /// Manager for eth tx.
    EthTxManager,
    /// State keeper.
    StateKeeper,
    /// Component for housekeeping task such as cleaning blobs from GCS, reporting metrics etc.
    Housekeeper,
    /// Component for exposing APIs to prover for providing proof generation data and accepting proofs.
    ProofDataHandler,
    /// Component generating BFT consensus certificates for L2 blocks.
    Consensus,
    /// Component generating commitment for L1 batches.
    CommitmentGenerator,
    /// Component sending a pubdata to the DA layers.
    DADispatcher,
    /// VM runner-based component that saves protective reads to Postgres.
    VmRunnerProtectiveReads,
    /// A component to fetch and persist ETH<->BaseToken conversion ratios for chains with custom base tokens.
    BaseTokenRatioPersister,
    /// VM runner-based component that saves VM execution data for basic witness generation.
    VmRunnerBwip,
    /// External prover API that is used to retrieve data for proving and verifies final proofs against ones, generated by us
    ExternalProofIntegrationApi,
    /// VM runner-based component that allows to test experimental VM features. Doesn't save any data to Postgres.
    VmPlayground,
}

#[derive(Debug)]
pub struct Components(pub Vec<Component>);

impl FromStr for Components {
    type Err = String;

    fn from_str(s: &str) -> Result<Components, String> {
        match s {
            "api" => Ok(Components(vec![
                Component::HttpApi,
                Component::WsApi,
                Component::ContractVerificationApi,
            ])),
            "http_api" => Ok(Components(vec![Component::HttpApi])),
            "ws_api" => Ok(Components(vec![Component::WsApi])),
            "contract_verification_api" => Ok(Components(vec![Component::ContractVerificationApi])),
            "tree" => Ok(Components(vec![Component::Tree])),
            "tree_api" => Ok(Components(vec![Component::TreeApi])),
            "state_keeper" => Ok(Components(vec![Component::StateKeeper])),
            "housekeeper" => Ok(Components(vec![Component::Housekeeper])),
            "eth" => Ok(Components(vec![
                Component::EthWatcher,
                Component::EthTxAggregator,
                Component::EthTxManager,
            ])),
            "eth_watcher" => Ok(Components(vec![Component::EthWatcher])),
            "eth_tx_aggregator" => Ok(Components(vec![Component::EthTxAggregator])),
            "eth_tx_manager" => Ok(Components(vec![Component::EthTxManager])),
            "proof_data_handler" => Ok(Components(vec![Component::ProofDataHandler])),
            "consensus" => Ok(Components(vec![Component::Consensus])),
            "commitment_generator" => Ok(Components(vec![Component::CommitmentGenerator])),
            "da_dispatcher" => Ok(Components(vec![Component::DADispatcher])),
            "vm_runner_protective_reads" => {
                Ok(Components(vec![Component::VmRunnerProtectiveReads]))
            }
            "base_token_ratio_persister" => {
                Ok(Components(vec![Component::BaseTokenRatioPersister]))
            }
            "vm_runner_bwip" => Ok(Components(vec![Component::VmRunnerBwip])),
            "vm_playground" => Ok(Components(vec![Component::VmPlayground])),
            "external_proof_integration_api" => {
                Ok(Components(vec![Component::ExternalProofIntegrationApi]))
            }
            other => Err(format!("{} is not a valid component name", other)),
        }
    }
}