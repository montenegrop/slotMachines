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
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("@adminjs/typeorm");
const class_validator_1 = require("class-validator");
const adminjs_1 = __importDefault(require("adminjs"));
const express_2 = __importDefault(require("@adminjs/express"));
const roll_1 = __importDefault(require("./routes/roll"));
const User_1 = require("./entity/User");
void (() => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.AppDataSource.initialize();
    typeorm_1.Resource.validate = class_validator_1.validate;
    adminjs_1.default.registerAdapter({ Database: typeorm_1.Database, Resource: typeorm_1.Resource });
    const adminJs = new adminjs_1.default({
        // databases: [MyDataSource],
        resources: [
            { resource: User_1.User, options: { parent: { name: 'foobar' } } }
        ],
        rootPath: '/admin'
    });
    const app = (0, express_1.default)();
    const router = express_2.default.buildRouter(adminJs);
    app.use('/admin', router);
    app.use('/api', roll_1.default);
    app.listen(3000);
}))();
