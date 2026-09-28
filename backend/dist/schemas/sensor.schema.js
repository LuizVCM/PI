"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSensorSchema = exports.createSensorSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const Sensor_1 = require("../models/Sensor");
exports.createSensorSchema = zod_1.default.object({
    modelo: zod_1.default.string().min(1, "Muito curto").max(255, "Muito longo"),
    tipo: zod_1.default.enum(Sensor_1.SensorType),
});
exports.updateSensorSchema = exports.createSensorSchema.partial();
