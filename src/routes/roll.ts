import { Router } from 'express'
import { getRollResult } from './services/rollVictorious.example'
import { NormalWinnings } from './services/victorious'

const router = Router()

router.get('/example/victorious', (_req, res) => {
  res.status(200).json(getRollResult()
  )
})

router.get('/victorious', (_req, res) => {
  res.status(200).json(NormalWinnings())
})

export default router
