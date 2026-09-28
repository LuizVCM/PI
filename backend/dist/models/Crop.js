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
exports.Crop = exports.CropStatus = void 0;
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("./BaseModel");
const Territory_1 = require("./Territory");
const area_converter_1 = require("../calc/area-converter");
const Seed_1 = require("./Seed");
var CropStatus;
(function (CropStatus) {
    CropStatus["PLANEJADA"] = "planejada";
    CropStatus["EM_ANDAMENTO"] = "em_andamento";
    CropStatus["CONCLUIDA"] = "concluida";
    CropStatus["CANCELADA"] = "cancelada";
})(CropStatus || (exports.CropStatus = CropStatus = {}));
let Crop = class Crop extends BaseModel_1.BaseModel {
    nome;
    variedade;
    areaM2;
    unidadeArea;
    dataPlantio;
    dataColheitaReal;
    dataColheitaPrevista;
    responsavel;
    status;
    observacoes;
    territorio;
    sementes;
};
exports.Crop = Crop;
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Crop.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100, nullable: true }),
    __metadata("design:type", Object)
], Crop.prototype, "variedade", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", {
        precision: 12,
        scale: 2,
    }),
    __metadata("design:type", Number)
], Crop.prototype, "areaM2", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: area_converter_1.AreaUnit,
    }),
    __metadata("design:type", String)
], Crop.prototype, "unidadeArea", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: "date", nullable: true }),
    __metadata("design:type", Object)
], Crop.prototype, "dataPlantio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date", nullable: true }),
    __metadata("design:type", Object)
], Crop.prototype, "dataColheitaReal", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date", nullable: true }),
    __metadata("design:type", Object)
], Crop.prototype, "dataColheitaPrevista", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100, nullable: true }),
    __metadata("design:type", Object)
], Crop.prototype, "responsavel", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({
        type: "enum",
        enum: CropStatus,
        default: CropStatus.PLANEJADA,
    }),
    __metadata("design:type", String)
], Crop.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", Object)
], Crop.prototype, "observacoes", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Territory_1.Territory, (territorio) => territorio.plantacoes),
    __metadata("design:type", Territory_1.Territory)
], Crop.prototype, "territorio", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)(),
    (0, typeorm_1.OneToOne)(() => Seed_1.Seed, (sementes) => sementes.plantacao, { nullable: true }),
    __metadata("design:type", Object)
], Crop.prototype, "sementes", void 0);
exports.Crop = Crop = __decorate([
    (0, typeorm_1.Index)(["status", "dataPlantio"]),
    (0, typeorm_1.Entity)("plantacoes")
], Crop);
