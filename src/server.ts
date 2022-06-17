import {
  // BaseEntity,
  Entity, PrimaryGeneratedColumn, Column, BaseEntity
} from 'typeorm'
import { AppDataSource } from './db'
import express from 'express'
import { Database, Resource } from '@adminjs/typeorm'
import { validate } from 'class-validator'

import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'

import rollRouter from './routes/roll'
import { User } from './entity/User'

Resource.validate = validate
AdminJS.registerAdapter({ Database, Resource })

@Entity()
export class Person extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number

  @Column({ type: 'varchar' })
  public firstName: string

  @Column({ type: 'varchar' })
  public lastName: string

  // in order be able to fetch resources in adminjs - we have to have id available
  // For fancy clickable relation links:
}

void (async () => {
  await AppDataSource.initialize()

  const adminJs = new AdminJS({
    // databases: [MyDataSource],
    resources: [
      { resource: User, options: { parent: { name: 'foobar' } } }
    ],
    rootPath: '/admin'
  })

  const app = express()
  const router = AdminJSExpress.buildRouter(adminJs)
  app.use(adminJs.options.rootPath, router)
  app.use('/api', rollRouter)
  app.listen(3000)
})()
