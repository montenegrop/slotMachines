import { DataSource } from 'typeorm'
import { User } from './entity/User'
import { Person } from './server'
// import { Person } from './server'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'pablodevuser',
  password: '9282jjssssds',
  database: 'slots',
  synchronize: true,
  logging: true,
  entities: [User, Person]
//   subscribers: [],
//   migrations: []
})
