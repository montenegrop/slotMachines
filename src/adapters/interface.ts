// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type Publisher = {
  login: string
  password: string
}

interface IProvider {
  getAccountDetails: (publisher: Publisher, token: string) => string
  getBalance: (publisher: Publisher, token: string) => number
}

class Casino1 implements IProvider {
  pn: string
  login: string
  password: string

  constructor (pn: string, login: string, password: string) {
    this.pn = pn
    this.login = login
    this.password = password
  }

  getAccountDetails (publisher: Publisher, token: string): string {
    return 'user1'
  }

  getBalance (publisher: Publisher, token: string): number {
    return token.length + publisher.login.length
  }
}
