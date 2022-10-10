import DataLoader from 'dataloader'
import {
  products,
  Review,
  reviewHates,
  reviewKeywords,
  reviewLikes,
  reviews,
} from '../datas'

export default {
  Query: {
    reviews: () => reviews,
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
      )
    },
    hateCount: (review: Review) => {
      return reviewHates.filter(
        (reviewLike) => reviewLike.reviewId === review.id
      )
    },
  },
}

const reviewKeywordLoader = new DataLoader(async (keys) => {
  const result = keys.map((reviewKeywordId) =>
    reviewKeywords.find((keyword) => keyword.id === reviewKeywordId)
  )
  return result
})
