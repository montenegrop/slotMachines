// import bcrypt from 'bcrypt'
import Game from '../db/Game'
import Machine from '../db/Machine'
import Provider from '../db/Provider'
import Roll from '../db/Roll'
import User from '../db/User'
export const adminConfig = {
  // databases: [MyDataSource],
  resources: [
    { resource: User },
    { resource: Provider },
    { resource: Game },
    { resource: Roll },
    // {
    //   resource: User,
    //   options: {
    //     properties: {
    //       encryptedPassword: {
    //         isVisible: false
    //       },
    //       password: {
    //         type: 'string',
    //         isVisible: {
    //           list: false, edit: true, filter: false, show: false
    //         }
    //       }
    //     },
    //     actions: {
    //       new: {
    //         label: 'create new user Pablo',
    //         before: async (request: any) => {
    //           console.log(request.payload, 'payload')
    //           // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    //           if (request.payload.password) {
    //             request.payload = {
    //               ...request.payload,
    //               encryptedPassword: await bcrypt.hash(request.payload.password, 10),
    //               password: undefined
    //             }
    //           }
    //           return request
    //         }
    //       }
    //     }
    //   }
    // },
    {
      resource: Machine
      // options: {
      //   parent: { name: 'maquinas' },
      //   properties: {
      //     Payments: {
      //       type: 'mixed'
      //     },
      //     'Payments.A': {
      //       type: 'string[]'
      //     }
      //   }
      // }
    }
    // {
    //   resource: Player,
    //   options: {
    //     parent: { name: 'players' }
    //   }
    // }
  ]
}
