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
  return lengths.map(l => getRandomInt(0, l))
}

export function visibles (reelsR: string[], roll: number[], visible = 3): string[] {
  console.log('roll', roll)
  return reelsR.map((r) => r.slice(roll[reelsR.indexOf(r)], roll[reelsR.indexOf(r)] + visible))
}

export function winningChains (screen: string[], totalReels = 5, wild = 'W'): Chains {
  const chains: Chains = {}
  const v0 = screen[0]
  let potential = new Set(v0)
  for (const symbol in potential) {
    chains[symbol] = [v0.indexOf(symbol)]
  }
  let reelIndex = 1
  console.log('initchains', chains)
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
        chains[key + wild + String(reelIndex)] = chains[key].concat([reel.indexOf(wild)])
      }
      if (symbol in symbolPotential) {
        chains[key].push(reel.indexOf(symbol))
      }
    })
    reelIndex += 1
  }
  console.log('endchains', chains)
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
  console.log('init', lineWins)
  keys.forEach(key => {
    const chain = chains[key]
    const wild = []
    const win = payments[key[0]][String(chain.length)]
    // # si hay multiplicador del len(key)
    if (key.length === 3) {
      wild.push(parseInt(key[2]))
    }
    if (key.length === 5) {
      wild.push(parseInt(key[4]))
    }

    if (win > 0) {
      totalWin += win
      lineWins.push(
        {
          symbol: key[0],
          chain: chain as Array<0|1|2>,
          wild: wild,
          win: win
        }
      )
    }
  })
  console.log('end', lineWins)
  let freeSpins = 0
  if (freeSpin in keys) {
    freeSpins = freeSpinList[chains[freeSpin].length - 1]
  }

  return {
    total_win: totalWin,
    free_spins: freeSpins,
    line_wins: lineWins
  }
}
