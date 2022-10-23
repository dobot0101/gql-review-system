export type MemberModel = {
  id: string
  name: string
  email: string
}

export type ProductModel = {
  id: string
  title: string
}

export type ReviewModel = {
  id: string
  content: string
  memberId: string
  productId: string
}

export type ReviewHateModel = {
  id: string
  reviewId: string
  memberId: string
}
export type ReviewLikeModel = {
  id: string
  reviewId: string
  memberId: string
}

export type ReviewKeywordModel = {
  id: string
  title: string
}

// export type ReviewKeywordKeywordModel = {
//   id: string
//   reviewId: string
//   reviewKeywordId: string
// }
