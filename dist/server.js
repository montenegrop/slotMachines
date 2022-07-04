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
const db_1 = require("./db");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("@adminjs/typeorm");
const adminjs_1 = __importDefault(require("adminjs"));
const express_1 = __importDefault(require("@adminjs/express"));
const adminConfig_1 = require("./admin/adminConfig");
const express_2 = __importDefault(require("express"));
const roll_1 = __importDefault(require("./routes/roll"));
void (() => __awaiter(void 0, void 0, void 0, function* () {
    // db:
    yield db_1.AppDataSource.initialize();
    // admin router:
    typeorm_1.Resource.validate = class_validator_1.validate;
    adminjs_1.default.registerAdapter({ Database: typeorm_1.Database, Resource: typeorm_1.Resource });
    const adminJs = new adminjs_1.default(adminConfig_1.adminConfig);
    const adminRouter = express_1.default.buildRouter(adminJs);
    // express:
    const app = (0, express_2.default)();
    // routers:
    app.use('/admin', adminRouter);
    app.use('/api', roll_1.default);
    // servers:
    app.listen(3000);
}))();
