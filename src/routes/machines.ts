import { Router } from 'express'
import { AppDataSource } from '../db'
import { MachineMachine } from '../entities/MachineMachine'

const repository = AppDataSource.getRepository(MachineMachine)

const router = Router()
// corregir: agregue algo al lint
router.get('/', (_req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  (async () => {
    const machine = await repository.findOneBy({
      id: '13'
    })
    console.log('13', machine)
    let newMachine = new MachineMachine()
    // console.log('new', newMachine)
    type NewType = MachineMachine

    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    newMachine = { ...machine, id: '5' } as NewType
    newMachine.name = 'nuev5'
    console.log(newMachine)
    await repository.save(newMachine)
    res.status(200).json(machine)
  })()
})

export default router
