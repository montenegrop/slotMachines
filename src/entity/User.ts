import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number

  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string

  @Column({ type: 'varchar', nullable: false })
  encryptedPassword: string

  @Column({ type: 'varchar', nullable: false, enum: ['admin', 'restricted'] })
  role: string

  // in order be able to fetch resources in adminjs - we have to have id available
  // For fancy clickable relation links:
}
