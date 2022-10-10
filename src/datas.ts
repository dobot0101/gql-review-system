import { Author, Book } from './types'

export type Review = {
  id: number
  productId: number
  content: string
  keywordIds: number[] | null
}

export type ReviewKeyword = {
  id: number
  title: string
}

export type Product = {
  id: number
  title: string
}

export type ReviewLike = {
  id: number
  reviewId: number
  memberId: number
}

export type ReviewHate = {
  id: number
  reviewId: number
  memberId: number
}

export const products: Product[] = [
  {
    id: 1,
    title: 'test product1',
  },
  {
    id: 2,
    title: 'test product2',
  },
]

export const reviewKeywords: ReviewKeyword[] = [
  {
    id: 1,
    title: 'test review keyword1',
  },
  {
    id: 2,
    title: 'test review keyword2',
  },
]

export const reviewLikes: ReviewLike[] = [
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

export const reviewHates: ReviewHate[] = [
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

export const reviews: Review[] = [
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
