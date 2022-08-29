import Machine from '../db/models/Machine'

export const machineConfig = {
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
