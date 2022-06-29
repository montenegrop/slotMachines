import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Machine extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', default: '' })
  name: string

  @Column({ type: 'varchar', array: true, nullable: true })
  reels: string[]

  // in order be able to fetch resources in adminjs - we have to have id available
  // For fancy clickable relation links:
}
