"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Weather = void 0;
const typeorm_1 = require("typeorm");
const Territory_1 = require("./Territory");
const BaseModel_1 = require("./BaseModel");
let Weather = class Weather extends BaseModel_1.BaseModel {
    data;
    temperaturaMinima;
    temperaturaMaxima;
    precipitacao;
    velocidadeVentoMaxima;
    evapotranspiracao;
    territorio;
};
exports.Weather = Weather;
__decorate([
    (0, typeorm_1.Column)({ type: "date" }),
    __metadata("design:type", String)
], Weather.prototype, "data", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 5, scale: 2 }),
    __metadata("design:type", Number)
], Weather.prototype, "temperaturaMinima", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 5, scale: 2 }),
    __metadata("design:type", Number)
], Weather.prototype, "temperaturaMaxima", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 5, scale: 2 }),
    __metadata("design:type", Number)
], Weather.prototype, "precipitacao", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 5, scale: 2 }),
    __metadata("design:type", Number)
], Weather.prototype, "velocidadeVentoMaxima", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 5, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Weather.prototype, "evapotranspiracao", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Territory_1.Territory, territorio => territorio.clima),
    __metadata("design:type", Territory_1.Territory)
], Weather.prototype, "territorio", void 0);
exports.Weather = Weather = __decorate([
    (0, typeorm_1.Index)(["territorio", "data"], { unique: true }),
    (0, typeorm_1.Entity)("dados_clima")
], Weather);
