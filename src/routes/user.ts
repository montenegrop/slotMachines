import { Router } from 'express'
import { parseString } from 'xml2js'

import { casino1 } from './publisher'
import Player from '../db/Player'

const router = Router()

// function getCasino (casino: any): any {
//   return casino
// }

interface Details {
  errors?: any[]
  publisher?: any
  player?: any
}

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/details', async (req, res) => {
  const user = req.query.username

  const details: Details = {}

  const userDetails = await casino1.getAccountDetails(user as string)
  parseString(userDetails, { trim: true, explicitArray: false }, (_err, resu) => {
    details.publisher = resu
  })

  const player = await Player.findOne({ username: user })
  details.player = player?.gameBalances[0]

  res.status(200).json(details)
})

export default router
