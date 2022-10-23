import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm'
import { Member } from './Member'
import { Product } from './Product'
import { ReviewHate } from './ReviewHate'
import { ReviewLike } from './ReviewLike'
import { ReviewReviewKeyword } from './ReviewReviewKeyword'

@Entity()
export class Review {
  @PrimaryColumn('uuid') id!: string
  @Column('text') content!: string

  @ManyToOne(type => Member, member => member.reviews)
  member!: Member
  @Column('uuid')
  memberId!: string

  @ManyToOne(type => Product, product => product.reviews)
  product!: Product
  @Column('uuid')
  productId!: string

  @OneToMany(
    type => ReviewReviewKeyword,
    reviewReviewKeyword => reviewReviewKeyword.review,
    { cascade: true }
  )
  reviewReviewKeywords!: ReviewReviewKeyword[]

  @OneToMany(type => ReviewHate, reviewHate => reviewHate.review, {
    nullable: true,
  })
  hates!: ReviewHate[]

  @OneToMany(type => ReviewLike, reviewLike => reviewLike.review, {
    nullable: true,
  })
  likes!: ReviewLike[]
}
