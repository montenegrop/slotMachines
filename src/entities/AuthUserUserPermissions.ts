import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { AuthPermission } from './AuthPermission'
import { AuthUser } from './AuthUser'

@Index('auth_user_user_permissions_pkey', ['id'], { unique: true })
@Index(
  'auth_user_user_permissions_permission_id_1fbb5f2c',
  ['permissionId'],
  {}
)
@Index(
  'auth_user_user_permissions_user_id_permission_id_14a6b632_uniq',
  ['permissionId', 'userId'],
  { unique: true }
)
@Index('auth_user_user_permissions_user_id_a95ead1b', ['userId'], {})
@Entity('auth_user_user_permissions', { schema: 'public', synchronize: false })
export class AuthUserUserPermissions {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string

  @Column('integer', { name: 'user_id', unique: true })
  userId: number

  @Column('integer', { name: 'permission_id', unique: true })
  permissionId: number

  @ManyToOne(
    () => AuthPermission,
    (authPermission) => authPermission.authUserUserPermissions
  )
  @JoinColumn([{ name: 'permission_id', referencedColumnName: 'id' }])
  permission: AuthPermission

  @ManyToOne(() => AuthUser, (authUser) => authUser.authUserUserPermissions)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: AuthUser
}
