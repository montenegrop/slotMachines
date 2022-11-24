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
exports.casino1 = void 0;
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = require("express");
const xml2js_1 = require("xml2js");
const interface_1 = require("../adapters/interface");
const balance = { money: 1000.0 };
const router = (0, express_1.Router)();
exports.casino1 = new interface_1.Casino1('pn', 'login', 'pass');
router
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    .get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log('header: ', req.rawHeaders)
    const r = yield exports.casino1.getAccountDetails('token');
    res.status(200).end(r);
}))
    .post('/', body_parser_1.default.text({ type: 'application/xml' }), (req, res) => {
    // console.log('header: ', req.rawHeaders)
    // res.type('application/xml')
    let body;
    (0, xml2js_1.parseString)(req.body, { trim: true, explicitArray: false }, (_err, resu) => {
        body = resu;
    });
    let response, success;
    if (body.PKT.Method.Params.BetAmount != null) {
        if (balance.money - parseFloat(body.PKT.Method.Params.BetAmount.$.Value) <
            0) {
            success = 0;
        }
        else {
            success = 1;
        }
        response = `
      <PKT>
      <Result Name="GetAccountDetails" Success="${success}">
      <Returnset>
      <Token Type="string" Value="AASASJJ2982NDD" />
      <LoginName Type="string" Value="user11Betting" />
      <Balance Type="long" Value="${balance.money - parseFloat(body.PKT.Method.Params.BetAmount.$.Value)}" />
      </Returnset>
      </Result>
      </PKT>
    `;
        balance.money -= parseFloat(body.PKT.Method.Params.BetAmount.$.Value);
    }
    else {
        response = `
      <PKT>
      <Result Name="GetAccountDetails" Success="1">
      <Returnset>
      <Token Type="string" Value="AASASJJ2982NDD" />
      <LoginName Type="string" Value="user11Details" />
      <Balance Type="long" Value="${balance.money}" />
      </Returnset>
      </Result>
      </PKT>
    `;
    }
    res.set({ 'content-type': 'application/xml; charset=utf-8' }).send(response);
});
exports.default = router;
