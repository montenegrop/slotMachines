"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// 3rd Party Modules
const express_1 = __importDefault(require("express"));
// Local Modules
// const myRoute = require("./routes/myRoute.js");
const admin_1 = __importDefault(require("./routes/admin"));
const roll_1 = __importDefault(require("./routes/roll"));
const db_1 = require("./db");
require("reflect-metadata");
// Server Initialization
const app = (0, express_1.default)();
// db Initialization
db_1.AppDataSource.initialize()
    .then(() => {
    // here you can start to work with your database
})
    .catch((error) => console.log('db init error', error));
// Middlewares
app.use(express_1.default.json());
// Routes will be written here
app.use('/admin', admin_1.default);
app.use('/roll', roll_1.default);
exports.default = app;
