import { DataSource } from 'typeorm'
import { Machine } from './entity/Machine'
import { User } from './entity/User'
// import { Person } from './server'

import { databaseConfig } from './settings'

export const AppDataSource = new DataSource({
  type: databaseConfig.type,
  host: databaseConfig.host,
  port: databaseConfig.port,
  username: databaseConfig.username,
  password: databaseConfig.password,
  database: databaseConfig.database,
  synchronize: true,
  logging: true,
  entities: [User, Machine]
//   subscribers: [],
//   migrations: []
})
