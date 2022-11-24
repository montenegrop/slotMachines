"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminConfig = void 0;
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
// import bcrypt from 'bcrypt'
const Game_1 = __importDefault(require("../db/models/Game"));
const Player_1 = __importDefault(require("../db/models/Player"));
const Publisher_1 = __importDefault(require("../db/models/Publisher"));
const localeConfig_1 = require("./localeConfig");
const machineConfig_1 = require("./machineConfig");
const rollConfig_1 = require("./rollConfig");
const userConfig_1 = require("./userConfig");
// const canSeeRecords = ({ currentAdmin, record }: any) => {
//   console.log(record)
//   console.log(currentAdmin)
//   return currentAdmin && (
//     currentAdmin.role === 'admin' ||
//   currentAdmin.provider === record.params.provider
//   )
// }
exports.adminConfig = {
    // databases: [MyDataSource],
    locale: localeConfig_1.localeConfig,
    resources: [
        { resource: Player_1.default },
        { resource: Publisher_1.default },
        { resource: Game_1.default },
        Object.assign({}, rollConfig_1.rollConfig),
        Object.assign({}, userConfig_1.userConfig),
        Object.assign({}, machineConfig_1.machineConfig)
    ]
};
