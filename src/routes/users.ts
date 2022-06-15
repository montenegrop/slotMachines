import { Router } from 'express'
import { AppDataSource } from '../db'
import { AuthUser } from '../entities/AuthUser'

const repository = AppDataSource.getRepository(AuthUser)

const router = Router()
// corregir: agregue algo al lint
router.get('/', (_req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  (async () => {
    const users = await repository.find()
    res.status(200).json(users)
  })()
})

export default router
