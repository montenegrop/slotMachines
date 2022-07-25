import { getRollResult } from './services/rollVictorious.example'
import { normalWinnings, freeSpinsWinnings } from './services/victorious'
import fs from 'fs'
import path from 'path'
import { Router } from 'express'
import Player from '../db/Player'
import Game from '../db/Game'

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
    let arr: number[] = []
    if (req.query.arr?.length !== undefined) {
      arr = (req.query.arr as string).split(',').map(function (item) {
        return parseInt(item, 10)
      })
    }
    const resultNormal = normalWinnings(arr)
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

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const getParameters = async function (req: any, _res: any, next: any) {
  const queryData = {
    bet: parseFloat(req.query.bet),
    username: req.query.username,
    game: req.query.game,
    provider: req.query.provider,
    hash: req.query.hash
  }
  req.queryData = queryData
  next()
}

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/provider', getParameters, async (req: any, res) => {
  const player = await Player.findOne({ username: req.queryData.username })
  const game = await Game.findOne({ name: req.queryData.game })
  const playerBalance = player?.gameBalances.find(gameBalance => gameBalance?.game?.toString() === game?._id.toString())
  let result
  if (playerBalance != null) {
    if (playerBalance?.freeSpins !== 0) {
      console.log('no 0,', playerBalance)
      result = rollResult(req.queryData.bet, { balance: playerBalance.balance, free_spins: playerBalance.freeSpins })
    } else {
      console.log('0,', playerBalance)
      // consultar publisher por saldo
      result = rollResult(req.queryData.bet, { balance: playerBalance.balance, free_spins: playerBalance.freeSpins })
    }
  }

  // actualizar publisher

  // actualizar db
  if (playerBalance != null) {
    playerBalance.balance = result.balance
    playerBalance.freeSpins = result.free_spins_left
  }
  player?.save()

  res.status(200).json(result)
})

export default router

function rollResult (bet: number, userData: {balance: number, free_spins: number}): any {
  if (userData.free_spins !== 0) {
    const resultFreeSpin = freeSpinsWinnings()
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    userData.free_spins += resultFreeSpin.free_spins - bet
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    userData.balance += (resultFreeSpin.total_win * bet) / 25

    // escribir db

    return { spin_results: resultFreeSpin, balance: userData.balance, free_spins_left: userData.free_spins }
  } else {
    const resultNormal = normalWinnings()
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    userData.balance +=
      (resultNormal.total_win * bet) / 25 - bet
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    userData.free_spins += resultNormal.free_spins

    // escribir db
    return { spin_results: resultNormal, balance: userData.balance, free_spins_left: userData.free_spins }
  }
}
