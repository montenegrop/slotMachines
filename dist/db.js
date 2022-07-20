"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const Machine_1 = require("./entity/Machine");
const Player_1 = require("./entity/Player");
const User_1 = require("./entity/User");
// import { Person } from './server'
const settings_1 = require("./settings");
require("dotenv/config");
exports.AppDataSource = new typeorm_1.DataSource({
    type: settings_1.databaseConfig.type,
    url: settings_1.databaseConfig.url,
    synchronize: true,
    logging: true,
    entities: [User_1.User, Machine_1.Machine, Player_1.Player],
    extra: { ssl: process.env.NODE_ENV !== 'development', rejectUnauthorized: false }
    //   subscribers: [],
    //   migrations: []
});
