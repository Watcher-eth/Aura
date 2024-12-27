import { useQuery } from "@apollo/client"
import { tgql } from "~~/__generated__"
import { APOLLO_CLIENT } from "../../lib/providers/ApolloProvider"

const GET_ALL_BOUNTIES = tgql(/* GraphQL */ `
  query GetAllBounties {
    bountys {
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

export async function getAllBounties() {
  const { data } = await APOLLO_CLIENT.query({
    query: GET_ALL_BOUNTIES,
  })
  return data?.bountys?.items
}

export function useGetAllBounties() {
  const { data, loading, error, refetch } = useQuery(GET_ALL_BOUNTIES)

  return {
    bounties: data?.bountys?.items,
    loading,
    error,
    refetch,
  }
}
