// 3rd Party Modules
import express from 'express'

// Local Modules
// const myRoute = require("./routes/myRoute.js");
import rollRouter from './routes/rolls'
import machineRouter from './routes/machines'
import userRouter from './routes/users'
import { AppDataSource } from './db'
import 'reflect-metadata'

// Server Initialization
const app = express()

// db Initialization
AppDataSource.initialize()
  .then(() => {
    // here you can start to work with your database
  })
  .catch((error) => console.log('db init error', error))

// Middlewares
app.use(express.json())

// Routes will be written here
app.use('/roll', rollRouter)
app.use('/machines', machineRouter)
app.use('/users', userRouter)

export default app
