import bodyParser from 'body-parser'
import { Router } from 'express'
import { Casino1 } from '../adapters/interface'

const router = Router()
const casino1 = new Casino1('pn', 'login', 'pass')

router
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .get('/', async (_req, res) => {
    // console.log('header: ', req.rawHeaders)
    const r = await casino1.getAccountDetails('token')
    console.log('pres', r)
    res.status(200).end(r)
  })
  .post('/', bodyParser.text({ type: 'application/xml' }), (req, res) => {
    // console.log('header: ', req.rawHeaders)
    // res.type('application/xml')
    console.log('body', req.body)
    const response = `
      <PKT>
      <Result Name="GetAccountDetails" Success="1">
      <Returnset>
      <Token Type="string" Value="AASASJJ2982NDD" />
      <LoginName Type="string" Value="user112" />
      <Balance Type="long" Value="9992" />
      </Returnset>
      </Result>
      </PKT>
    `
    res.set({ 'content-type': 'application/xml; charset=utf-8' }).send(response)
  })

export default router
