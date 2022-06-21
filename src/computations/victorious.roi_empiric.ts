import path from 'path'
import { freeSpinsWinnings, normalWinnings } from '../routes/services/victorious'
import fs from 'fs'

const initial = 10000

function roiEmpiric (amount: number): any {
  fs.writeFileSync(path.join(__dirname, '/roi_empiric.json'), JSON.stringify({ balance: initial, free_spins: 0 }))
  const file = fs.readFileSync(path.join(__dirname, '/roi_empiric.json'), 'utf-8')
  let userData = JSON.parse(file)
  Array(amount).fill(0).forEach((_, _i) => {
    if (userData.free_spins !== 0) {
      while (userData.free_spins !== 0) {
        const fileFS = fs.readFileSync(path.join(__dirname, '/roi_empiric.json'), 'utf-8')
        userData = JSON.parse(fileFS)
        const resultFreeSpin = freeSpinsWinnings()
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        userData.free_spins += resultFreeSpin.free_spins - 1

        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        userData.balance += resultFreeSpin.total_win * 1.0 / 25
        userData.line_wins = resultFreeSpin.line_wins
        userData.screen = resultFreeSpin.screen
        fs.writeFileSync(path.join(__dirname, '/roi_empiric.json'), JSON.stringify(userData))
      }
    } else {
      const fileN = fs.readFileSync(path.join(__dirname, '/roi_empiric.json'), 'utf-8')
      userData = JSON.parse(fileN)
      const resultNormal = normalWinnings()
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      userData.balance += resultNormal.total_win * 1.0 / 25 - 1.0
      userData.free_spins = resultNormal.free_spins
      userData.line_wins = resultNormal.line_wins
      userData.screen = resultNormal.screen
      fs.writeFileSync(path.join(__dirname, '/roi_empiric.json'), JSON.stringify(userData))
    }
  })
  const fileR = fs.readFileSync(path.join(__dirname, '/roi_empiric.json'), 'utf-8')
  userData = JSON.parse(fileR)
  return {
    initial: initial,
    balance: userData.balance,
    amount: amount,
    expected_balance: initial - amount * (1 - 0.9688),
    calculated_roi: (userData.balance - initial) * 1.0 / amount + 1
  }
}

console.log(roiEmpiric(100000))
