import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { AuthGroup } from './AuthGroup'
import { AuthPermission } from './AuthPermission'

@Index(
  'auth_group_permissions_group_id_permission_id_0cd325b0_uniq',
  ['groupId', 'permissionId'],
  { unique: true }
)
@Index('auth_group_permissions_group_id_b120cbf9', ['groupId'], {})
@Index('auth_group_permissions_pkey', ['id'], { unique: true })
@Index('auth_group_permissions_permission_id_84c5c92e', ['permissionId'], {})
@Entity('auth_group_permissions', { schema: 'public', synchronize: false })
export class AuthGroupPermissions {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string

  @Column('integer', { name: 'group_id', unique: true })
  groupId: number

  @Column('integer', { name: 'permission_id', unique: true })
  permissionId: number

  @ManyToOne(() => AuthGroup, (authGroup) => authGroup.authGroupPermissions)
  @JoinColumn([{ name: 'group_id', referencedColumnName: 'id' }])
  group: AuthGroup

  @ManyToOne(
    () => AuthPermission,
    (authPermission) => authPermission.authGroupPermissions
  )
  @JoinColumn([{ name: 'permission_id', referencedColumnName: 'id' }])
  permission: AuthPermission
}
