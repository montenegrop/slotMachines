import { AppDataSource } from './db'
import express from 'express'
import { Database, Resource } from '@adminjs/typeorm'
import { validate } from 'class-validator'

import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'

import rollRouter from './routes/roll'
import { User } from './entity/User'

void (async () => {
  await AppDataSource.initialize()
  Resource.validate = validate
  AdminJS.registerAdapter({ Database, Resource })

  const adminJs = new AdminJS({
    // databases: [MyDataSource],
    resources: [
      { resource: User, options: { parent: { name: 'foobar' } } }
    ],
    rootPath: '/admin'
  })

  const app = express()
  const router = AdminJSExpress.buildRouter(adminJs)
  app.use('/admin', router)
  app.use('/api', rollRouter)
  app.listen(3000)
})()
