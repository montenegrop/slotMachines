import bodyParser from 'body-parser'
import { Router } from 'express'
import { Casino1 } from '../adapters/interface'

const router = Router()
const casino1 = new Casino1('pn', 'login', 'pass')

router
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .get('/', async (_req, res) => {
    // console.log('header: ', req.rawHeaders)
    console.log('get')
    await casino1.getAccountDetails('token')
    res.status(200).end('xd')
  })
  .post('/', bodyParser.text({ type: 'application/xml' }), (req, res) => {
    console.log('body1: ', req.body)
    // console.log('header: ', req.rawHeaders)
    // res.type('application/xml')
    res.set({ 'content-type': 'application/json; charset=utf-8' }).send({ a: 3 })
  })

export default router
