// server:
console.log(process.env)
let urlEnv
if (process.env.ENV === 'dev') {
  urlEnv = 'https://slot-machine-zn.herokuapp.com'
} else if (process.env.ENV === 'prod') {
  urlEnv = 'https://slot-machine-prod.herokuapp.com'
} else {
  urlEnv = 'http://localhost:3000'
}
export const rootUrl = urlEnv
console.log(rootUrl)
// database:
const user = 'slotuser'
const password = 'slotpassword'
const database = 'slots'
export const MONGODB = `mongodb+srv://${user}:${password}@slotmachine.qmyrasv.mongodb.net/${database}?retryWrites=true&w=majority`

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

// publishers:
export const publisher1 = {
  pn: 'pn',
  login: 'login',
  password: 'pass'
}
