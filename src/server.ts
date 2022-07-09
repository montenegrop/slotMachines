import 'dotenv/config'
import { AppDataSource } from './db'
import { validate } from 'class-validator'
import { Database, Resource } from '@adminjs/typeorm'
import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import { adminConfig } from './admin/adminConfig'

import express from 'express'

import rollRouter from './routes/roll'
import publisherRouter from './routes/publisher'

import { PORT } from './settings'

void (async () => {
  // db:
  await AppDataSource.initialize()

  // admin router:
  Resource.validate = validate
  AdminJS.registerAdapter({ Database, Resource })
  const adminJs = new AdminJS(adminConfig)
  const adminRouter = AdminJSExpress.buildRouter(adminJs)

  // express:
  const app = express()

  // routers:
  app.use('/admin', adminRouter)
  app.use('/api', rollRouter)
  app.use('/publisher', publisherRouter)

  // servers:
  app.listen(PORT)
})()
