import { Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'
import { Review } from './Review'
import { ReviewKeyword } from './ReviewKeyword'

@Entity()
export class ReviewReviewKeyword {
  @PrimaryColumn('uuid') id!: string

  @ManyToOne(type => Review, review => review.reviewReviewKeywords)
  review!: Review

  @ManyToOne(
    type => ReviewKeyword,
    reviewKeyword => reviewKeyword.reviewReviewKeywords
  )
  reviewKeyword!: ReviewKeyword
}
