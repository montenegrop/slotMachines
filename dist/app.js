'use strict'
const __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { default: mod }
}
Object.defineProperty(exports, '__esModule', { value: true })
// 3rd Party Modules
const express_1 = __importDefault(require('express'))
// Local Modules
// const myRoute = require("./routes/myRoute.js");
// Server Initialization
const app = (0, express_1.default)()
// Middlewares
app.use(express_1.default.json())
// Routes will be written here
// app.use("/route", myRoute);
exports.default = app
