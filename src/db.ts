import { DataSource } from 'typeorm'
// import { AuthUser } from './entities/AuthUser'
// import { AuthUserGroups } from './entities/AuthUserGroups'
// import { AuthUserUserPermissions } from './entities/AuthUserUserPermissions'
// import { DjangoAdminLog } from './entities/DjangoAdminLog'
import { MachineMachine } from './entities/MachineMachine'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'pablodevuser',
  password: '9282jjssssds',
  database: 'slots',
  synchronize: false,
  logging: true,
  entities: [MachineMachine]
//   subscribers: [],
//   migrations: []
})
