"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rollVictorious_example_1 = require("./services/rollVictorious.example");
const victorious_1 = require("./services/victorious");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const interface_1 = require("../adapters/interface");
const router = (0, express_1.Router)();
const dir = path_1.default.join(__dirname, '../players');
if (!fs_1.default.existsSync(dir)) {
    fs_1.default.mkdirSync(dir);
}
fs_1.default.writeFileSync(path_1.default.join(__dirname, '../players/player2.json'), JSON.stringify({ id: 2, balance: 0, free_spins: 0, screen: ['EFS', 'DEJ', 'GDB', 'FCJ', 'SCJ'] }));
router.get('/example/victorious', (_req, res) => {
    res.status(200).json((0, rollVictorious_example_1.getRollResult)());
});
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/victorious', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = fs_1.default.readFileSync(path_1.default.join(__dirname, '../players/player2.json'), 'utf-8');
    const userData = JSON.parse(file);
    if (userData.free_spins !== 0) {
        const resultFreeSpin = (0, victorious_1.freeSpinsWinnings)();
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        userData.free_spins += resultFreeSpin.free_spins - 1;
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        userData.balance += (resultFreeSpin.total_win * 1.0) / 25;
        userData.screen = resultFreeSpin.screen;
        fs_1.default.writeFileSync(path_1.default.join(__dirname, '../players/player2.json'), JSON.stringify(userData));
        fs_1.default.writeFileSync(path_1.default.join(__dirname, '../players/player2.json'), JSON.stringify(userData));
        res.status(200).json({ spin_results: resultFreeSpin, balance: userData.balance, free_spins_left: userData.free_spins });
    }
    else {
        const resultNormal = (0, victorious_1.normalWinnings)();
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        userData.balance +=
            (resultNormal.total_win * 1.0) / 25 - parseInt(req.query.bet);
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        userData.free_spins += resultNormal.free_spins;
        userData.screen = resultNormal.screen;
        const casino1 = new interface_1.Casino1('pn', 'login', 'pass');
        void casino1.getAccountDetails('token');
        fs_1.default.writeFileSync(path_1.default.join(__dirname, '../players/player2.json'), JSON.stringify(userData));
        res.status(200).json({ spin_results: resultNormal, balance: userData.balance, free_spins_left: userData.free_spins });
    }
}));
exports.default = router;
