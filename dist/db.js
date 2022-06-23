"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./entity/User");
// import { Person } from './server'
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'pablodevuser',
    password: '9282jjssssds',
    database: 'slots',
    synchronize: true,
    logging: true,
    entities: [User_1.User]
    //   subscribers: [],
    //   migrations: []
});
