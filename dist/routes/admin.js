"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const adminjs_1 = __importDefault(require("adminjs"));
const express_1 = __importDefault(require("@adminjs/express"));
const adminJs = new adminjs_1.default({
    databases: [],
    rootPath: '/admin'
});
const router = express_1.default.buildRouter(adminJs);
exports.default = router;
