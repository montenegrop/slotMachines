/* eslint-disable @typescript-eslint/return-await */
import fetch from 'node-fetch'
import { accountDetailsXML, accountBalanceXML } from './xmls'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type Publisher = {
  login: string
  password: string
}

interface IProvider {
  getAccountDetails: (token: string, publisher: Publisher) => Promise<string>
  getAccountBalance: (token: string, publisher: Publisher) => Promise<string>
}

export class Casino1 implements IProvider {
  pn: string
  login: string
  password: string

  constructor (pn: string, login: string, password: string) {
    this.pn = pn
    this.login = login
    this.password = password
  }

  async getAccountDetails (token: string,
    publisher: Publisher = { login: this.login, password: this.password }
  ): Promise<string> {
    console.log('init')
    const response: any = await fetch('http://localhost:3000/publisher', {
      method: 'post',
      body: accountDetailsXML(token, publisher),
      headers: { 'Content-Type': 'application/xml' }
    }).then(async res => await res.text())
      .then(res => {
        console.log('res', res)
        return res
      })

    return response
  }

  async getAccountBalance (token: string,
    publisher: Publisher = { login: this.login, password: this.password }
  ): Promise<string> {
    console.log('init')
    const response: any = await fetch('http://localhost:3000/publisher', {
      method: 'post',
      body: accountBalanceXML(token, publisher),
      headers: { 'Content-Type': 'application/xml' }
    }).then(async res => await res.json())
      .then(json => console.log('json', json))

    return response
  }
}
