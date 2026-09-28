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
exports.Seed = exports.WeightUnit = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const BaseModel_1 = require("./BaseModel");
const Plant_1 = require("./Plant");
const Crop_1 = require("./Crop");
var WeightUnit;
(function (WeightUnit) {
    WeightUnit["KG"] = "kg";
    WeightUnit["SACAS"] = "sacas";
    WeightUnit["TON"] = "ton";
    WeightUnit["LITROS"] = "litros";
})(WeightUnit || (exports.WeightUnit = WeightUnit = {}));
let Seed = class Seed extends BaseModel_1.BaseModel {
    dataCompra;
    dataValidade;
    quantidade;
    unidadePeso;
    fornecedor;
    observacoes;
    plantacao;
    usuario;
    planta;
};
exports.Seed = Seed;
__decorate([
    (0, typeorm_1.Column)({ type: "date", nullable: false }),
    __metadata("design:type", Date)
], Seed.prototype, "dataCompra", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date", nullable: true }),
    __metadata("design:type", Object)
], Seed.prototype, "dataValidade", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", nullable: false }),
    __metadata("design:type", Number)
], Seed.prototype, "quantidade", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: WeightUnit, nullable: false }),
    __metadata("design:type", String)
], Seed.prototype, "unidadePeso", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100, nullable: true }),
    __metadata("design:type", Object)
], Seed.prototype, "fornecedor", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", Object)
], Seed.prototype, "observacoes", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Crop_1.Crop, (plantacao) => plantacao.sementes, { nullable: true }),
    __metadata("design:type", Object)
], Seed.prototype, "plantacao", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (usuario) => usuario.sementes),
    __metadata("design:type", User_1.User)
], Seed.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Plant_1.Plant, (planta) => planta.sementes),
    __metadata("design:type", Plant_1.Plant)
], Seed.prototype, "planta", void 0);
exports.Seed = Seed = __decorate([
    (0, typeorm_1.Entity)("sementes")
], Seed);
