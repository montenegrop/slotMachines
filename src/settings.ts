// database:

interface DatabaseConfig {
  type: 'postgres'
  host: string
  port: number
  username: string
  password: string
  database: string
}

// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
// const connectionString = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`

export const databaseConfig: DatabaseConfig = {
  type: 'postgres',
  host: process.env.PG_HOST ?? 'localhost',
  port: Number(process.env.PG_PORT) ?? 5432,
  username: process.env.PG_USER ?? 'pablodevuser',
  password: process.env.PG_PASSWORD ?? '9282jjssssds',
  database: process.env.PG_DATABASE ?? 'slots'
}
