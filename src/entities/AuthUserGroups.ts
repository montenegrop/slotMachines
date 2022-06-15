import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { AuthGroup } from './AuthGroup'
import { AuthUser } from './AuthUser'

@Index(
  'auth_user_groups_user_id_group_id_94350c0c_uniq',
  ['groupId', 'userId'],
  { unique: true }
)
@Index('auth_user_groups_group_id_97559544', ['groupId'], {})
@Index('auth_user_groups_pkey', ['id'], { unique: true })
@Index('auth_user_groups_user_id_6a12ed8b', ['userId'], {})
@Entity('auth_user_groups', { schema: 'public', synchronize: false })
export class AuthUserGroups {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string

  @Column('integer', { name: 'user_id', unique: true })
  userId: number

  @Column('integer', { name: 'group_id', unique: true })
  groupId: number

  @ManyToOne(() => AuthGroup, (authGroup) => authGroup.authUserGroups)
  @JoinColumn([{ name: 'group_id', referencedColumnName: 'id' }])
  group: AuthGroup

  @ManyToOne(() => AuthUser, (authUser) => authUser.authUserGroups)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: AuthUser
}
