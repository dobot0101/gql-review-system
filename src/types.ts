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
