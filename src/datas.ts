import { Product, Review, ReviewHate, ReviewKeyword, ReviewLike } from './types'

export let products: Product[] = [
  {
    id: 1,
    title: 'test product1',
  },
  {
    id: 2,
    title: 'test product2',
  },
]

export let reviewKeywords: ReviewKeyword[] = [
  {
    id: 1,
    title: 'test review keyword1',
  },
  {
    id: 2,
    title: 'test review keyword2',
  },
]

export let reviewLikes: ReviewLike[] = [
  {
    id: 1,
    memberId: 1,
    reviewId: 1,
  },
  {
    id: 2,
    memberId: 2,
    reviewId: 1,
  },
  {
    id: 3,
    memberId: 3,
    reviewId: 1,
  },
]

export let reviewHates: ReviewHate[] = [
  {
    id: 1,
    memberId: 1,
    reviewId: 1,
  },
  {
    id: 2,
    memberId: 2,
    reviewId: 1,
  },
  {
    id: 3,
    memberId: 3,
    reviewId: 1,
  },
]

export let reviews: Review[] = [
  {
    content: 'test review content1',
    id: 1,
    keywordIds: [1],
    productId: 1,
  },
  {
    content: 'test review content2',
    id: 2,
    keywordIds: null,
    productId: 1,
  },
]
