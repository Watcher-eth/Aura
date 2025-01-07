import { StorageClient, testnet } from "@lens-protocol/storage-node-client";

// Create a singleton instance of the storage client
export const storageClient = StorageClient.create(testnet);
