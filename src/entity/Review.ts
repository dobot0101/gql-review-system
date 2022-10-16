import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm'
import { Member } from './Member'
import { Product } from './Product'
import { ReviewHate } from './ReviewHate'
import { ReviewLike } from './ReviewLike'
import { ReviewReviewKeyword } from './ReviewReviewKeyword'

@Entity()
export class Review {
  @PrimaryColumn('uuid') id!: string
  @Column('text') content!: String

  @ManyToOne(type => Member, member => member.reviews)
  member!: Member

  @ManyToOne(type => Product, product => product.reviews)
  product!: Product

  @OneToMany(
    type => ReviewReviewKeyword,
    reviewReviewKeyword => reviewReviewKeyword.review
  )
  reviewReviewKeywords!: ReviewReviewKeyword[]

  @OneToMany(type => ReviewHate, reviewHate => reviewHate.review)
  hates!: ReviewHate[]

  @OneToMany(type => ReviewLike, reviewLike => reviewLike.review)
  likes!: ReviewLike[]
}
