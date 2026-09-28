"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTerritorySchema = exports.createTerritorySchema = void 0;
const zod_1 = __importDefault(require("zod"));
const area_converter_1 = require("../calc/area-converter");
exports.createTerritorySchema = zod_1.default.object({
    cep: zod_1.default
        .string()
        .transform((value) => value.replace(/\D/g, ""))
        .refine((value) => /^\d{8}$/.test(value), {
        error: "CEP inválido",
    }),
    area: zod_1.default.coerce
        .number("A área deve ser um número")
        .positive("A área não pode ser um número negativo"),
    unidadeArea: zod_1.default.enum(area_converter_1.AreaUnit, "Unidade de área inválida"),
});
exports.updateTerritorySchema = zod_1.default
    .object({
    cep: zod_1.default
        .string()
        .transform((value) => value.replace(/\D/g, ""))
        .refine((value) => /^\d{8}$/.test(value), {
        error: "CEP inválido",
    })
        .optional(),
    area: zod_1.default
        .number("A área deve ser um número")
        .positive("A área não pode ser um número negativo")
        .optional(),
    unidadeArea: zod_1.default.enum(area_converter_1.AreaUnit, "Unidade de área inválida").optional(),
})
    .refine((data) => (data.area === undefined) === (data.unidadeArea === undefined), {
    error: "a área e unidade dela devem ser informadas juntas",
});
