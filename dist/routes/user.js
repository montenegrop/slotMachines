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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const interface_1 = require("../adapters/interface");
const xml2js_1 = require("xml2js");
const router = (0, express_1.Router)();
// function getCasino (casino: any): any {
//   return casino
// }
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/details', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const casino = new interface_1.Casino1('pn', 'login', 'pass');
    console.log(req.query);
    const token = req.query.token;
    console.log(token);
    const string = yield casino.getAccountDetails(token);
    console.log('str', string, typeof string);
    //   const xml = '<PKT><Method Name="GetAccountDetails"><Auth Login="login" Password="pass" /><Params><Token Type="string" Value="asa" /></Params></Method></PKT>'
    (0, xml2js_1.parseString)(string, { trim: true, explicitArray: false }, (_err, resu) => {
        console.log('resu', resu);
        res.status(200).json(resu);
    });
}));
exports.default = router;
