"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.publisher1 = exports.PORT = exports.databaseConfig = void 0;
const dbString = 'postgres://pablodevuser:9282jjssssds@localhost:5432/slots';
exports.databaseConfig = {
    type: 'postgres',
    url: (_a = process.env.DATABASE_URL) !== null && _a !== void 0 ? _a : dbString
};
// servers:
exports.PORT = (_b = process.env.PORT) !== null && _b !== void 0 ? _b : 3000;
// publishers:
exports.publisher1 = {
    pn: 'pn',
    login: 'login',
    password: 'pass'
};
