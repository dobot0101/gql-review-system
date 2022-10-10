import { gql } from 'apollo-server'

export default gql`
  type Query {
    reviews: [Review!]
  }
  type Mutation {
    """
    리뷰 생성
    """
    createReview(input: ReviewCreateInput!): ReviewCreatePayload!
    """
    리뷰 삭제
    """
    deleteReview(reviewId: ID!): ReviewDeletePayload!
    """
    리뷰 좋아요 생성
    """
    createReviewLike(input: ReviewLikeCreateInput!): ReviewLikeCreatePayload!
    """
    리뷰 좋아요 삭제
    """
    deleteReviewLike(reviewLikeId: ID!): ReviewLikeDeletePayload!
    """
    리뷰 싫어요 생성
    """
    createReviewHate(input: ReviewHateCreateInput!): ReveiwHateCreatePayload!
    """
    리뷰 싫어요 삭제
    """
    deleteReviewHate(reviewHateId: ID!): ReviewHateDeletePayload!
  }

  type ReviewLikeDeletePayload {
    deletedReviewLikeId: ID!
  }

  type ReviewHateDeletePayload {
    deletedReviewLikeId: ID!
  }

  input ReviewHateCreateInput {
    reviewId: ID!
    memberId: ID!
  }
  type ReveiwHateCreatePayload {
    createdReviewHate: ReviewHate!
  }

  input ReviewLikeCreateInput {
    reviewId: ID!
    memberId: ID!
  }
  type ReviewLikeCreatePayload {
    createdReviewLike: ReviewLike!
  }

  input ReviewCreateInput {
    productId: ID!
    content: String!
    keywordIds: [ID!]
  }

  type ReviewCreatePayload {
    createdReview: Review!
  }

  type ReviewDeletePayload {
    deletedReviewId: ID!
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
    # member: Member!
  }

  type ReviewHate {
    id: ID!
    review: Review!
    # member: Member!
  }

  type Member {
    id: ID!
    name: String!
    email: String!
  }
`
