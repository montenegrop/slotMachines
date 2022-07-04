import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Player extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number

  @Column({ type: 'varchar', nullable: true })
  name: string

  @Column({ type: 'varchar', nullable: false })
  balance: number

  @Column({ type: 'varchar', nullable: false, default: 0 })
  free_spins: number

  // in order be able to fetch resources in adminjs - we have to have id available
  // For fancy clickable relation links:
}
