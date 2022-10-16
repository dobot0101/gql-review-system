import DataLoader from 'dataloader'
import {
  products,
  reviewHates,
  reviewKeywords,
  reviewLikes,
  reviews,
} from '../datas'
import { Review } from '../entity/Review'
import { ReviewKeyword } from '../entity/ReviewKeyword'
import { ReviewReviewKeyword } from '../entity/ReviewReviewKeyword'
import { Resolvers } from '../__generated__/resolvers-types'

export const resolvers: Resolvers = {
  Query: {
    reviews: (parent, args, ctx, info) => {
      return ctx.connection.getRepository(Review).find()
    },
  },
  Mutation: {
    createReview: async (parent, args, ctx, info) => {
      const { input } = args
      const review = new Review()
      review.content = input.content

      if (input.keywordIds) {
        review.reviewReviewKeywords = await Promise.all(
          input.keywordIds?.map(async keywordId => {
            const reviewKeyword = await ctx.connection
              .getRepository(ReviewKeyword)
              .findOneByOrFail({
                id: keywordId,
              })
            const reviewReviewKeyword = new ReviewReviewKeyword()
            reviewReviewKeyword.id = ctx.createUUID()
            reviewReviewKeyword.reviewKeyword = reviewKeyword
            return reviewReviewKeyword
          })
        )
      }

      review.member = ctx.testDatas.member

      const savedReview = await ctx.connection
        .getRepository(Review)
        .save(review)

      return {
        createdReview: savedReview,
      }
    },
    deleteReview: async (parent, args, ctx, info) => {
      const { reviewId } = args
      await ctx.connection.getRepository(Review).delete(reviewId)
      return reviewId
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
        reviewLike => reviewLike.id === Number(reviewLikeId)
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
        reviewHate => reviewHate.id === Number(reviewHateId)
      )

      reviewHates.splice(foundReviewHateIndex, 1)

      return { deletedReviewHateId: reviewHateId }
    },
  },
  Review: {
    product: (review: Review) => {
      return products.find(product => product.id === review.productId)
    },
    keywords: (review: Review) => {
      if (review.keywordIds) {
        return review.keywordIds.map(reviewKeywordId =>
          reviewKeywordLoader.load(reviewKeywordId)
        )
        // return review.keywordIds.map(reviewKeywordId => reviewKeywords.find(keyword => keyword.id === reviewKeywordId))
      }
      return null
    },
    likeCount: (review: Review) => {
      return reviewLikes.filter(reviewLike => reviewLike.reviewId === review.id)
        .length
    },
    hateCount: (review: Review) => {
      return reviewHates.filter(reviewHate => reviewHate.reviewId === review.id)
        .length
    },
  },
  ReviewHate: {
    review: (parent: ReviewLike) => {
      return reviews.find(review => review.id === parent.reviewId)
    },
  },
  ReviewLike: {
    review: (parent: ReviewLike) => {
      return reviews.find(review => review.id === parent.reviewId)
    },
    // member: (parent: ReviewLike) => {
    //   throw new Error('unimplemented')
    // },
  },
}

const reviewKeywordLoader = new DataLoader(async keys => {
  const result = keys.map(reviewKeywordId =>
    reviewKeywords.find(keyword => keyword.id === reviewKeywordId)
  )
  return result
})
