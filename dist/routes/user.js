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
const xml2js_1 = require("xml2js");
const publisher_1 = require("./publisher");
const Player_1 = __importDefault(require("../db/models/Player"));
const findOrCreate_1 = require("../db/queries/findOrCreate");
const router = (0, express_1.Router)();
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/details', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.query.username;
    const details = {};
    const userDetails = yield publisher_1.casino1.getAccountDetails(user);
    (0, xml2js_1.parseString)(userDetails, { trim: true, explicitArray: false }, (_err, resu) => {
        details.publisher = resu;
    });
    const player = yield Player_1.default.findOne({ username: user });
    details.player = player === null || player === void 0 ? void 0 : player.gameBalances[0];
    res.status(200).json(details);
}));
router.get('/newUser', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.query.username);
    const user = req.query.username;
    const usuario = yield (0, findOrCreate_1.findOrCreatePlayer)(user);
    res.status(200).json(usuario);
}));
exports.default = router;
