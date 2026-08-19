import z from "zod";
import { CropCulture, CropStatus } from "../models/Crop";
import { AreaUnit } from "../utils/area-converter";

export const createCropSchema = z.object({
  nome: z.string().min(3, "Nome é obrigatório").max(100, "Nome é muito longo"),
  cultura: z.enum(CropCulture),
  variedade: z
    .string()
    .min(3, "Variedade é muito curta")
    .max(100, "Variedade é muito longa")
    .nullable()
    .optional(),
  area: z.coerce
    .number("A área deve ser um número")
    .positive("A área não pode ser um número negativo"),
  unidadeArea: z.enum(AreaUnit, "Unidade de área inválida"),
  dataPlantio: z.coerce.date().nullable().optional(),
  colheitaPrevista: z.coerce.date().nullable().optional(),
  responsavel: z
    .string()
    .min(3, "Nome do responsável é muito curto")
    .max(100, "Nome do responsável é muito longo")
    .nullable()
    .optional(),
  status: z.enum(CropStatus),
  observacoes: z.string().nullable().optional(),
});
export const updateCropSchema = z
  .object({
    nome: z.string().min(3, "Nome é muito curto").max(100, "Nome é muito longo").optional(),
    cultura: z.enum(CropCulture).optional(),
    variedade: z
      .string()
      .min(3, "Variedade é muito curta")
      .max(100, "Variedade é muita longa")
      .nullable()
      .optional(),
    area: z.coerce
      .number("A área deve ser um número")
      .positive("A área não pode ser um número negativo")
      .optional(),
    unidadeArea: z.enum(AreaUnit, "Unidade de área inválida").optional(),
    dataPlantio: z.coerce.date().nullable().optional(),
    colheitaPrevista: z.coerce.date().nullable().optional(),
    responsavel: z
      .string()
      .min(1, "Nome do responsável é muito curto")
      .max(100, "Nome é muito longo")
      .nullable()
      .optional(),
    status: z.enum(CropStatus).optional(),
    observacoes: z.string().nullable().optional(),
  })
  .refine((data) => (data.area === undefined) === (data.unidadeArea === undefined), {
    error: "a área e unidade dela devem ser informadas juntas",
  });
export type CreateCropDTO = z.infer<typeof createCropSchema>;
export type UpdateCropDTO = z.infer<typeof updateCropSchema>;