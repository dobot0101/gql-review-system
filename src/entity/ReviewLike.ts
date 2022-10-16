import { Entity, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm'
import { Member } from './Member'
import { Review } from './Review'

@Entity()
export class ReviewLike {
  @PrimaryColumn('uuid') id!: string

  @ManyToOne(type => Review, review => review.likes)
  review!: Review

  @ManyToOne(type => Member, member => member.reviewLikes)
  member!: Member
}
