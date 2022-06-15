import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Index('machine_machine_pkey', ['id'], { unique: true })
@Entity('machine_machine', { schema: 'public', synchronize: false })
export class MachineMachine {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string

  @Column('jsonb', { name: 'payments' })
  payments: object

  @Column('int4', { name: 'free_spins', array: true })
  freeSpins: number[]

  @Column('double precision', { name: 'roi', precision: 53 })
  roi: number

  @Column('varchar', { name: 'bonus_reel', array: true })
  bonusReel: string[]

  @Column('character varying', { name: 'name', length: 200 })
  name: string

  @Column('varchar', { name: 'normal_reel', array: true })
  normalReel: string[]

  @Column('int4', { name: 'visible', array: true })
  visible: number[]

  @Column('integer', { name: 'multiplier' })
  multiplier: number
}
