"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rollVictorious_example_1 = require("./services/rollVictorious.example");
const victorious_1 = require("./services/victorious");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const router = (0, express_1.Router)();
router.get('/example/victorious', (_req, res) => {
    res.status(200).json((0, rollVictorious_example_1.getRollResult)());
});
router.get('/victorious', (req, res) => {
    const file = fs_1.default.readFileSync(path_1.default.join(__dirname, '../players/player1.json'), 'utf-8');
    const userData = JSON.parse(file);
    if (userData.free_spins !== 0) {
        const resultFreeSpin = (0, victorious_1.freeSpinsWinnings)();
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        userData.free_spins += resultFreeSpin.free_spins - 1;
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        userData.balance += resultFreeSpin.total_win * 1.0 / 25;
        userData.screen = resultFreeSpin.screen;
        console.log('fs');
        console.log('data', userData);
        fs_1.default.writeFileSync(path_1.default.join(__dirname, '../players/player1.json'), JSON.stringify(userData));
        fs_1.default.writeFileSync(path_1.default.join(__dirname, '../players/player1fs.json'), JSON.stringify(userData));
        res.status(200).json(resultFreeSpin);
    }
    else {
        const resultNormal = (0, victorious_1.normalWinnings)();
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        userData.balance += resultNormal.total_win * 1.0 / 25 - parseInt(req.query.bet);
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        userData.free_spins += resultNormal.free_spins;
        userData.screen = resultNormal.screen;
        console.log('data', userData);
        fs_1.default.writeFileSync(path_1.default.join(__dirname, '../players/player1.json'), JSON.stringify(userData));
        res.status(200).json(resultNormal);
    }
});
exports.default = router;
