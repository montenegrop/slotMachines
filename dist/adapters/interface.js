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
exports.Casino1 = void 0;
/* eslint-disable @typescript-eslint/return-await */
const node_fetch_1 = __importDefault(require("node-fetch"));
const xmls_1 = require("./xmls");
class Casino1 {
    constructor(pn, login, password) {
        this.pn = pn;
        this.login = login;
        this.password = password;
    }
    getAccountDetails(token, publisher = { login: this.login, password: this.password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, node_fetch_1.default)('http://localhost:3000/publisher', {
                method: 'post',
                body: (0, xmls_1.accountDetailsXML)(token, publisher),
                headers: { 'Content-Type': 'application/xml' }
            }).then((res) => __awaiter(this, void 0, void 0, function* () { return yield res.text(); }));
            return response;
        });
    }
    getAccountBalance(token, publisher = { login: this.login, password: this.password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, node_fetch_1.default)('http://localhost:3000/publisher', {
                method: 'post',
                body: (0, xmls_1.accountBalanceXML)(token, publisher),
                headers: { 'Content-Type': 'application/xml' }
            }).then((res) => __awaiter(this, void 0, void 0, function* () { return yield res.text(); }));
            return response;
        });
    }
}
exports.Casino1 = Casino1;
