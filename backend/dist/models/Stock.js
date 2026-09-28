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
exports.Stock = exports.StockCategory = exports.StockUnit = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const BaseModel_1 = require("./BaseModel");
var StockUnit;
(function (StockUnit) {
    // massa
    StockUnit["G"] = "g";
    StockUnit["KG"] = "kg";
    StockUnit["TON"] = "ton";
    // volume
    StockUnit["ML"] = "ml";
    StockUnit["L"] = "l";
    // contagem/comercial
    StockUnit["SACAS"] = "sacas";
    StockUnit["UNIDADE"] = "un";
})(StockUnit || (exports.StockUnit = StockUnit = {}));
var StockCategory;
(function (StockCategory) {
    StockCategory["FERTILIZANTES"] = "fertilizantes";
    StockCategory["DEFENSIVOS"] = "defensivos";
    StockCategory["FERRAMENTAS"] = "ferramentas";
})(StockCategory || (exports.StockCategory = StockCategory = {}));
let Stock = class Stock extends BaseModel_1.BaseModel {
    nome;
    categoria;
    quantidade;
    unidade;
    dataValidade;
    limiteMinimo;
    usuario;
};
exports.Stock = Stock;
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Stock.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: StockCategory, nullable: false }),
    __metadata("design:type", String)
], Stock.prototype, "categoria", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", scale: 2, precision: 5, nullable: false }),
    __metadata("design:type", Number)
], Stock.prototype, "quantidade", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: StockUnit, nullable: false }),
    __metadata("design:type", String)
], Stock.prototype, "unidade", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date", nullable: true }),
    __metadata("design:type", Object)
], Stock.prototype, "dataValidade", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", scale: 2, precision: 5, nullable: true }),
    __metadata("design:type", Object)
], Stock.prototype, "limiteMinimo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (usuario) => usuario.insumos),
    __metadata("design:type", User_1.User)
], Stock.prototype, "usuario", void 0);
exports.Stock = Stock = __decorate([
    (0, typeorm_1.Entity)("estoque_insumos")
], Stock);
