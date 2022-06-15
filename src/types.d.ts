interface lineWin {
  symbol: string
  chain: Array<0|1|2>
  win: number
}

export interface RollResult {
  visible: string[]
  line_wins: lineWin[]
  total_win: number
}
