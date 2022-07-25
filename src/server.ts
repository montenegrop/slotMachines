import 'dotenv/config'
import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import adminJSMongoose from '@adminjs/mongoose'

import express from 'express'
import mongoose from 'mongoose'

import cors from 'cors'

import rollRouter from './routes/roll'
import publisherRouter from './routes/publisher'
import userRouter from './routes/user'

import { MONGODB, PORT } from './settings'
import { adminConfig } from './admin/adminConfig'

import { routerConfig } from './admin/routerConfig'
void (async () => {
  // db:
  mongoose.connect(MONGODB, () => { console.log('connected to mongo') })

  // admin
  const adminJsOptions = {
    ...adminConfig
  }
  // admin router:
  AdminJS.registerAdapter(adminJSMongoose)
  const adminJs = new AdminJS(adminJsOptions)
  // const adminRouter = AdminJSExpress.buildRouter(adminJs)

  // Build and use a router which will handle all AdminJS routes
  const adminUsersRouter = AdminJSExpress.buildAuthenticatedRouter(adminJs, routerConfig)

  // express:
  const app = express()

  // global middlewares:
  app.use(cors())

  // routers:
  app.use('/admin', adminUsersRouter)
  // app.use('/admin', adminRouter)
  app.use('/api', rollRouter)
  app.use('/publisher', publisherRouter)
  app.use('/user', userRouter)

  // servers:
  app.listen(PORT)
})()
