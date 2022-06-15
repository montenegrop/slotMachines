import { Router } from 'express'
import { getRollResult } from './services/rollVictorious.example'

const router = Router()

router.get('/example/victorious', (_req, res) => {
  res.status(200).json(getRollResult()
  )
})

export default router
