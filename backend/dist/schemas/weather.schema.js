"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWeatherSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createWeatherSchema = zod_1.default.object({
    daily: zod_1.default.object({
        time: zod_1.default.array(zod_1.default.string()).min(1),
        temperature_2m_max: zod_1.default.array(zod_1.default.number()).min(1),
        temperature_2m_min: zod_1.default.array(zod_1.default.number()).min(1),
        precipitation_sum: zod_1.default.array(zod_1.default.number()).min(1),
        wind_speed_10m_max: zod_1.default.array(zod_1.default.number()).min(1),
        et0_fao_evapotranspiration: zod_1.default.array(zod_1.default.number()).min(1),
    }),
});
