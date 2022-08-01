import { Router } from 'express'
import { parseString } from 'xml2js'
import Game from '../db/Game'
import Player from '../db/Player'
import Publisher from '../db/Publisher'
import { codeProviderServer } from '../errors/requests'
import { GeneralResponse } from '../types'
import { casino1 } from './publisher'

const router = Router()
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const getParameters = function (req: any, _res: any, next: any) {
  const queryData = {
    bet: parseFloat(req.query.bet),
    username: req.query.username,
    game: req.query.game,
    publisher: req.query.publisher,
    hash: req.query.hash
  }
  req.queryData = queryData
  next()
}

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/details', getParameters, async (req: any, res, _next) => {
  // types:
  const result: GeneralResponse = { errors: [] }
  let parsedDetails: any
  // types
  // get data from db:
  const player = await Player.findOne({ username: req.queryData.username })
  const publisher = await Publisher.findOne({ name: req.queryData.publisher })
  const game = await Game.findOne({ name: req.queryData.game })
  // get data from db
  // procces db data:
  const playerBalance = ((player?.gameBalances) != null)
    ? player.gameBalances?.find(
      (gameBalance) => gameBalance?.game?.toString() === game?._id.toString() &&
        gameBalance?.publisher?.toString() === publisher?._id.toString()
    )
    : null

  // procces db data
  // get player details from publisher:
  const details = await casino1.getAccountDetails(req.queryData.username)
  parseString(details, { trim: true, explicitArray: false }, (_err, resu) => {
    parsedDetails = resu
  })
  // get player details from publisher

  result.player = {
    username: player?.username,
    free_spins_left: playerBalance?.freeSpins ?? 0,
    free_spins_balance: playerBalance?.freeSpinbalance ?? 0,
    balance: parsedDetails.PKT.Result.Returnset.Balance.$.Value,
    last_roll: { screen: playerBalance?.lastScreen, bet: playerBalance?.lastBet }
  }

  return res.status(200).json(result)
})

router.get('/placebet', getParameters, async (req: any, res, _next) => {
  // types:

  const result: GeneralResponse = {}
  type Error = {
    code: string,
    name: string,
    message: string
  }
  const errors: Error[] = []
  let parsedPlacedBet: any
  // types
  // get data from db:
  let placedBet: any
  try {
    placedBet = await casino1.placeBet(req.queryData.username, req.queryData.bet)
  } catch (error: unknown) {
    if (error instanceof Error) {
      const newError = { code: codeProviderServer, name: error.name, message: error.message }
      errors.push(newError)
      result.errors = errors
      res.status(500).json(result)
    } else {
      res.status(500).json({ code: codeProviderServer, name: "unknown", message: "unknown" })
    }
  }
  console.log(placedBet)
  parseString(placedBet.text, { trim: true, explicitArray: false }, (_err, resu) => {
    parsedPlacedBet = resu
  })

  if (parsedPlacedBet) {
    console.log(parsedPlacedBet, 99)
    return res.status(200).json({ 0: 9 })
  }
  return res.status(200).json(result)
})

export default router
