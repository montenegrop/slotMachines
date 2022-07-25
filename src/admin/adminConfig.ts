/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
// import bcrypt from 'bcrypt'
import Game from '../db/Game'
import Player from '../db/Player'
import Provider from '../db/Publusher'
import { machineConfig } from './machineConfig'
import { rollConfig } from './rollConfig'
import { userConfig } from './userConfig'

// const canSeeRecords = ({ currentAdmin, record }: any) => {
//   console.log(record)
//   console.log(currentAdmin)
//   return currentAdmin && (
//     currentAdmin.role === 'admin' ||
//   currentAdmin.provider === record.params.provider
//   )
// }

export const adminConfig = {
  // databases: [MyDataSource],
  resources: [
    { resource: Player },
    { resource: Provider },
    { resource: Game },
    { ...rollConfig },
    { ...userConfig },
    { ...machineConfig }
  ]
}
