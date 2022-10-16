import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'
import { Review } from './Review'
import { ReviewHate } from './ReviewHate'
import { ReviewLike } from './ReviewLike'

@Entity()
export class Member {
  @PrimaryColumn('uuid') id!: string
  @Column('text') name!: string
  @Column('text') email!: string

  @OneToMany(type => Review, review => review.member)
  reviews!: Review[]

  @OneToMany(type => ReviewHate, reviewHate => reviewHate.member)
  reviewHates!: ReviewHate[]

  @OneToMany(type => ReviewLike, reviewLike => reviewLike.member)
  reviewLikes!: ReviewLike[]
}
