import { Column, Entity, Index } from 'typeorm'

@Index('django_session_expire_date_a5c62663', ['expireDate'], {})
@Index('django_session_pkey', ['sessionKey'], { unique: true })
@Index('django_session_session_key_c0390e0f_like', ['sessionKey'], {})
@Entity('django_session', { schema: 'public', synchronize: false })
export class DjangoSession {
  @Column('character varying', {
    primary: true,
    name: 'session_key',
    length: 40
  })
  sessionKey: string

  @Column('text', { name: 'session_data' })
  sessionData: string

  @Column('timestamp with time zone', { name: 'expire_date' })
  expireDate: Date
}
