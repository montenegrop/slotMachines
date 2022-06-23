'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.winnings = exports.winningChains = exports.visibles = exports.roll = exports.reelsRound = void 0
function reelsRound (reels, visible = 3) {
  return reels.map(r => r + r.slice(0, visible - 1))
}
exports.reelsRound = reelsRound
function getRandomInt (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}
function roll (lengths, _totalReels = 5) {
  return lengths.map(l => getRandomInt(0, l))
}
exports.roll = roll
function visibles (reelsR, roll, visible = 3) {
  return reelsR.map((r) => r.slice(roll[reelsR.indexOf(r)], roll[reelsR.indexOf(r)] + visible))
}
exports.visibles = visibles
function winningChains (screen, totalReels = 5, wild = 'W') {
  const chains = {}
  const v0 = screen[0]
  let potential = new Set(v0)
  for (const symbol of potential) {
    chains[symbol] = [v0.indexOf(symbol)]
  }
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
        chains[key + wild + String(reelIndex)] = chains[key].concat([reel.indexOf(wild)])
      }
      if (symbolPotential.has(symbol)) {
        chains[key].push(reel.indexOf(symbol))
      }
    })
    reelIndex += 1
  }
  return chains
}
exports.winningChains = winningChains
function winnings (chains, payments, freeSpinList, freeSpin = 'S') {
  const lineWins = []
  const keys = Object.keys(chains)
  let totalWin = 0
  let freeSpins = 0
  keys.forEach(key => {
    const chain = chains[key]
    const wild = []
    const win = payments[key[0]][chain.length]
    if (key.length === 3) {
      wild.push(parseInt(key[2]))
    }
    if (key.length === 5) {
      wild.push([1, 3])
    }
    if (key[0] === freeSpin) {
      freeSpins += freeSpinList[chains[key].length - 1]
    }
    if (win > 0) {
      totalWin += win
      lineWins.push({
        symbol: key[0],
        chain: chain,
        wild: wild,
        win: win
      })
    }
  })
  return {
    total_win: totalWin,
    free_spins: freeSpins,
    line_wins: lineWins
  }
}
exports.winnings = winnings

const x = [0, 0, 0, 0, 0]
for (let w = 0; w < 200000; w++) {
  x[getRandomInt(0, 4)] += 1
}
console.log(x)
