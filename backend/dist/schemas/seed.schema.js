"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSeedSchema = exports.createSeedSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const Seed_1 = require("../models/Seed");
const seedFields = {
    plantaId: zod_1.default.coerce.number("ID inválido").positive("ID inválido"),
    dataCompra: zod_1.default
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Data deve estar no formato YYYY-MM-DD"),
    dataValidade: zod_1.default
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Data deve estar no formato YYYY-MM-DD"),
    quantidade: zod_1.default.coerce
        .number("Quantidade deve ser um número")
        .positive("Quantidade deve ser maior que zero"),
    unidadePeso: zod_1.default.enum(Seed_1.WeightUnit, "Tipo de unidade de peso inválido"),
    fornecedor: zod_1.default
        .string()
        .trim()
        .max(100, "Nome do fornecedor é muito longo")
        .optional()
        .nullable(),
    observacoes: zod_1.default
        .string()
        .trim()
        .max(255, "Observações muito longas")
        .optional()
        .nullable(),
};
exports.createSeedSchema = zod_1.default
    .object(seedFields)
    .refine((data) => data.dataValidade > data.dataCompra, {
    message: "A data de validade deve ser posterior à data de compra",
    path: ["dataValidade"],
});
exports.updateSeedSchema = zod_1.default.object(seedFields).partial();
