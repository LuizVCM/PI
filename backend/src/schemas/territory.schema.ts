import z from "zod";
import { AreaUnit } from "../utils/area-converter";
export const createTerritorySchema = z.object({
  cep: z
    .string()
    .transform((value) => value.replace(/\D/g, ""))
    .refine((value) => /^\d{8}$/.test(value), {
      message: "CEP inválido",
    }),
  tamanho: z.coerce.number().positive(),
  unidade: z.enum(AreaUnit),
});
export const updateTerritorySchema = createTerritorySchema.partial();
export type CreateTerritoryDTO = z.infer<typeof createTerritorySchema>;
export type UpdateTerritoryDTO = z.infer<typeof updateTerritorySchema>;