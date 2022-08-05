import User from '../db/User'
import bcrypt from 'bcrypt'

export const userConfig = {
  resource: User,
  options: {
    properties: {
      encryptedPassword: {
        isVisible: false
      },
      password: {
        type: 'string',
        isVisible: {
          list: false,
          edit: true,
          filter: false,
          show: false
        }
      }
    },
    actions: {
      new: {
        label: 'create new user',
        before: async (request: any) => {
          console.log(request.payload, 'payload')
          // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
          if (request.payload.password) {
            request.payload = {
              ...request.payload,
              encryptedPassword: await bcrypt.hash(
                request.payload.password,
                10
              ),
              password: undefined
            }
          }
          return request
        }
      },
      edit: {
        label: 'edit user',
        before: async (request: any) => {
          console.log(request.payload, 'payload')
          // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
          if (request.payload.password) {
            request.payload = {
              ...request.payload,
              encryptedPassword: await bcrypt.hash(
                request.payload.password,
                10
              ),
              password: undefined
            }
          }
          return request
        }
      }
    }
  }
}
