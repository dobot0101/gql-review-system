import { gql } from 'apollo-server'

export default gql`
  type Query {
    reviews: [Review!]
  }

  type Product {
    id: ID!
    title: String
  }

  type ReviewKeyword {
    id: ID!
    title: String!
  }

  type Review {
    id: ID!
    product: Product!
    content: String!
    keywords: [ReviewKeyword!]
    likeCount: Int!
    hateCount: Int!
  }

  type ReviewLike {
    id: ID!
    review: Review!
    member: Member!
  }

  type ReviewHate {
    id: ID!
    review: Review!
    member: Member!
  }
`
