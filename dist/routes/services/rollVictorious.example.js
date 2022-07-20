"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRollResult = void 0;
const rollVictorious_data_example_json_1 = __importDefault(require("./rollVictorious.data.example.json"));
const roll = rollVictorious_data_example_json_1.default;
const getRollResult = () => roll;
exports.getRollResult = getRollResult;
