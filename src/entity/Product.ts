import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'
import { Review } from './Review'

@Entity()
export class Product {
  @PrimaryColumn('uuid') id!: string
  @Column('text') title!: string

  @OneToMany(() => Review, (review) => review.product)
  reviews!: Review[]
}
