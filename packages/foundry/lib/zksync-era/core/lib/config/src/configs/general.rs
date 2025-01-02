use crate::{
    configs::{
        base_token_adjuster::BaseTokenAdjusterConfig,
        chain::{
            CircuitBreakerConfig, MempoolConfig, OperationsManagerConfig, StateKeeperConfig,
            TimestampAsserterConfig,
        },
        consensus::ConsensusConfig,
        da_client::DAClientConfig,
        da_dispatcher::DADispatcherConfig,
        fri_prover_group::FriProverGroupConfig,
        house_keeper::HouseKeeperConfig,
        prover_job_monitor::ProverJobMonitorConfig,
        pruning::PruningConfig,
        snapshot_recovery::SnapshotRecoveryConfig,
        vm_runner::{BasicWitnessInputProducerConfig, ProtectiveReadsWriterConfig},
        CommitmentGeneratorConfig, ExperimentalVmConfig, ExternalPriceApiClientConfig,
        FriProofCompressorConfig, FriProverConfig, FriProverGatewayConfig,
        FriWitnessGeneratorConfig, FriWitnessVectorGeneratorConfig, ObservabilityConfig,
        PrometheusConfig, ProofDataHandlerConfig,
    },
    ApiConfig, ContractVerifierConfig, DBConfig, EthConfig, ExternalProofIntegrationApiConfig,
    ObjectStoreConfig, PostgresConfig, SnapshotsCreatorConfig,
};

#[derive(Debug, Clone, PartialEq)]
pub struct GeneralConfig {
    pub postgres_config: Option<PostgresConfig>,
    pub api_config: Option<ApiConfig>,
    pub contract_verifier: Option<ContractVerifierConfig>,
    pub circuit_breaker_config: Option<CircuitBreakerConfig>,
    pub mempool_config: Option<MempoolConfig>,
    pub operations_manager_config: Option<OperationsManagerConfig>,
    pub state_keeper_config: Option<StateKeeperConfig>,
    pub house_keeper_config: Option<HouseKeeperConfig>,
    pub proof_compressor_config: Option<FriProofCompressorConfig>,
    pub prover_config: Option<FriProverConfig>,
    pub prover_gateway: Option<FriProverGatewayConfig>,
    pub witness_vector_generator: Option<FriWitnessVectorGeneratorConfig>,
    pub prover_group_config: Option<FriProverGroupConfig>,
    pub witness_generator_config: Option<FriWitnessGeneratorConfig>,
    pub prometheus_config: Option<PrometheusConfig>,
    pub proof_data_handler_config: Option<ProofDataHandlerConfig>,
    pub db_config: Option<DBConfig>,
    pub eth: Option<EthConfig>,
    pub snapshot_creator: Option<SnapshotsCreatorConfig>,
    pub observability: Option<ObservabilityConfig>,
    pub da_client_config: Option<DAClientConfig>,
    pub da_dispatcher_config: Option<DADispatcherConfig>,
    pub protective_reads_writer_config: Option<ProtectiveReadsWriterConfig>,
    pub basic_witness_input_producer_config: Option<BasicWitnessInputProducerConfig>,
    pub commitment_generator: Option<CommitmentGeneratorConfig>,
    pub snapshot_recovery: Option<SnapshotRecoveryConfig>,
    pub pruning: Option<PruningConfig>,
    pub core_object_store: Option<ObjectStoreConfig>,
    pub base_token_adjuster: Option<BaseTokenAdjusterConfig>,
    pub external_price_api_client_config: Option<ExternalPriceApiClientConfig>,
    pub consensus_config: Option<ConsensusConfig>,
    pub external_proof_integration_api_config: Option<ExternalProofIntegrationApiConfig>,
    pub experimental_vm_config: Option<ExperimentalVmConfig>,
    pub prover_job_monitor_config: Option<ProverJobMonitorConfig>,
    pub timestamp_asserter_config: Option<TimestampAsserterConfig>,
}