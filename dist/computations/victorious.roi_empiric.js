"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const victorious_1 = require("../routes/services/victorious");
const initial = 0;
let cont = 0;
function roiEmpiric(amount) {
    const userData = { balance: initial, free_spins: 0 };
    let index = 0;
    while (index < amount || userData.free_spins !== 0) {
        if (userData.free_spins !== 0) {
            while (userData.free_spins !== 0) {
                const resultFreeSpin = (0, victorious_1.freeSpinsWinnings)();
                // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
                userData.free_spins += resultFreeSpin.free_spins - 1;
                // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
                userData.balance += (resultFreeSpin.total_win * 3.0) / 25;
                cont += 1;
            }
        }
        else {
            const resultNormal = (0, victorious_1.normalWinnings)();
            // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
            userData.balance += (resultNormal.total_win * 1.0) / 25 - 1.0;
            userData.free_spins = resultNormal.free_spins;
            cont += 1;
            index += 1;
        }
    }
    return {
        initial: initial,
        balance: userData.balance,
        amount: amount,
        expected_balance: initial - amount * (1 - 0.9688),
        calculated_roi: ((userData.balance - initial) * 1.0) / amount + 1
    };
}
console.log(roiEmpiric(1000000));
console.log('cont ', cont);
