import bcrypt from 'bcrypt'
import { Machine } from '../entity/Machine'
import { Player } from '../entity/Player'
import { User } from '../entity/User'
export const adminConfig = {
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
    },
    {
      resource: Player,
      options: {
        parent: { name: 'players' }
      }
    }
  ]
}

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
