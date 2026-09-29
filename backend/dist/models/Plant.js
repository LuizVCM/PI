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
exports.Plant = exports.PlantCategory = exports.NpkUnit = void 0;
const typeorm_1 = require("typeorm");
const Seed_1 = require("./Seed");
const BaseModel_1 = require("./BaseModel");
var NpkUnit;
(function (NpkUnit) {
    NpkUnit["MG_KG"] = "mg/kg";
    NpkUnit["PPM"] = "ppm";
    NpkUnit["PERCENT"] = "%";
})(NpkUnit || (exports.NpkUnit = NpkUnit = {}));
var PlantCategory;
(function (PlantCategory) {
    PlantCategory["CEREAIS"] = "cereais";
    PlantCategory["LEGUMINOSAS"] = "leguminosas";
    PlantCategory["TUBERCULOS"] = "tub\u00E9rculos";
    PlantCategory["HORTALICAS"] = "hortali\u00E7as";
    PlantCategory["FRUTAS"] = "frutas";
    PlantCategory["OLEAGINOSAS"] = "oleaginosas";
    PlantCategory["FIBRAS"] = "fibras";
    PlantCategory["FORRAGEIRAS"] = "forrageiras";
    PlantCategory["ESTIMULANTES"] = "estimulantes";
    PlantCategory["ADOCANTES"] = "ado\u00E7antes";
    PlantCategory["INDUSTRIAIS"] = "industriais";
})(PlantCategory || (exports.PlantCategory = PlantCategory = {}));
;
let Plant = class Plant extends BaseModel_1.BaseModel {
    nome;
    nomeCientifico;
    categoria;
    cicloMinimoDias;
    cicloMaximoDias;
    phMinimo;
    phMaximo;
    // em celsius
    temperaturaMinima;
    // em celsius
    temperaturaMaxima;
    // precipitação anual em milímetros (mm)
    precipitacaoMinima;
    // precipitação anual em milímetros (mm)
    precipitacaoMaxima;
    necessidadeLuz;
    necessidadeAgua;
    texturaSolo;
    /** coeficiente médio de cultura  */
    kcMedio;
    nitrogenio;
    fosforo;
    potassio;
    unidadeNpk;
    sementes;
    /** retorna o ciclo médio em dias, arredondado. se algum dos valores for nulo, retorna null
     */
    getCicloMedioDias() {
        if (this.cicloMinimoDias == null || this.cicloMaximoDias == null) {
            return null;
        }
        return Math.round((this.cicloMinimoDias + this.cicloMaximoDias) / 2);
    }
};
exports.Plant = Plant;
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: false }),
    __metadata("design:type", String)
], Plant.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 150, nullable: false, unique: true }),
    __metadata("design:type", String)
], Plant.prototype, "nomeCientifico", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: PlantCategory, nullable: true }),
    __metadata("design:type", Object)
], Plant.prototype, "categoria", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", nullable: false }),
    __metadata("design:type", Number)
], Plant.prototype, "cicloMinimoDias", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", nullable: false }),
    __metadata("design:type", Number)
], Plant.prototype, "cicloMaximoDias", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 4, scale: 2, nullable: true }),
    __metadata("design:type", Object)
], Plant.prototype, "phMinimo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 4, scale: 2, nullable: true }),
    __metadata("design:type", Object)
], Plant.prototype, "phMaximo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 5, scale: 2, nullable: true })
    // em celsius
    ,
    __metadata("design:type", Object)
], Plant.prototype, "temperaturaMinima", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 5, scale: 2, nullable: true })
    // em celsius
    ,
    __metadata("design:type", Object)
], Plant.prototype, "temperaturaMaxima", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 6, scale: 2, nullable: true })
    // precipitação anual em milímetros (mm)
    ,
    __metadata("design:type", Object)
], Plant.prototype, "precipitacaoMinima", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 6, scale: 2, nullable: true })
    // precipitação anual em milímetros (mm)
    ,
    __metadata("design:type", Object)
], Plant.prototype, "precipitacaoMaxima", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50, nullable: true }),
    __metadata("design:type", Object)
], Plant.prototype, "necessidadeLuz", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50, nullable: true }),
    __metadata("design:type", Object)
], Plant.prototype, "necessidadeAgua", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100, nullable: true }),
    __metadata("design:type", Object)
], Plant.prototype, "texturaSolo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 6, scale: 4, nullable: true }),
    __metadata("design:type", Object)
], Plant.prototype, "kcMedio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 8, scale: 2, nullable: true }),
    __metadata("design:type", Object)
], Plant.prototype, "nitrogenio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 8, scale: 2, nullable: true }),
    __metadata("design:type", Object)
], Plant.prototype, "fosforo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 8, scale: 2, nullable: true }),
    __metadata("design:type", Object)
], Plant.prototype, "potassio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: NpkUnit, nullable: true }),
    __metadata("design:type", Object)
], Plant.prototype, "unidadeNpk", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Seed_1.Seed, (sementes) => sementes.planta),
    __metadata("design:type", Array)
], Plant.prototype, "sementes", void 0);
exports.Plant = Plant = __decorate([
    (0, typeorm_1.Entity)("plantas")
], Plant);
