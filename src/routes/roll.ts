import { Router } from 'express'
import { getRollResult } from './services/rollVictorious.example'
import { normalWinnings, freeSpinsWinnings } from './services/victorious'
import fs from 'fs'
import path from 'path'

const router = Router()

const dir = path.join(__dirname, '../players')

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir)
}

fs.writeFileSync(
  path.join(__dirname, '../players/player2.json'),
  JSON.stringify({ id: 2, balance: 1000, free_spins: 0, screen: ['EFS', 'DEJ', 'GDB', 'FCJ', 'SCJ'] })
)

router.get('/example/victorious', (_req, res) => {
  res.status(200).json(getRollResult())
})
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/victorious', async (req, res) => {
  const file = fs.readFileSync(
    path.join(__dirname, '../players/player2.json'),
    'utf-8'
  )
  const userData = JSON.parse(file)
  if (userData.free_spins !== 0) {
    console.log(userData, 'fs')
    const resultFreeSpin = freeSpinsWinnings()
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    userData.free_spins += resultFreeSpin.free_spins - 1
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    userData.balance += (resultFreeSpin.total_win * 1.0) / 25
    userData.screen = resultFreeSpin.screen
    fs.writeFileSync(
      path.join(__dirname, '../players/player2.json'),
      JSON.stringify(userData)
    )
    fs.writeFileSync(
      path.join(__dirname, '../players/player2.json'),
      JSON.stringify(userData)
    )
    res.status(200).json({ spin_results: resultFreeSpin, balance: userData.balance, free_spins_left: userData.free_spins })
  } else {
    console.log(userData)
    const resultNormal = normalWinnings()
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    userData.balance +=
      (resultNormal.total_win * 1.0) / 25 - parseInt(req.query.bet as string)
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    userData.free_spins += resultNormal.free_spins
    userData.screen = resultNormal.screen

    fs.writeFileSync(
      path.join(__dirname, '../players/player2.json'),
      JSON.stringify(userData)
    )
    res.status(200).json({ spin_results: resultNormal, balance: userData.balance, free_spins_left: userData.free_spins })
  }
})

export default router
