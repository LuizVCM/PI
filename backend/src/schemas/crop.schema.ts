import z from "zod";
import { AreaUnit } from "../utils/area-converter";
export const createCropSchema = z.object({
  cep: z
    .string()
    .transform((value) => value.replace(/\D/g, ""))
    .refine((value) => /^\d{8}$/.test(value), {
      message: "CEP inválido",
    }),
  tamanho: z.coerce.number().positive(),
  unidade: z.enum(AreaUnit),
});
export const updateCropSchema = createCropSchema.partial();
export type CreateCropDTO = z.infer<typeof createCropSchema>;
export type UpdateCropDTO = z.infer<typeof updateCropSchema>;