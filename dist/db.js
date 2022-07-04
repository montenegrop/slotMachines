"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const Machine_1 = require("./entity/Machine");
const User_1 = require("./entity/User");
// import { Person } from './server'
const settings_1 = require("./settings");
exports.AppDataSource = new typeorm_1.DataSource({
    type: settings_1.databaseConfig.type,
    host: settings_1.databaseConfig.host,
    port: settings_1.databaseConfig.port,
    username: settings_1.databaseConfig.username,
    password: settings_1.databaseConfig.password,
    database: settings_1.databaseConfig.database,
    synchronize: true,
    logging: true,
    entities: [User_1.User, Machine_1.Machine]
    //   subscribers: [],
    //   migrations: []
});
