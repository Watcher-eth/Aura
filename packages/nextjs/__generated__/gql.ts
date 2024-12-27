/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n  query GetActiveBounties {\n    bountys(where: { active: true }) {\n      items {\n        active\n        contractAddress\n        createdAt\n        id\n        rewardPool\n        totalClaims\n        updatedAt\n      }\n    }\n  }\n": types.GetActiveBountiesDocument,
    "\n  query GetAllBounties {\n    bountys {\n      items {\n        active\n        contractAddress\n        createdAt\n        id\n        rewardPool\n        totalClaims\n        updatedAt\n      }\n    }\n  }\n": types.GetAllBountiesDocument,
    "\n  query GetBountiesForAddress($contractAddress1: String) {\n    bountys(where: { contractAddress: $contractAddress1 }) {\n      items {\n        active\n        contractAddress\n        createdAt\n        id\n        rewardPool\n        totalClaims\n        updatedAt\n      }\n    }\n  }\n": types.GetBountiesForAddressDocument,
    "\n  query GetReviewsForAddress($contractAddress: String) {\n    reviews(where: { contractAddress: $contractAddress }) {\n      items {\n        contractAddress\n        createdAt\n        createdBy\n        id\n        metadataURI\n        rating\n      }\n    }\n  }\n": types.GetReviewsForAddressDocument,
};

/**
 * The tgql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = tgql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function tgql(source: string): unknown;

/**
 * The tgql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function tgql(source: "\n  query GetActiveBounties {\n    bountys(where: { active: true }) {\n      items {\n        active\n        contractAddress\n        createdAt\n        id\n        rewardPool\n        totalClaims\n        updatedAt\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetActiveBounties {\n    bountys(where: { active: true }) {\n      items {\n        active\n        contractAddress\n        createdAt\n        id\n        rewardPool\n        totalClaims\n        updatedAt\n      }\n    }\n  }\n"];
/**
 * The tgql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function tgql(source: "\n  query GetAllBounties {\n    bountys {\n      items {\n        active\n        contractAddress\n        createdAt\n        id\n        rewardPool\n        totalClaims\n        updatedAt\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAllBounties {\n    bountys {\n      items {\n        active\n        contractAddress\n        createdAt\n        id\n        rewardPool\n        totalClaims\n        updatedAt\n      }\n    }\n  }\n"];
/**
 * The tgql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function tgql(source: "\n  query GetBountiesForAddress($contractAddress1: String) {\n    bountys(where: { contractAddress: $contractAddress1 }) {\n      items {\n        active\n        contractAddress\n        createdAt\n        id\n        rewardPool\n        totalClaims\n        updatedAt\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetBountiesForAddress($contractAddress1: String) {\n    bountys(where: { contractAddress: $contractAddress1 }) {\n      items {\n        active\n        contractAddress\n        createdAt\n        id\n        rewardPool\n        totalClaims\n        updatedAt\n      }\n    }\n  }\n"];
/**
 * The tgql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function tgql(source: "\n  query GetReviewsForAddress($contractAddress: String) {\n    reviews(where: { contractAddress: $contractAddress }) {\n      items {\n        contractAddress\n        createdAt\n        createdBy\n        id\n        metadataURI\n        rating\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetReviewsForAddress($contractAddress: String) {\n    reviews(where: { contractAddress: $contractAddress }) {\n      items {\n        contractAddress\n        createdAt\n        createdBy\n        id\n        metadataURI\n        rating\n      }\n    }\n  }\n"];

export function tgql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;