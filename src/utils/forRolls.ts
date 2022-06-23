import { Chains, LineWin, Payments } from '../types'

export function reelsRound (reels: string[], visible = 3): string[] {
  return reels.map(r => r + r.slice(0, visible - 1))
}

function getRandomInt (min: number, max: number): number {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function roll (lengths: number[], _totalReels = 5): number[] {
  return lengths.map(l => getRandomInt(0, l - 1))
}

export function visibles (reelsR: string[], roll: number[], visible = 3): string[] {
  return reelsR.map((r) => r.slice(roll[reelsR.indexOf(r)], roll[reelsR.indexOf(r)] + visible))
}

export function winningChains (screen: string[], totalReels = 5, wild = 'W'): Chains {
  const chains: Chains = {}
  const v0 = screen[0]
  let potential = new Set(v0)

  v0.split('').forEach((letter, i, array) => {
    if ((array.indexOf(letter) === array.lastIndexOf(letter))) {
      chains[letter] = [v0.indexOf(letter)]
    } else {
      chains[letter + String(i)] = [i]
    }
  })

  let reelIndex = 1
  while (potential.size !== 0 && reelIndex < totalReels) {
    const reel = screen[reelIndex]
    let symbolPotential = new Set()
    if (!(reel.includes(wild))) {
      potential = new Set([...potential].filter(x => new Set(reel).has(x)))
      symbolPotential = potential
    } else {
      symbolPotential = new Set([...potential].filter(x => new Set(reel).has(x)))
    }
    const keys = Object.keys(chains)
    keys.forEach(key => {
      if (!(chains[key].length === reelIndex)) {
        return
      }
      const symbol = v0[chains[key][0]]
      if (reel.includes(wild)) {
        if ((reel.split('').indexOf(wild) === reel.split('').lastIndexOf(wild))) {
          chains[key + wild + String(reelIndex)] = chains[key].concat([reel.indexOf(wild)])
        } else {
          reel.split('').forEach((letter, i) => {
            if (letter === wild) {
              chains[key + String(i) + wild + String(reelIndex)] = chains[key].concat([i])
            }
          })
        }
        if (!(symbolPotential.has(symbol))) {
          // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
          delete chains[key]
        }
      }
      if (symbolPotential.has(symbol)) {
        if ((reel.split('').indexOf(symbol) === reel.split('').lastIndexOf(symbol))) {
          chains[key].push(reel.indexOf(symbol))
        } else {
          reel.split('').forEach((letter, i) => {
            if (letter === symbol) {
              chains[key + String(reelIndex) + String(i) + letter] = chains[key].concat([i])
            }
          })
        }
      }
    })
    reelIndex += 1
  }
  return chains
}

export function winnings (
  chains: Chains,
  payments: Payments,
  freeSpinList: number[],
  freeSpin = 'S'
): any {
  const lineWins: LineWin[] = []
  const keys = Object.keys(chains)
  let totalWin = 0
  let freeSpins = 0
  keys.forEach(key => {
    const chain = chains[key]
    const win = payments[key[0]][chain.length]

    if (key[0] === freeSpin) {
      freeSpins += freeSpinList[chains[key].length - 1]
    }

    if (win > 0) {
      totalWin += win
      lineWins.push(
        {
          symbol: key[0],
          chain: chain as Array<0|1|2>,
          win: win
        }
      )
    }
  })

  return {
    total_win: totalWin,
    free_spins: freeSpins,
    line_wins: lineWins
  }
}
