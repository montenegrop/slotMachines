export interface LineWin {
  symbol: string
  chain: Array<0|1|2>
  wild: any
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
