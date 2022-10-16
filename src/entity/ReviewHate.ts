import { Entity, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm'
import { Member } from './Member'
import { Review } from './Review'

@Entity()
export class ReviewHate {
  @PrimaryColumn('uuid') id!: string

  @ManyToOne(type => Review, review => review.hates)
  review!: Review

  @ManyToOne(type => Member, member => member.reviewHates)
  member!: Member
}
