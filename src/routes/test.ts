import { Router } from 'express'
import { parseString } from 'xml2js'
import Game from '../db/Game'
import Player from '../db/Player'
import Roll from '../db/Roll'
import Publisher from '../db/Publisher'
import { codeProviderServer, codePublisherServer } from '../errors/requests'
import { GeneralResponse, ErrorType } from '../types'
import { getNested } from '../utils/parsing'
import { rollResult } from '../utils/rollResult'
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
  const errors: ErrorType[] = []
  let placedBetText: any
  let placedBet: any
  let player: any
  // types
  // get data from db:
  player = await Player.findOne({ username: req.queryData.username })
  // supongamos no tiene fs
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
  if (!(placedBet.text)) {
    const newError = { code: codePublisherServer, name: placedBet.status.toString(), message: placedBet.statusText }
    errors.push(newError)
    result.errors = errors
    return res.status(200).json(result)
  }
  parseString(placedBet.text, { trim: true, explicitArray: false }, (_err, parsed) => {
    placedBetText = parsed
  })
  const successValue = getNested(placedBetText, 'PKT', 'Result', '$', 'Success')
  if (successValue !== "0" && successValue !== "1") {
    const newError = { code: "PUBLISHER_REJECTED_BET", name: placedBet.status.toString(), message: placedBet.statusText }
    errors.push(newError)
    result.errors = errors
    return res.status(200).json(result)
  }
  if (successValue === "0") {
    const newError = { code: "PUBLISHER_REJECTED_BET", name: placedBet.status.toString(), message: placedBet.statusText }
    errors.push(newError)
    result.errors = errors
    return res.status(200).json(result)
  }
  // at this point successValue === "1":
  // get roll:
  const rollResults = rollResult(req.queryData.bet, { balance: 0, free_spins: 0 })
  const publisher = await Publisher.findOne({ name: req.queryData.publisher })
  const game = await Game.findOne({ name: req.queryData.game })
  if (player == null) {
    player = await Player.create({ username: req.queryData.username })
  }
  let playerBalance = player.gameBalances.find(
    (gameBalance: any) => gameBalance?.game?.toString() === game?._id.toString() &&
      gameBalance?.publisher?.toString() === publisher?._id.toString()
  )
  if (playerBalance == null) {
    playerBalance = { game: game, publisher: publisher, freeSpinbalance: 0, freeSpins: 0 }
    player.gameBalances.push(playerBalance)
  }
  playerBalance.lastBalance += rollResults.balance
  playerBalance.freeSpins = rollResults.free_spins_left
  playerBalance.lastBet = req.queryData.bet
  await player.save()

  if (errors.length === 0) {
    const roll = await Roll.create({
      game: game,
      publisher: publisher,
      player: player,
      bet: parseFloat(req.queryData.bet),
      result: JSON.stringify(rollResults.spin_results.screen),
      wins: parseFloat(rollResults.balance)
    })
    console.log(roll)
  } else {
    return res.status(200).json(errors)
  }
  result.errors = errors
  result.publisher = { name: publisher?.name || "PUBLISHER NAME" }
  result.player = {
    username: req.queryData.username,
    last_roll: { screen: rollResults.spin_results.screen, bet: req.queryData.bet },
    balance: playerBalance.lastBalance,
    free_spins_balance: playerBalance.freeSpinbalance,
    free_spins_left: playerBalance.freeSpins
  }
  result.spin_results = rollResults.spin_results

  // get db objects:
  return res.status(200).json(result)
})

export default router

