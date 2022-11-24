"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.winnings = exports.winningChainsFS = exports.winningChains = exports.visibles = exports.roll = exports.reelsRound = void 0;
const freeSpinSymbol = 'S';
function reelsRound(reels, visible = 3) {
    return reels.map((r) => r + r.slice(0, visible - 1));
}
exports.reelsRound = reelsRound;
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function roll(lengths, _totalReels = 5) {
    return lengths.map((l) => getRandomInt(0, l - 1));
}
exports.roll = roll;
function visibles(reelsR, roll, visible = 3) {
    return reelsR.map((r) => r.slice(roll[reelsR.indexOf(r)], roll[reelsR.indexOf(r)] + visible));
}
exports.visibles = visibles;
function winningChains(screen, totalReels = 5, wild = 'W') {
    const chains = {};
    const v0 = screen[0];
    let potential = new Set(v0);
    v0.split('').forEach((letter, i, array) => {
        if (array.indexOf(letter) === array.lastIndexOf(letter)) {
            chains[letter] = [v0.indexOf(letter)];
        }
        else {
            chains[letter + String(i)] = [i];
        }
    });
    let reelIndex = 1;
    while (potential.size !== 0 && reelIndex < totalReels) {
        const reel = screen[reelIndex];
        let symbolPotential = new Set();
        if (!reel.includes(wild)) {
            potential = new Set([...potential].filter((x) => new Set(reel).has(x)));
            symbolPotential = potential;
        }
        else {
            symbolPotential = new Set([...potential].filter((x) => new Set(reel).has(x)));
        }
        const keys = Object.keys(chains);
        keys.forEach((key) => {
            if (!(chains[key].length === reelIndex)) {
                return;
            }
            const symbol = v0[chains[key][0]];
            if (reel.includes(wild)) {
                if (reel.split('').indexOf(wild) === reel.split('').lastIndexOf(wild)) {
                    chains[key + wild + String(reelIndex)] = chains[key].concat([
                        reel.indexOf(wild)
                    ]);
                }
                else {
                    reel.split('').forEach((letter, i) => {
                        if (letter === wild) {
                            chains[key + String(i) + wild + String(reelIndex)] = chains[key].concat([i]);
                        }
                    });
                }
                if (!symbolPotential.has(symbol)) {
                    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
                    delete chains[key];
                }
            }
            if (symbolPotential.has(symbol)) {
                if (reel.split('').indexOf(symbol) === reel.split('').lastIndexOf(symbol)) {
                    chains[key].push(reel.indexOf(symbol));
                }
                else {
                    reel.split('').forEach((letter, i) => {
                        if (letter === symbol) {
                            chains[key + String(reelIndex) + String(i) + letter] = chains[key].concat([i]);
                        }
                    });
                }
            }
        });
        reelIndex += 1;
    }
    return chains;
}
exports.winningChains = winningChains;
function winningChainsFS(screen, totalReels = 5, wild = 'W') {
    const chains = {};
    const v0 = screen[0];
    let potential = new Set(v0);
    potential.delete(freeSpinSymbol);
    v0.split('').forEach((letter, i, array) => {
        if (array.indexOf(letter) === array.lastIndexOf(letter)) {
            chains[letter] = [v0.indexOf(letter)];
        }
        else {
            chains[letter + String(i)] = [i];
        }
    });
    let reelIndex = 1;
    while (potential.size !== 0 && reelIndex < totalReels) {
        const reel = screen[reelIndex];
        let symbolPotential = new Set();
        if (!reel.includes(wild)) {
            potential = new Set([...potential].filter((x) => new Set(reel).has(x)));
            symbolPotential = potential;
        }
        else {
            symbolPotential = new Set([...potential].filter((x) => new Set(reel).has(x)));
        }
        const keys = Object.keys(chains);
        keys.forEach((key) => {
            if (!(chains[key].length === reelIndex)) {
                return;
            }
            const symbol = v0[chains[key][0]];
            if (reel.includes(wild)) {
                if (reel.split('').indexOf(wild) === reel.split('').lastIndexOf(wild)) {
                    chains[key + wild + String(reelIndex)] = chains[key].concat([
                        reel.indexOf(wild)
                    ]);
                }
                else {
                    reel.split('').forEach((letter, i) => {
                        if (letter === wild) {
                            chains[key + String(i) + wild + String(reelIndex)] = chains[key].concat([i]);
                        }
                    });
                }
                if (!symbolPotential.has(symbol)) {
                    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
                    delete chains[key];
                }
            }
            if (symbolPotential.has(symbol)) {
                if (reel.split('').indexOf(symbol) === reel.split('').lastIndexOf(symbol)) {
                    chains[key].push(reel.indexOf(symbol));
                }
                else {
                    reel.split('').forEach((letter, i) => {
                        if (letter === symbol) {
                            chains[key + String(reelIndex) + String(i) + letter] = chains[key].concat([i]);
                        }
                    });
                }
            }
        });
        reelIndex += 1;
    }
    const fsChain = screen.map((reel) => reel.includes(freeSpinSymbol) ? reel.indexOf(freeSpinSymbol) : -1);
    if (fsChain.filter((x) => x == -1).length < 3) {
        chains[freeSpinSymbol] = fsChain;
    }
    return chains;
}
exports.winningChainsFS = winningChainsFS;
function winnings(chains, payments, freeSpinList, freeSpin = 'S') {
    const lineWins = [];
    const keys = Object.keys(chains);
    let totalWin = 0;
    let freeSpins = 0;
    keys.forEach((key) => {
        const chain = chains[key];
        const win = payments[key[0]][chain.length];
        if (key[0] === freeSpin) {
            freeSpins += freeSpinList[chains[key].filter((x) => x !== -1).length - 1];
        }
        if (win > 0) {
            totalWin += win;
            lineWins.push({
                symbol: key[0],
                chain: chain,
                win: win
            });
        }
    });
    return {
        total_win: totalWin,
        free_spins: freeSpins,
        line_wins: lineWins
    };
}
exports.winnings = winnings;
