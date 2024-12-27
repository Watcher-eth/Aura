import { useQuery } from "@apollo/client"
import { tgql } from "~~/__generated__"
import { APOLLO_CLIENT } from "../../lib/providers/ApolloProvider"

const GET_REVIEWS_FOR_ADDRESS = tgql(/* GraphQL */ `
  query GetReviewsForAddress($contractAddress: String) {
    reviews(where: { contractAddress: $contractAddress }) {
      items {
        contractAddress
        createdAt
        createdBy
        id
        metadataURI
        rating
      }
    }
  }
`)

export async function getReviewsForAddress(contractAddress: string) {
  const { data } = await APOLLO_CLIENT.query({
    query: GET_REVIEWS_FOR_ADDRESS,
    variables: { contractAddress },
  })
  return data?.reviews?.items
}

export function useGetReviewsForAddress(contractAddress: string) {
  const { data, loading, error, refetch } = useQuery(GET_REVIEWS_FOR_ADDRESS, {
    variables: { contractAddress },
  })

  return {
    reviews: data?.reviews?.items,
    loading,
    error,
    refetch,
  }
}