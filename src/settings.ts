// database:

interface DatabaseConfig {
  type: 'postgres'
  host: string
  port: number
  username: string
  password: string
  database: string
}

export const databaseConfig: DatabaseConfig = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'pablodevuser',
  password: '9282jjssssds',
  database: 'slots'
}
