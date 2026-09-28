"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStockSchema = exports.createStockSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const Stock_1 = require("../models/Stock");
exports.createStockSchema = zod_1.default.object({
    nome: zod_1.default
        .string()
        .trim()
        .min(1, "No mínimo 1 caracter")
        .max(100, "No máximo 100 caracteres"),
    categoria: zod_1.default.enum(Stock_1.StockCategory, "Tipo de categoria inválido"),
    quantidade: zod_1.default.coerce
        .number("A quantidade deve ser um número")
        .nonnegative("A quantidade deve ser positiva"),
    unidade: zod_1.default.enum(Stock_1.StockUnit, "Tipo de unidade inválido"),
    dataValidade: zod_1.default
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Data deve estar no formato YYYY-MM-DD")
        .nullable()
        .optional(),
    limiteMinimo: zod_1.default.number().positive().nullable().optional(),
});
exports.updateStockSchema = exports.createStockSchema.partial();
