import 'dotenv/config'
import { validate } from 'class-validator'
import { Database, Resource } from '@adminjs/typeorm'
import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import { adminConfig } from './admin/adminConfig'

import express from 'express'
import mongoose from 'mongoose'

import cors from 'cors'

import rollRouter from './routes/roll'
import publisherRouter from './routes/publisher'
import userRouter from './routes/user'

import { MONGODB, PORT } from './settings'
void (async () => {
  // db:
  mongoose.connect(MONGODB, () => { console.log('connected to mongo') })

  // admin router:
  Resource.validate = validate
  AdminJS.registerAdapter({ Database, Resource })
  const adminJs = new AdminJS(adminConfig)
  const adminRouter = AdminJSExpress.buildRouter(adminJs)

  // express:
  const app = express()

  // global middlewares:
  app.use(cors())

  // routers:
  app.use('/admin', adminRouter)
  app.use('/api', rollRouter)
  app.use('/publisher', publisherRouter)
  app.use('/user', userRouter)

  // servers:
  app.listen(PORT)
})()
