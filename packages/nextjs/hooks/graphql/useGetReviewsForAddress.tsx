import { useQuery } from "@apollo/client"
import { tgql } from "@/__generated__"
import { APOLLO_CLIENT} from "../../lib/providers/ApolloProvider"

const GET_ONCHAIN_MARKET = tgql(/* GraphQL */ `
  query getMarketById($id: BigInt!) {
    market(id: $id) {
      id
      marketId
      createdAt
      initialProb
      liquidityTotal
      liquidityBalanceUsdc
      outcomeA
      outcomeB
      outcomeOddsA
      outcomeOddsB
      outcome
      proposedAt
      question
      cover
      operator
      proposedOutcome
      title
      usdcStake
      topicId
      userAddress
      topic {
        id
        title
        description
        image
      }
    }
  }
`)

export async function getMarketById(id: string) {
  const { data } = await APOLLO_CLIENT.query({
    query: GET_ONCHAIN_MARKET,
    variables: { id: String(id) },
  })
  return data?.market
}

export function useGetMarketById(id: string) {
  const { data, loading, error, refetch } = useQuery(GET_ONCHAIN_MARKET, {
    variables: { id: String(id) },
  })

  return {
    market: data?.market,
    loading,
    error,
    refetch,
  }
}