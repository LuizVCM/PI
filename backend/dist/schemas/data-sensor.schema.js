"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDataSensorSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createDataSensorSchema = zod_1.default.object({
    valor: zod_1.default.number(),
});
