"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFinanceSchema = exports.createFinanceSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const Finance_1 = require("../models/Finance");
exports.createFinanceSchema = zod_1.default.object({
    tipo: zod_1.default.enum(Finance_1.FinanceType, "Tipo de finança inválido"),
    valor: zod_1.default.coerce
        .number("O valor deve ser um número")
        .positive("O valor deve ser positivo").max(999999.99, "Apenas valores abaixo de 1 milhão"),
    observacoes: zod_1.default
        .string()
        .trim()
        .min(1, "No mínimo 1 caracter")
        .max(255, "No máximo 255 caracteres")
        .nullable()
        .optional(),
    detalhes: zod_1.default
        .string()
        .trim()
        .min(1, "No mínimo 1 caracter")
        .max(255, "No máximo 255 caracteres")
        .nullable()
        .optional(),
    data: zod_1.default
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Data deve estar no formato YYYY-MM-DD"),
});
exports.updateFinanceSchema = exports.createFinanceSchema.partial();
