import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Machine extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar' })
  name: string

  @Column({ type: 'float', default: 0 })
  roi: string

  @Column({ type: 'varchar', array: true })
  NormalReels: string[]

  @Column({ type: 'varchar', array: true })
  FSReels: string[]

  @Column({
    type: 'jsonb',
    nullable: true
  })
  Payments: object

  // in order be able to fetch resources in adminjs - we have to have id available
  // For fancy clickable relation links:
}
