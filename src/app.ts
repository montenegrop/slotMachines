// 3rd Party Modules
import express from 'express'

// Local Modules
// const myRoute = require("./routes/myRoute.js");
import adminRouter from './routes/admin'
import rollRouter from './routes/rolls'
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
app.use('/admin', adminRouter)
app.use('/roll', rollRouter)

export default app
