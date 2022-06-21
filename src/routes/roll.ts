import { Router } from 'express'
import { getRollResult } from './services/rollVictorious.example'
import { normalWinnings, freeSpinsWinnings } from './services/victorious'
import fs from 'fs'
import path from 'path'

const router = Router()

router.get('/example/victorious', (_req, res) => {
  res.status(200).json(getRollResult()
  )
})
router.get('/victorious', (req, res) => {
  const file = fs.readFileSync(path.join(__dirname, '../players/player1.json'), 'utf-8')
  const userData = JSON.parse(file)
  if (userData.free_spins !== 0) {
    const resultFreeSpin = freeSpinsWinnings()
    userData.free_spins -= 1

    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    userData.balance += resultFreeSpin.total_win * 1.0 / 25
    userData.line_wins = resultFreeSpin.line_wins
    userData.screen = resultFreeSpin.screen
    console.log('fs')
    console.log('data', userData)
    fs.writeFileSync(path.join(__dirname, '../players/player1.json'), JSON.stringify(userData))
    fs.writeFileSync(path.join(__dirname, '../players/player1fs.json'), JSON.stringify(userData))
    res.status(200).json(resultFreeSpin)
  } else {
    const resultNormal = normalWinnings()
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    userData.balance += resultNormal.total_win * 1.0 / 25 - parseInt(req.query.bet as string)
    userData.free_spins = resultNormal.free_spins
    userData.line_wins = resultNormal.line_wins
    userData.screen = resultNormal.screen
    console.log('data', userData)
    fs.writeFileSync(path.join(__dirname, '../players/player1.json'), JSON.stringify(userData))
    res.status(200).json(resultNormal)
  }
})

export default router
