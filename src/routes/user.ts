import { Router } from 'express'
import { Casino1 } from '../adapters/interface'
import { parseString } from 'xml2js'

const router = Router()

// function getCasino (casino: any): any {
//   return casino
// }

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/details', async (req, res) => {
  const casino = new Casino1('pn', 'login', 'pass')
  console.log(req.query)
  const token = req.query.token as string
  console.log(token)
  const string = await casino.getAccountDetails(token)
  console.log('str', string, typeof string)
  //   const xml = '<PKT><Method Name="GetAccountDetails"><Auth Login="login" Password="pass" /><Params><Token Type="string" Value="asa" /></Params></Method></PKT>'
  parseString(string, { trim: true, explicitArray: false }, (_err, resu) => {
    console.log('resu', resu)
    res.status(200).json(resu)
  })
})

export default router
