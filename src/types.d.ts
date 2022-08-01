export interface LineWin {
  symbol: string
  chain: Array<0|1|2>
  win: number
}

export interface RollResult {
  visible: string[]
  line_wins: LineWin[]
  total_win: number
}

export interface Payments {
  [key: string]: {[key: number]: number}
}

export interface Chains {
  [key: string]: number[]
}

export interface GeneralResponse {
  errors: [{code: 'broke', message: 'not enough money'}] | []
  alerts?: []
  publisher?: {
    name: 'casino_dialo'
  }
  player?: {
    username?: string
    last_roll?: {
      screen?: string[]
      bet?: number
    }
    balance?: number
    free_spins_left?: number
    free_spins_balance?: number
  }
  spin_results?: {
    screen: string[]
    total_win: number
    free_spins: number
    line_wins: [
      {symbol: string, chain: number[], win: number}
    ]
  }
}
