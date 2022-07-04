// database:

// interface DatabaseConfig {
//   type: 'postgres'
//   host: string
//   port: number
//   username: string
//   password: string
//   database: string
// }

// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
// const connectionString = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`

const dbString = 'postgres://pablodevuser:9282jjssssds@localhost:5432/slots'

export const databaseConfig: any = {
  type: 'postgres',
  url: process.env.DATABASE_URL ?? dbString
}
