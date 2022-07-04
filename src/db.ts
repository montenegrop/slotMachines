import { DataSource } from 'typeorm'
import { Machine } from './entity/Machine'
import { Player } from './entity/Player'
import { User } from './entity/User'
// import { Person } from './server'

import { databaseConfig } from './settings'
import 'dotenv/config'

console.log(process.env.NODE_ENV)

export const AppDataSource = new DataSource({
  type: databaseConfig.type,
  url: databaseConfig.url,
  synchronize: true,
  logging: true,
  entities: [User, Machine, Player],
  extra: { ssl: process.env.NODE_ENV !== 'development', rejectUnauthorized: false }
//   subscribers: [],
//   migrations: []
})
