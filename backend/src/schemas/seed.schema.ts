import z from "zod";
import { WeightUnit } from "../models/Seed";
export const createSeedSchema = z.object({
  plantaId: z.coerce.number("ID inválido").positive("ID inválido"),
  dataCompra: z.coerce.date("Formato inválido"),
  dataValidade: z.coerce.date("Formato inválido"),
  quantidade: z.coerce.number("Quantidade deve ser um número"),
  unidadePeso: z.enum(WeightUnit, "Tipo de unidade de peso inválido"),
  fornecedor: z
    .string()
    .min(1, "Nome do forncedor é muito curto")
    .max(100, "Nome do forncedor é muito longo")
    .optional()
    .nullable(),
  observacoes: z.string().max(255, "Observações muito longas").optional().nullable(),
});
export const updateSeedSchema = createSeedSchema;
export type CreateSeedDTO = z.infer<typeof createSeedSchema>;
export type UpdateSeedDTO = z.infer<typeof updateSeedSchema>;