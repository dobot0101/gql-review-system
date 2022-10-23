import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { ReviewReviewKeyword } from './ReviewReviewKeyword'

@Entity()
export class ReviewKeyword {
  @PrimaryColumn('uuid') id!: string
  @Column('text') title!: string

  @OneToMany(
    type => ReviewReviewKeyword,
    reviewReviewKeyword => reviewReviewKeyword.reviewKeyword
  )
  reviewReviewKeywords!: ReviewReviewKeyword[]
}
