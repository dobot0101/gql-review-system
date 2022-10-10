import DataLoader from 'dataloader'
import {
  products,
  reviewHates,
  reviewKeywords,
  reviewLikes,
  reviews,
} from '../datas'
import { Review, ReviewLike } from '../types'

type ReviewCreateInput = {
  productId: number
  content: string
  keywordIds: number[]
}
type ReviewCreatePayload = {
  createdReview: Review
}

export default {
  Query: {
    reviews: () => reviews,
  },
  Mutation: {
    // createReview: (parent, args, context, info): ReviewCreatePayload => {
    createReview: (
      _: any,
      args: { input: ReviewCreateInput }
    ): ReviewCreatePayload => {
      const { input } = args
      console.log(input)
      const newReview = {
        id: reviews.length + 1,
        content: input.content,
        keywordIds: input.keywordIds.map((keywordId) => Number(keywordId)),
        productId: Number(input.productId),
      }
      reviews.push(newReview)
      console.log(reviews)
      return {
        createdReview: newReview,
      }
    },
    deleteReview: (_: any, args: any) => {
      const { reviewId } = args
      const foundReviewIndex = reviews.findIndex(
        (review) => review.id === Number(reviewId)
      )

      if (foundReviewIndex > -1) {
        reviews.splice(foundReviewIndex, 1)
      }

      return {
        deletedReviewId: reviewId,
      }
    },
    createReviewLike: (_: any, args: any) => {
      const { input } = args
      const newReviewLike = {
        id: reviewLikes.length + 1,
        memberId: Number(input.memberId),
        reviewId: Number(input.reviewId),
      }
      reviewLikes.push(newReviewLike)

      return {
        createdReviewLike: newReviewLike,
      }
    },
    deleteReviewLike: (_: any, args: any) => {
      const { reviewLikeId } = args
      const foundReviewLikeIndex = reviewLikes.findIndex(
        (reviewLike) => reviewLike.id === Number(reviewLikeId)
      )

      reviewLikes.splice(foundReviewLikeIndex, 1)

      return { deletedReviewLikeId: reviewLikeId }
    },
    createReviewHate: (_: any, args: any) => {
      const { input } = args
      const newReviewHate = {
        id: reviewHates.length + 1,
        memberId: Number(input.memberId),
        reviewId: Number(input.reviewId),
      }
      reviewHates.push(newReviewHate)

      return {
        createdReviewHate: newReviewHate,
      }
    },
    deleteReviewHate: (_: any, args: any) => {
      const { reviewHateId } = args
      const foundReviewHateIndex = reviewHates.findIndex(
        (reviewHate) => reviewHate.id === Number(reviewHateId)
      )

      reviewHates.splice(foundReviewHateIndex, 1)

      return { deletedReviewHateId: reviewHateId }
    },
  },
  Review: {
    product: (review: Review) => {
      return products.find((product) => product.id === review.productId)
    },
    keywords: (review: Review) => {
      if (review.keywordIds) {
        return review.keywordIds.map((reviewKeywordId) =>
          reviewKeywordLoader.load(reviewKeywordId)
        )
        // return review.keywordIds.map(reviewKeywordId => reviewKeywords.find(keyword => keyword.id === reviewKeywordId))
      }
      return null
    },
    likeCount: (review: Review) => {
      return reviewLikes.filter(
        (reviewLike) => reviewLike.reviewId === review.id
      ).length
    },
    hateCount: (review: Review) => {
      return reviewHates.filter(
        (reviewHate) => reviewHate.reviewId === review.id
      ).length
    },
  },
  ReviewHate: {
    review: (parent: ReviewLike) => {
      return reviews.find((review) => review.id === parent.reviewId)
    },
  },
  ReviewLike: {
    review: (parent: ReviewLike) => {
      return reviews.find((review) => review.id === parent.reviewId)
    },
    // member: (parent: ReviewLike) => {
    //   throw new Error('unimplemented')
    // },
  },
}

const reviewKeywordLoader = new DataLoader(async (keys) => {
  const result = keys.map((reviewKeywordId) =>
    reviewKeywords.find((keyword) => keyword.id === reviewKeywordId)
  )
  return result
})
