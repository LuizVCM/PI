"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_routes_1 = __importDefault(require("./user.routes"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
const territory_routes_1 = __importDefault(require("./territory.routes"));
const crop_routes_1 = __importDefault(require("./crop.routes"));
const finance_routes_1 = __importDefault(require("./finance.routes"));
const stock_routes_1 = __importDefault(require("./stock.routes"));
const plant_routes_1 = __importDefault(require("./plant.routes"));
const seed_routes_1 = __importDefault(require("./seed.routes"));
const sensor_routes_1 = __importDefault(require("./sensor.routes"));
const weather_routes_1 = __importDefault(require("./weather.routes"));
const router = (0, express_1.Router)();
router.use("/auth", auth_routes_1.default); // login, logout e checar senha
router.use("/users", user_routes_1.default);
router.use("/territories", territory_routes_1.default);
router.use("/plants", plant_routes_1.default);
router.use("/seeds", seed_routes_1.default);
router.use("/crops", crop_routes_1.default);
router.use("/finances", finance_routes_1.default);
router.use("/stocks", stock_routes_1.default);
router.use("/sensor", sensor_routes_1.default);
router.use("/weather", weather_routes_1.default);
exports.default = router;
