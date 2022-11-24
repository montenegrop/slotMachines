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
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
const rollVictorious_example_1 = require("./services/rollVictorious.example");
const victorious_1 = require("./services/victorious");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const express_1 = require("express");
const Player_1 = __importDefault(require("../db/models/Player"));
const Game_1 = __importDefault(require("../db/models/Game"));
const Publisher_1 = __importDefault(require("../db/models/Publisher"));
const publisher_1 = require("./publisher");
const xml2js_1 = require("xml2js");
const Roll_1 = __importDefault(require("../db/models/Roll"));
const router = (0, express_1.Router)();
const dir = path_1.default.join(__dirname, '../players');
if (!fs_1.default.existsSync(dir)) {
    fs_1.default.mkdirSync(dir);
}
fs_1.default.writeFileSync(path_1.default.join(__dirname, '../players/player2.json'), JSON.stringify({
    id: 2,
    balance: 1000,
    free_spins: 0,
    screen: ['EFS', 'DEJ', 'GDB', 'FCJ', 'SCJ']
}));
router.get('/example/victorious', (_req, res) => {
    res.status(200).json((0, rollVictorious_example_1.getRollResult)());
});
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/victorious', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
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
        res.status(200).json({
            spin_results: resultFreeSpin,
            balance: userData.balance,
            free_spins_left: userData.free_spins
        });
    }
    else {
        let arr = [];
        if (((_a = req.query.arr) === null || _a === void 0 ? void 0 : _a.length) !== undefined) {
            arr = req.query.arr.split(',').map(function (item) {
                return parseInt(item, 10);
            });
        }
        const resultNormal = (0, victorious_1.normalWinnings)(arr);
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        userData.balance +=
            (resultNormal.total_win * 1.0) / 25 - parseInt(req.query.bet);
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        userData.free_spins += resultNormal.free_spins;
        userData.screen = resultNormal.screen;
        fs_1.default.writeFileSync(path_1.default.join(__dirname, '../players/player2.json'), JSON.stringify(userData));
        res.status(200).json({
            spin_results: resultNormal,
            balance: userData.balance,
            free_spins_left: userData.free_spins
        });
    }
}));
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const getParameters = function (req, _res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const queryData = {
            bet: parseFloat(req.query.bet),
            username: req.query.username,
            game: req.query.game,
            publisher: req.query.publisher,
            hash: req.query.hash
        };
        req.queryData = queryData;
        next();
    });
};
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/provider', getParameters, (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    let result;
    let player;
    const errors = [];
    result = {};
    player = yield Player_1.default.findOne({ username: req.queryData.username });
    if (player == null) {
        player = yield Player_1.default.create({ username: req.queryData.username });
    }
    const publisher = yield Publisher_1.default.findOne({ name: req.queryData.publisher });
    const game = yield Game_1.default.findOne({ name: req.queryData.game });
    let playerBalance = player.gameBalances.find((gameBalance) => {
        var _a, _b;
        return ((_a = gameBalance === null || gameBalance === void 0 ? void 0 : gameBalance.game) === null || _a === void 0 ? void 0 : _a.toString()) === (game === null || game === void 0 ? void 0 : game._id.toString()) &&
            ((_b = gameBalance === null || gameBalance === void 0 ? void 0 : gameBalance.publisher) === null || _b === void 0 ? void 0 : _b.toString()) === (publisher === null || publisher === void 0 ? void 0 : publisher._id.toString());
    });
    if (playerBalance == null) {
        playerBalance = {
            game: game,
            publisher: publisher,
            freeSpinbalance: 0,
            freeSpins: 0
        };
        player.gameBalances.push(playerBalance);
    }
    let balanceGeneralObject;
    if (playerBalance.freeSpins !== 0) {
        result = rollResult(req.queryData.bet, {
            balance: playerBalance.freeSpinbalance,
            free_spins: playerBalance.freeSpins
        });
        playerBalance.freeSpinbalance = result.balance;
        // actualizar db
        // actualizar publisher
    }
    else {
        // consultar si puedo apostar
        const balanceGeneral = yield publisher_1.casino1.placeBet(player.username, req.queryData.bet, null, 'transactionId', 1234123, 'gameReferencce');
        // consultar publisher por saldo:
        (0, xml2js_1.parseString)(balanceGeneral, { trim: true, explicitArray: false }, (_err, resu) => {
            balanceGeneralObject = resu;
        });
        if (balanceGeneralObject.PKT.Result.$.Success === '1') {
            result = rollResult(req.queryData.bet, { balance: 0, free_spins: 0 });
        }
        else {
            errors.push('Apuesta no autorizada');
        }
    }
    // const balancePostBet = parseFloat(balanceGeneralObject.PKT.Result.ReturnSet.Balance.$.Value)
    // actualizar publisher
    // actualizar db
    console.log(JSON.stringify(result.spin_results.screen));
    if (errors.length === 0) {
        const roll = yield Roll_1.default.create({
            game: game,
            publisher: publisher,
            player: player,
            bet: parseFloat(req.queryData.bet),
            result: JSON.stringify(result.spin_results.screen),
            wins: (parseFloat(result.spin_results.total_win) *
                parseFloat(req.queryData.bet)) /
                25
        });
        console.log(roll);
    }
    else {
        return res.status(200).json(errors);
    }
    playerBalance.freeSpins = result.free_spins_left;
    playerBalance.lastBet = req.queryData.bet;
    yield player.save();
    return res.status(200).json(result);
}));
exports.default = router;
function rollResult(bet, userData) {
    if (userData.free_spins !== 0) {
        const resultFreeSpin = (0, victorious_1.freeSpinsWinnings)();
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        userData.free_spins += resultFreeSpin.free_spins - bet;
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        userData.balance += (resultFreeSpin.total_win * bet) / 25;
        // escribir db
        return {
            spin_results: resultFreeSpin,
            balance: userData.balance,
            free_spins_left: userData.free_spins
        };
    }
    else {
        const resultNormal = (0, victorious_1.normalWinnings)();
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        userData.balance += (resultNormal.total_win * bet) / 25 - bet;
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        userData.free_spins += resultNormal.free_spins;
        // escribir db
        return {
            spin_results: resultNormal,
            balance: userData.balance,
            free_spins_left: userData.free_spins
        };
    }
}
