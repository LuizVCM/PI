import z from "zod";
import { AreaUnit } from "../utils/area-converter";
export const createTerritorySchema = z.object({
  cep: z
    .string()
    .transform((value) => value.replace(/\D/g, ""))
    .refine((value) => /^\d{8}$/.test(value), {
      message: "CEP inválido",
    }),
  area: z.coerce.number().positive(),
  unidadeArea: z.enum(AreaUnit),
});
const updateTerritorySchema = z
  .object({
    cep: z.string().optional(),
    area: z.number().positive().optional(),
    unidadeArea: z.enum(AreaUnit).optional(),
  })
  .refine(
    (data) =>
      (data.unidadeArea === undefined && data.unidadeArea === undefined),
    {
      error: "tamanho e unidade devem ser informados juntos",
    }
  );
export type CreateTerritoryDTO = z.infer<typeof createTerritorySchema>;
export type UpdateTerritoryDTO = z.infer<typeof updateTerritorySchema>;