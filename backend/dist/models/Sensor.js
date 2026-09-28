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
exports.Sensor = exports.SensorType = void 0;
const typeorm_1 = require("typeorm");
const DataSensor_1 = require("./DataSensor");
const Territory_1 = require("./Territory");
const BaseModel_1 = require("./BaseModel");
var SensorType;
(function (SensorType) {
    SensorType["UMIDADE_AR"] = "umidade do ar";
    SensorType["TEMPERATURA_AR"] = "temperatura do ar";
    SensorType["UMIDADE_SOLO"] = "umidade do solo";
    SensorType["TEMPERATURA_SOLO"] = "temperatura do solo";
    SensorType["PRESSAO"] = "press\u00E3o";
})(SensorType || (exports.SensorType = SensorType = {}));
let Sensor = class Sensor extends BaseModel_1.BaseModel {
    modelo;
    tipo;
    territorio;
    dados;
    getUnidade() {
        switch (this.tipo) {
            case SensorType.UMIDADE_AR:
                return "%";
            case SensorType.TEMPERATURA_AR:
                return "°C";
            case SensorType.UMIDADE_SOLO:
                return "%";
            case SensorType.TEMPERATURA_SOLO:
                return "°C";
            case SensorType.PRESSAO:
                return "hPa"; // ver qual unidade vai ser, outras comuns: "mmHg" e "atm"
        }
    }
};
exports.Sensor = Sensor;
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: false }),
    __metadata("design:type", String)
], Sensor.prototype, "modelo", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: SensorType,
        nullable: false,
    }),
    __metadata("design:type", String)
], Sensor.prototype, "tipo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Territory_1.Territory, (territorio) => territorio.sensores),
    __metadata("design:type", Territory_1.Territory)
], Sensor.prototype, "territorio", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => DataSensor_1.DataSensor, (data) => data.sensor),
    __metadata("design:type", Array)
], Sensor.prototype, "dados", void 0);
exports.Sensor = Sensor = __decorate([
    (0, typeorm_1.Entity)("sensores")
], Sensor);
