import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'
import { AuthUserGroups } from './AuthUserGroups'
import { AuthUserUserPermissions } from './AuthUserUserPermissions'
import { DjangoAdminLog } from './DjangoAdminLog'

@Index('auth_user_pkey', ['id'], { unique: true })
@Index('auth_user_username_key', ['username'], { unique: true })
@Index('auth_user_username_6821ab7c_like', ['username'], {})
@Entity('auth_user', { schema: 'public', synchronize: false })
export class AuthUser {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number

  @Column('character varying', { name: 'password', length: 128 })
  password: string

  @Column('timestamp with time zone', { name: 'last_login', nullable: true })
  lastLogin: Date | null

  @Column('boolean', { name: 'is_superuser' })
  isSuperuser: boolean

  @Column('character varying', { name: 'username', unique: true, length: 150 })
  username: string

  @Column('character varying', { name: 'first_name', length: 150 })
  firstName: string

  @Column('character varying', { name: 'last_name', length: 150 })
  lastName: string

  @Column('character varying', { name: 'email', length: 254 })
  email: string

  @Column('boolean', { name: 'is_staff' })
  isStaff: boolean

  @Column('boolean', { name: 'is_active' })
  isActive: boolean

  @Column('timestamp with time zone', { name: 'date_joined' })
  dateJoined: Date

  @OneToMany(() => AuthUserGroups, (authUserGroups) => authUserGroups.user)
  authUserGroups: AuthUserGroups[]

  @OneToMany(
    () => AuthUserUserPermissions,
    (authUserUserPermissions) => authUserUserPermissions.user
  )
  authUserUserPermissions: AuthUserUserPermissions[]

  @OneToMany(() => DjangoAdminLog, (djangoAdminLog) => djangoAdminLog.user)
  djangoAdminLogs: DjangoAdminLog[]
}
