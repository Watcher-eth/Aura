import { useQuery } from "@apollo/client"
import { tgql } from "~~/__generated__"
import { APOLLO_CLIENT } from "../../lib/providers/ApolloProvider"

const GET_BOUNTIES_FOR_ADDRESS = tgql(/* GraphQL */ `
  query GetBountiesForAddress($contractAddress1: String) {
    bountys(where: { contractAddress: $contractAddress1 }) {
      items {
        active
        contractAddress
        createdAt
        id
        rewardPool
        totalClaims
        updatedAt
      }
    }
  }
`)

export async function getBountiesForAddress(contractAddress: string) {
  const { data } = await APOLLO_CLIENT.query({
    query: GET_BOUNTIES_FOR_ADDRESS,
    variables: { contractAddress1: contractAddress },
  })
  return data?.bountys?.items
}

export function useGetBountiesForAddress(contractAddress: string) {
  const { data, loading, error, refetch } = useQuery(GET_BOUNTIES_FOR_ADDRESS, {
    variables: { contractAddress1: contractAddress },
  })

  return {
    bounties: data?.bountys?.items,
    loading,
    error,
    refetch,
  }
}