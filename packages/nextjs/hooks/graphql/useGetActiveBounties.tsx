import { useQuery } from "@apollo/client"
import { tgql } from "~~/__generated__"
import { APOLLO_CLIENT } from "../../lib/providers/ApolloProvider"

const GET_ACTIVE_BOUNTIES = tgql(/* GraphQL */ `
  query GetActiveBounties {
    bountys(where: { active: true }) {
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

export async function getActiveBounties() {
  const { data } = await APOLLO_CLIENT.query({
    query: GET_ACTIVE_BOUNTIES,
  })
  return data?.bountys?.items
}

export function useGetActiveBounties() {
  const { data, loading, error, refetch } = useQuery(GET_ACTIVE_BOUNTIES)

  return {
    bounties: data?.bountys?.items,
    loading,
    error,
    refetch,
  }
}
