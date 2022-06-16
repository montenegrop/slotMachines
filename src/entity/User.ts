import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number

  @Column({ type: 'varchar' })
  public firstName: string

  @Column({ type: 'varchar' })
  public lastName: string

  // in order be able to fetch resources in adminjs - we have to have id available
  // For fancy clickable relation links:
}
