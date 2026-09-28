"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCropSchema = exports.createCropSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const Crop_1 = require("../models/Crop");
const area_converter_1 = require("../calc/area-converter");
exports.createCropSchema = zod_1.default.object({
    nome: zod_1.default.string().min(1, "Nome é obrigatório").max(100, "Nome é muito longo"),
    sementeId: zod_1.default.coerce.number("ID inválido").positive("ID inválido"),
    variedade: zod_1.default
        .string()
        .max(100, "Variedade é muito longa")
        .nullable()
        .optional(),
    area: zod_1.default.coerce
        .number("A área deve ser um número")
        .positive("A área não pode ser um número negativo"),
    unidadeArea: zod_1.default.enum(area_converter_1.AreaUnit, "Unidade de área inválida"),
    dataPlantio: zod_1.default
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Data deve estar no formato YYYY-MM-DD"),
    responsavel: zod_1.default
        .string()
        .max(100, "Nome do responsável é muito longo")
        .nullable()
        .optional(),
    status: zod_1.default
        .enum(Crop_1.CropStatus, "Tipo de status inválido")
        .default(Crop_1.CropStatus.PLANEJADA),
    observacoes: zod_1.default.string().nullable().optional(),
});
exports.updateCropSchema = zod_1.default
    .object({
    nome: zod_1.default
        .string()
        .min(3, "Nome é muito curto")
        .max(100, "Nome é muito longo")
        .optional(),
    sementeId: zod_1.default.coerce
        .number("ID inválido")
        .positive("ID inválido")
        .nullable()
        .optional(),
    variedade: zod_1.default
        .string()
        .max(100, "Variedade é muita longa")
        .nullable()
        .optional(),
    area: zod_1.default.coerce
        .number("A área deve ser um número")
        .positive("A área não pode ser um número negativo")
        .optional(),
    unidadeArea: zod_1.default.enum(area_converter_1.AreaUnit, "Unidade de área inválida").optional(),
    dataPlantio: zod_1.default
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Data deve estar no formato YYYY-MM-DD")
        .nullable()
        .optional(),
    dataColheitaReal: zod_1.default
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Data deve estar no formato YYYY-MM-DD")
        .nullable()
        .optional(),
    responsavel: zod_1.default
        .string()
        .max(100, "Nome é muito longo")
        .nullable()
        .optional(),
    status: zod_1.default.enum(Crop_1.CropStatus, "Tipo de status inválido").optional(),
    observacoes: zod_1.default
        .string()
        .max(255, "Observações muito longas")
        .nullable()
        .optional(),
})
    .refine((data) => (data.area === undefined) === (data.unidadeArea === undefined), {
    error: "a área e unidade dela devem ser informadas juntas",
});
