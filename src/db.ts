import { DataSource } from 'typeorm'
import { Machine } from './entity/Machine'
import { User } from './entity/User'
// import { Person } from './server'

import { databaseConfig } from './settings'

export const AppDataSource = new DataSource({
  type: databaseConfig.type,
  url: databaseConfig.url,
  synchronize: true,
  logging: true,
  entities: [User, Machine],
  extra: { ssl: true, rejectUnauthorized: false }
//   subscribers: [],
//   migrations: []
})
