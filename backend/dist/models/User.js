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
exports.User = exports.UserRole = void 0;
const typeorm_1 = require("typeorm");
const Seed_1 = require("./Seed");
const Territory_1 = require("./Territory");
const Finance_1 = require("./Finance");
const Stock_1 = require("./Stock");
const BaseModel_1 = require("./BaseModel");
var UserRole;
(function (UserRole) {
    UserRole["USER"] = "user";
    UserRole["ADMIN"] = "admin";
})(UserRole || (exports.UserRole = UserRole = {}));
let User = class User extends BaseModel_1.BaseModel {
    role;
    nome;
    sobrenome;
    email;
    telefone;
    cpf;
    senha;
    sementes;
    territorios;
    financas;
    insumos;
};
exports.User = User;
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: UserRole,
        default: UserRole.USER,
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100, nullable: false }),
    __metadata("design:type", String)
], User.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100, nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "sobrenome", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: false, unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20, type: "varchar", nullable: true, unique: true }),
    __metadata("design:type", Object)
], User.prototype, "telefone", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 11, type: "char", nullable: true, unique: true }),
    __metadata("design:type", Object)
], User.prototype, "cpf", void 0);
__decorate([
    (0, typeorm_1.Column)({ select: false }),
    __metadata("design:type", String)
], User.prototype, "senha", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Seed_1.Seed, (semente) => semente.usuario),
    __metadata("design:type", Array)
], User.prototype, "sementes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Territory_1.Territory, (territorio) => territorio.usuario),
    __metadata("design:type", Array)
], User.prototype, "territorios", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Finance_1.Finance, (financas) => financas.usuario),
    __metadata("design:type", Array)
], User.prototype, "financas", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Stock_1.Stock, (insumos) => insumos.usuario),
    __metadata("design:type", Array)
], User.prototype, "insumos", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)("usuarios")
], User);
