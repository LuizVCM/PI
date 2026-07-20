import z from "zod";
export const createCropSchema = z.object({
  cep: z.string(),
  tamanho: z.number(),
});
export const updateCropSchema = createCropSchema.partial();
export type CreateCropDTO = z.infer<typeof createCropSchema>;
export type UpdateCropDTO = z.infer<typeof updateCropSchema>;