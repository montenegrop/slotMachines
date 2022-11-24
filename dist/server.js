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
require("dotenv/config");
const adminjs_1 = __importDefault(require("adminjs"));
const express_1 = __importDefault(require("@adminjs/express"));
const mongoose_1 = __importDefault(require("@adminjs/mongoose"));
const express_2 = __importDefault(require("express"));
const mongoose_2 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const roll_1 = __importDefault(require("./routes/roll"));
const zombie_1 = __importDefault(require("./routes/zombie"));
const publisher_1 = __importDefault(require("./routes/publisher"));
const user_1 = __importDefault(require("./routes/user"));
const settings_1 = require("./settings");
const adminConfig_1 = require("./admin/adminConfig");
const routerConfig_1 = require("./admin/routerConfig");
const test_1 = __importDefault(require("./routes/test"));
void (() => __awaiter(void 0, void 0, void 0, function* () {
    // db:
    mongoose_2.default.connect(settings_1.MONGODB, () => {
        console.log('connected to mongo');
    });
    // admin
    const adminJsOptions = Object.assign({}, adminConfig_1.adminConfig);
    // admin router:
    adminjs_1.default.registerAdapter(mongoose_1.default);
    const adminJs = new adminjs_1.default(adminJsOptions);
    // const adminRouter = AdminJSExpress.buildRouter(adminJs)
    // Build and use a router which will handle all AdminJS routes
    const adminUsersRouter = express_1.default.buildAuthenticatedRouter(adminJs, routerConfig_1.routerConfig);
    // express:
    const app = (0, express_2.default)();
    // global middlewares:
    app.use((0, cors_1.default)());
    // routers:
    app.use('/admin', adminUsersRouter);
    // app.use('/admin', adminRouter)
    app.use('/api', roll_1.default);
    app.use('/zombie', zombie_1.default);
    app.use('/publisher', publisher_1.default);
    app.use('/user', user_1.default);
    app.use('/test', test_1.default);
    // servers:
    app.listen(settings_1.PORT);
}))();
