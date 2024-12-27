/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigInt: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
};

export type Meta = {
  __typename?: 'Meta';
  status?: Maybe<Scalars['JSON']['output']>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  _meta?: Maybe<Meta>;
  bounty?: Maybe<Bounty>;
  bountys: BountyPage;
  review?: Maybe<Review>;
  reviews: ReviewPage;
};


export type QueryBountyArgs = {
  id: Scalars['String']['input'];
};


export type QueryBountysArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<BountyFilter>;
};


export type QueryReviewArgs = {
  id: Scalars['String']['input'];
};


export type QueryReviewsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<ReviewFilter>;
};

export type Bounty = {
  __typename?: 'bounty';
  active: Scalars['Boolean']['output'];
  contractAddress: Scalars['String']['output'];
  createdAt: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  rewardPool: Scalars['BigInt']['output'];
  totalClaims: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
};

export type BountyFilter = {
  AND?: InputMaybe<Array<InputMaybe<BountyFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<BountyFilter>>>;
  active?: InputMaybe<Scalars['Boolean']['input']>;
  active_in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  active_not?: InputMaybe<Scalars['Boolean']['input']>;
  active_not_in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  contractAddress?: InputMaybe<Scalars['String']['input']>;
  contractAddress_contains?: InputMaybe<Scalars['String']['input']>;
  contractAddress_ends_with?: InputMaybe<Scalars['String']['input']>;
  contractAddress_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contractAddress_not?: InputMaybe<Scalars['String']['input']>;
  contractAddress_not_contains?: InputMaybe<Scalars['String']['input']>;
  contractAddress_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  contractAddress_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contractAddress_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  contractAddress_starts_with?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Int']['input']>;
  createdAt_gt?: InputMaybe<Scalars['Int']['input']>;
  createdAt_gte?: InputMaybe<Scalars['Int']['input']>;
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  createdAt_lt?: InputMaybe<Scalars['Int']['input']>;
  createdAt_lte?: InputMaybe<Scalars['Int']['input']>;
  createdAt_not?: InputMaybe<Scalars['Int']['input']>;
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  rewardPool?: InputMaybe<Scalars['BigInt']['input']>;
  rewardPool_gt?: InputMaybe<Scalars['BigInt']['input']>;
  rewardPool_gte?: InputMaybe<Scalars['BigInt']['input']>;
  rewardPool_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  rewardPool_lt?: InputMaybe<Scalars['BigInt']['input']>;
  rewardPool_lte?: InputMaybe<Scalars['BigInt']['input']>;
  rewardPool_not?: InputMaybe<Scalars['BigInt']['input']>;
  rewardPool_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  totalClaims?: InputMaybe<Scalars['Int']['input']>;
  totalClaims_gt?: InputMaybe<Scalars['Int']['input']>;
  totalClaims_gte?: InputMaybe<Scalars['Int']['input']>;
  totalClaims_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  totalClaims_lt?: InputMaybe<Scalars['Int']['input']>;
  totalClaims_lte?: InputMaybe<Scalars['Int']['input']>;
  totalClaims_not?: InputMaybe<Scalars['Int']['input']>;
  totalClaims_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  updatedAt?: InputMaybe<Scalars['Int']['input']>;
  updatedAt_gt?: InputMaybe<Scalars['Int']['input']>;
  updatedAt_gte?: InputMaybe<Scalars['Int']['input']>;
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  updatedAt_lt?: InputMaybe<Scalars['Int']['input']>;
  updatedAt_lte?: InputMaybe<Scalars['Int']['input']>;
  updatedAt_not?: InputMaybe<Scalars['Int']['input']>;
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
};

export type BountyPage = {
  __typename?: 'bountyPage';
  items: Array<Bounty>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Review = {
  __typename?: 'review';
  contractAddress: Scalars['String']['output'];
  createdAt: Scalars['Int']['output'];
  createdBy: Scalars['String']['output'];
  id: Scalars['String']['output'];
  metadataURI: Scalars['String']['output'];
  rating: Scalars['Int']['output'];
};

export type ReviewFilter = {
  AND?: InputMaybe<Array<InputMaybe<ReviewFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ReviewFilter>>>;
  contractAddress?: InputMaybe<Scalars['String']['input']>;
  contractAddress_contains?: InputMaybe<Scalars['String']['input']>;
  contractAddress_ends_with?: InputMaybe<Scalars['String']['input']>;
  contractAddress_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contractAddress_not?: InputMaybe<Scalars['String']['input']>;
  contractAddress_not_contains?: InputMaybe<Scalars['String']['input']>;
  contractAddress_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  contractAddress_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contractAddress_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  contractAddress_starts_with?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Int']['input']>;
  createdAt_gt?: InputMaybe<Scalars['Int']['input']>;
  createdAt_gte?: InputMaybe<Scalars['Int']['input']>;
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  createdAt_lt?: InputMaybe<Scalars['Int']['input']>;
  createdAt_lte?: InputMaybe<Scalars['Int']['input']>;
  createdAt_not?: InputMaybe<Scalars['Int']['input']>;
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  createdBy?: InputMaybe<Scalars['String']['input']>;
  createdBy_contains?: InputMaybe<Scalars['String']['input']>;
  createdBy_ends_with?: InputMaybe<Scalars['String']['input']>;
  createdBy_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  createdBy_not?: InputMaybe<Scalars['String']['input']>;
  createdBy_not_contains?: InputMaybe<Scalars['String']['input']>;
  createdBy_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  createdBy_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  createdBy_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  createdBy_starts_with?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  metadataURI?: InputMaybe<Scalars['String']['input']>;
  metadataURI_contains?: InputMaybe<Scalars['String']['input']>;
  metadataURI_ends_with?: InputMaybe<Scalars['String']['input']>;
  metadataURI_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  metadataURI_not?: InputMaybe<Scalars['String']['input']>;
  metadataURI_not_contains?: InputMaybe<Scalars['String']['input']>;
  metadataURI_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  metadataURI_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  metadataURI_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  metadataURI_starts_with?: InputMaybe<Scalars['String']['input']>;
  rating?: InputMaybe<Scalars['Int']['input']>;
  rating_gt?: InputMaybe<Scalars['Int']['input']>;
  rating_gte?: InputMaybe<Scalars['Int']['input']>;
  rating_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  rating_lt?: InputMaybe<Scalars['Int']['input']>;
  rating_lte?: InputMaybe<Scalars['Int']['input']>;
  rating_not?: InputMaybe<Scalars['Int']['input']>;
  rating_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
};

export type ReviewPage = {
  __typename?: 'reviewPage';
  items: Array<Review>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type GetActiveBountiesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetActiveBountiesQuery = { __typename?: 'Query', bountys: { __typename?: 'bountyPage', items: Array<{ __typename?: 'bounty', active: boolean, contractAddress: string, createdAt: number, id: string, rewardPool: any, totalClaims: number, updatedAt: number }> } };

export type GetAllBountiesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllBountiesQuery = { __typename?: 'Query', bountys: { __typename?: 'bountyPage', items: Array<{ __typename?: 'bounty', active: boolean, contractAddress: string, createdAt: number, id: string, rewardPool: any, totalClaims: number, updatedAt: number }> } };

export type GetBountiesForAddressQueryVariables = Exact<{
  contractAddress1?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetBountiesForAddressQuery = { __typename?: 'Query', bountys: { __typename?: 'bountyPage', items: Array<{ __typename?: 'bounty', active: boolean, contractAddress: string, createdAt: number, id: string, rewardPool: any, totalClaims: number, updatedAt: number }> } };

export type GetReviewsForAddressQueryVariables = Exact<{
  contractAddress?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetReviewsForAddressQuery = { __typename?: 'Query', reviews: { __typename?: 'reviewPage', items: Array<{ __typename?: 'review', contractAddress: string, createdAt: number, createdBy: string, id: string, metadataURI: string, rating: number }> } };


export const GetActiveBountiesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetActiveBounties"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bountys"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"active"},"value":{"kind":"BooleanValue","value":true}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"contractAddress"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rewardPool"}},{"kind":"Field","name":{"kind":"Name","value":"totalClaims"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<GetActiveBountiesQuery, GetActiveBountiesQueryVariables>;
export const GetAllBountiesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllBounties"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bountys"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"contractAddress"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rewardPool"}},{"kind":"Field","name":{"kind":"Name","value":"totalClaims"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllBountiesQuery, GetAllBountiesQueryVariables>;
export const GetBountiesForAddressDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBountiesForAddress"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contractAddress1"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bountys"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"contractAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contractAddress1"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"contractAddress"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rewardPool"}},{"kind":"Field","name":{"kind":"Name","value":"totalClaims"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<GetBountiesForAddressQuery, GetBountiesForAddressQueryVariables>;
export const GetReviewsForAddressDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetReviewsForAddress"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contractAddress"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reviews"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"contractAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contractAddress"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contractAddress"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"metadataURI"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}}]}}]}}]}}]} as unknown as DocumentNode<GetReviewsForAddressQuery, GetReviewsForAddressQueryVariables>;