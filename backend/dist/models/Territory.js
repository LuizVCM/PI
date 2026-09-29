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
exports.Territory = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Weather_1 = require("./Weather");
const Sensor_1 = require("./Sensor");
const BaseModel_1 = require("./BaseModel");
const area_converter_1 = require("../calc/area-converter");
const Crop_1 = require("./Crop");
let Territory = class Territory extends BaseModel_1.BaseModel {
    cep;
    cidade;
    estado;
    bairro;
    logradouro;
    areaM2;
    unidadeArea;
    plantacoes;
    usuario;
    clima;
    sensores;
};
exports.Territory = Territory;
__decorate([
    (0, typeorm_1.Column)({ type: "char", length: 8 }),
    __metadata("design:type", String)
], Territory.prototype, "cep", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 100,
    }),
    __metadata("design:type", String)
], Territory.prototype, "cidade", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 100,
    }),
    __metadata("design:type", String)
], Territory.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 150,
        nullable: true,
    }),
    __metadata("design:type", Object)
], Territory.prototype, "bairro", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 150,
        nullable: true,
    }),
    __metadata("design:type", Object)
], Territory.prototype, "logradouro", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", {
        precision: 12,
        scale: 2,
    }),
    __metadata("design:type", Number)
], Territory.prototype, "areaM2", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: area_converter_1.AreaUnit,
    }),
    __metadata("design:type", String)
], Territory.prototype, "unidadeArea", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Crop_1.Crop, (plantacao) => plantacao.territorio),
    __metadata("design:type", Array)
], Territory.prototype, "plantacoes", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (usuario) => usuario.territorios),
    __metadata("design:type", User_1.User)
], Territory.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Weather_1.Weather, (clima) => clima.territorio),
    __metadata("design:type", Array)
], Territory.prototype, "clima", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Sensor_1.Sensor, (sensor) => sensor.territorio),
    __metadata("design:type", Array)
], Territory.prototype, "sensores", void 0);
exports.Territory = Territory = __decorate([
    (0, typeorm_1.Entity)("territorios")
], Territory);
