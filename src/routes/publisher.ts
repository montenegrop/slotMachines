import bodyParser from 'body-parser'
import { Router } from 'express'
import { parseString } from 'xml2js'
import { Casino1 } from '../adapters/interface'

const balance = { money: 1000.0 }
const router = Router()
export const casino1 = new Casino1('pn', 'login', '  pass')
router
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .get('/', async (_req, res) => {
    // console.log('header: ', req.rawHeaders)
    const r = await casino1.getAccountDetails('token')
    res.status(200).end(r)
  })
  .post('/', bodyParser.text({ type: 'application/xml' }), (req, res) => {
    // console.log('header: ', req.rawHeaders)
    // res.type('application/xml')
    let body: any
    parseString(
      req.body,
      { trim: true, explicitArray: false },
      (_err, resu) => {
        body = resu
      }
    )
    let response, success
    if (body.PKT.Method.Params.BetAmount != null) {
      if (
        balance.money - parseFloat(body.PKT.Method.Params.BetAmount.$.Value) <
        0
      ) {
        success = 0
      } else {
        success = 1
      }
      response = `
      <PKT>
      <Result Name="GetAccountDetails" Success="${success}">
      <Returnset>
      <Token Type="string" Value="AASASJJ2982NDD" />
      <LoginName Type="string" Value="user11Betting" />
      <Balance Type="long" Value="${balance.money - parseFloat(body.PKT.Method.Params.BetAmount.$.Value)
        }" />
      </Returnset>
      </Result>
      </PKT>
    `
      balance.money -= parseFloat(body.PKT.Method.Params.BetAmount.$.Value)
    } else {
      response = `
      <PKT>
      <Result Name="GetAccountDetails" Success="1">
      <Returnset>
      <Token Type="string" Value="AASASJJ2982NDD" />
      <LoginName Type="string" Value="user11Details" />
      <Balance Type="long" Value="${balance.money}" />
      </Returnset>
      </Result>
      </PKT>
    `
    }
    res
      .set({ 'content-type': 'application/xml; charset=utf-8' })
      .send(response)
  })

export default router
