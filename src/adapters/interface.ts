/* eslint-disable @typescript-eslint/return-await */
import fetch from 'node-fetch'
import { publisherCatch } from '../errors/requests'
import { rootUrl } from '../settings'
import { accountDetailsXML, accountBalanceXML, placeBetXML } from './xmls'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type Publisher = {
  login: string
  password: string
}

interface IPublisher {
  getAccountDetails: (token: string, publisher: Publisher) => Promise<string>
  getAccountBalance: (token: string, publisher: Publisher) => Promise<string>
  placeBet: (
    token: string,
    bet: number,
    publisher: Publisher,
    transactionID: string,
    betReferenceNum: number,
    gameReference: string
  ) => Promise<string>
}

export class Casino1 implements IPublisher {
  pn: string
  login: string
  password: string

  constructor(pn: string, login: string, password: string) {
    this.pn = pn
    this.login = login
    this.password = password
  }

  async getAccountDetails(
    token: string,
    publisher: Publisher = { login: this.login, password: this.password }
  ): Promise<string> {
    const response: any = await fetch(`${rootUrl}/publisher`, {
      method: 'post',
      body: accountDetailsXML(token, publisher),
      headers: { 'Content-Type': 'application/xml' }
    }).then(async (res) => await res.text())

    return response
  }

  async getAccountBalance(
    token: string,
    publisher: Publisher = { login: this.login, password: this.password }
  ): Promise<string> {
    const response: any = await fetch(`${rootUrl}/publisher`, {
      method: 'post',
      body: accountBalanceXML(token, publisher),
      headers: { 'Content-Type': 'application/xml' }
    }).then(async (res) => await res.text())

    return response
  }

  placeBet(
    token: string,
    bet: number,
    publisher: Publisher | null,
    transactionID: string,
    betReferenceNum: number,
    gameReference: string
  ): Promise<any> {
    const response: any = fetch(`${rootUrl}/publisher`, {
      method: 'post',
      body: placeBetXML(
        token,
        bet,
        publisher ?? { login: this.login, password: this.password },
        transactionID,
        betReferenceNum,
        gameReference
      ),
      headers: { 'Content-Type': 'application/xml' }
    })
      .then((res) => {
        if (res.ok) {
          const text = res.text()
          const status = res.status
          const statusText = res.statusText
          return text.then((res) => {
            return { text: res, status, statusText }
          })
        } else {
          return { status: res.status, statusText: res.statusText }
        }
      })
      .catch(publisherCatch)
    return response
  }
}
