import { AppDataSource } from './db'
import express from 'express'
import { Database, Resource } from '@adminjs/typeorm'
import { validate } from 'class-validator'

import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'

import rollRouter from './routes/roll'
import { User } from './entity/User'
import { Machine } from './entity/Machine'

import bcrypt from 'bcrypt'

void (async () => {
  await AppDataSource.initialize()
  Resource.validate = validate
  AdminJS.registerAdapter({ Database, Resource })

  const adminJs = new AdminJS({
    // databases: [MyDataSource],
    resources: [
      {
        resource: User,
        options: {
          properties: {
            encryptedPassword: {
              isVisible: false
            },
            password: {
              type: 'string',
              isVisible: {
                list: false, edit: true, filter: false, show: false
              }
            }
          },
          actions: {
            new: {
              label: 'create new user Pablo',
              before: async (request: any) => {
                console.log(request.payload, 'payload')
                // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                if (request.payload.password) {
                  request.payload = {
                    ...request.payload,
                    encryptedPassword: await bcrypt.hash(request.payload.password, 10),
                    password: undefined
                  }
                }
                return request
              }
            }
          }
        }
      },
      {
        resource: Machine,
        options: {
          parent: { name: 'maquinas' },
          properties: {
            Payments: {
              type: 'mixed'
            },
            'Payments.A': {
              type: 'string[]'
            }
          }
        }
      }
    ]
  })

  const app = express()

  const router = AdminJSExpress.buildRouter(adminJs)

  // // Build and use a router which will handle all AdminJS routes
  // const router = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
  //   authenticate: async (email, password) => {
  //     const user = await User.findOne({ where: { email: email } })
  //     if (user !== null) {
  //       const matched = await bcrypt.compare(password, user.encryptedPassword)
  //       if (matched === true) {
  //         return user
  //       }
  //     }
  //     return false
  //   },
  //   cookiePassword: 'some-secret-password-used-to-secure-cookie'
  // })

  app.use('/admin', router)
  app.use('/api', rollRouter)
  app.listen(3000)
})()
