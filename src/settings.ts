// database:
interface DatabaseConfig {
  type: 'postgres'
  url: string
}
const dbString = 'postgres://pablodevuser:9282jjssssds@localhost:5432/slots'
export const databaseConfig: DatabaseConfig = {
  type: 'postgres',
  url: process.env.DATABASE_URL ?? dbString
}

// servers:
export const PORT = process.env.PORT ?? 3000
