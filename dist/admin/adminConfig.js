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
exports.adminConfig = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const Machine_1 = require("../entity/Machine");
const Player_1 = require("../entity/Player");
const User_1 = require("../entity/User");
exports.adminConfig = {
    // databases: [MyDataSource],
    resources: [
        {
            resource: User_1.User,
            options: {
                properties: {
                    encryptedPassword: {
                        isVisible: false
                    },
                    password: {
                        type: 'string',
                        isVisible: {
                            list: false, edit: true, filter: false, show: false
                        }
                    }
                },
                actions: {
                    new: {
                        label: 'create new user Pablo',
                        before: (request) => __awaiter(void 0, void 0, void 0, function* () {
                            console.log(request.payload, 'payload');
                            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                            if (request.payload.password) {
                                request.payload = Object.assign(Object.assign({}, request.payload), { encryptedPassword: yield bcrypt_1.default.hash(request.payload.password, 10), password: undefined });
                            }
                            return request;
                        })
                    }
                }
            }
        },
        {
            resource: Machine_1.Machine,
            options: {
                parent: { name: 'maquinas' },
                properties: {
                    Payments: {
                        type: 'mixed'
                    },
                    'Payments.A': {
                        type: 'string[]'
                    }
                }
            }
        },
        {
            resource: Player_1.Player,
            options: {
                parent: { name: 'players' }
            }
        }
    ]
};
// // Build and use a router which will handle all AdminJS routes
// const router = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
//   authenticate: async (email, password) => {
//     const user = await User.findOne({ where: { email: email } })
//     if (user !== null) {
//       const matched = await bcrypt.compare(password, user.encryptedPassword)
//       if (matched === true) {
//         return user
//       }
//     }
//     return false
//   },
//   cookiePassword: 'some-secret-password-used-to-secure-cookie'
// })
