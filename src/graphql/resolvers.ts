import { Product } from '../entity/Product'
import { Review } from '../entity/Review'
import { ReviewHate } from '../entity/ReviewHate'
import { ReviewKeyword } from '../entity/ReviewKeyword'
import { ReviewLike } from '../entity/ReviewLike'
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
      review.member = ctx.testDatas.member
      review.product = ctx.testDatas.product

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
    createReviewLike: async (parent, args, ctx, info) => {
      const { memberId, reviewId } = args.input
      const reviewLike = new ReviewLike()
      reviewLike.id = ctx.createUUID()
      reviewLike.memberId = memberId
      reviewLike.reviewId = reviewId

      await ctx.connection.getRepository(ReviewLike).save(reviewLike)
      return reviewLike.id
    },
    deleteReviewLike: async (parent, args, ctx, info) => {
      const { reviewLikeId } = args
      await ctx.connection.getRepository(ReviewLike).delete(reviewLikeId)
      return reviewLikeId
    },
    createReviewHate: async (parent, args, ctx, info) => {
      const { memberId, reviewId } = args.input
      const reviewHate = new ReviewHate()
      reviewHate.id = ctx.createUUID()
      reviewHate.memberId = memberId
      reviewHate.reviewId = reviewId
      const savedReviewHate = await ctx.connection
        .getRepository(ReviewHate)
        .save(reviewHate)

      return savedReviewHate.id
    },
    deleteReviewHate: async (parent, args, ctx, info) => {
      const { reviewHateId } = args
      await ctx.connection.getRepository(ReviewHate).delete(reviewHateId)
      return reviewHateId
    },
  },
  Review: {
    product: (parent, args, ctx, info) => {
      return ctx.connection.getRepository(Product).findOne(parent.id)
    },
    keywords: async (parent, args, ctx, info) => {
      const reviewReviewKeywords = await ctx.connection
        .getRepository(ReviewReviewKeyword)
        .find({
          where: { reviewId: parent.id },
        })
      const reviewKeywords = reviewReviewKeywords.map(
        reviewReviewKeyword => reviewReviewKeyword.reviewKeyword
      )
      return reviewKeywords
    },
    likeCount: async (parent, args, ctx, info) => {
      const agg = await ctx.connection
        .createQueryBuilder(ReviewLike, ' rl')
        .select(`rl.review_id, count(*) as review_like_count`)
        .groupBy(`rl.review_id`)
        .where(`rl.review_id = :reviewId`, { reviewId: parent.id })
        .getRawOne()
      return agg.review_like_count
    },
    hateCount: async (parent, args, ctx, info) => {
      const agg = await ctx.connection
        .createQueryBuilder(ReviewHate, ' rl')
        .select(`rl.review_id, count(*) as review_hate_count`)
        .groupBy(`rl.review_id`)
        .where(`rl.review_id = :reviewId`, { reviewId: parent.id })
        .getRawOne()
      return agg.review_hate_count
    },
  },
  ReviewHate: {
    review: (parent: ReviewLike) => {
      throw new Error('unimplemented')
    },
  },
  ReviewLike: {
    review: (parent: ReviewLike) => {
      throw new Error('unimplemented')
    },
  },
}
