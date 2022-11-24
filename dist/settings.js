"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.publisher1 = exports.PORT = exports.databaseConfig = exports.MONGODB = exports.rootUrl = void 0;
// server:
let urlEnv;
if (process.env.ENV === 'dev') {
    urlEnv = 'https://slot-machine-zn.herokuapp.com';
}
else if (process.env.ENV === 'prod') {
    urlEnv = 'https://slot-machine-prod.herokuapp.com';
}
else {
    urlEnv = 'http://localhost:3000';
}
exports.rootUrl = urlEnv;
console.log(exports.rootUrl);
// database:
const user = 'slotuser';
const password = 'slotpassword';
const database = 'slots';
exports.MONGODB = `mongodb+srv://${user}:${password}@slotmachine.qmyrasv.mongodb.net/${database}?retryWrites=true&w=majority`;
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
