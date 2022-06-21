import { Router } from 'express'
import { getRollResult } from './services/rollVictorious.example'
import { NormalWinnings } from './services/victorious'
import fs from 'fs'
import path from 'path'

const router = Router()

router.get('/example/victorious', (_req, res) => {
  res.status(200).json(getRollResult()
  )
})
router.get('/victorious', (req, res) => {
  console.log(__dirname)
  const file = fs.readFileSync(path.join(__dirname, '../players/player1.json'), 'utf-8')
  const userData = JSON.parse(file)
  console.log('params', req.query, userData)
  res.status(200).json(NormalWinnings())
})

export default router
