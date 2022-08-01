import { freeSpinsWinnings, normalWinnings } from '../routes/services/victorious'

export function rollResult(bet: number, userData: { balance: number, free_spins: number }): any {
  if (userData.free_spins !== 0) {
    const resultFreeSpin = freeSpinsWinnings()
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    userData.free_spins += resultFreeSpin.free_spins - 1
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    userData.balance += (resultFreeSpin.total_win * bet) / 25

    // escribir db

    return { spin_results: resultFreeSpin, balance: userData.balance, free_spins_left: userData.free_spins }
  } else {
    const resultNormal = normalWinnings()
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    userData.balance +=
      (resultNormal.total_win * bet) / 25 - bet
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    userData.free_spins += resultNormal.free_spins

    // escribir db
    return { spin_results: resultNormal, balance: userData.balance, free_spins_left: userData.free_spins }
  }
}
