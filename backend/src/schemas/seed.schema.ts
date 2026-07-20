import z from "zod";
export const createSeedSchema = z.object({
  dataCompra: z.date(),
  nomePlanta: z.string(),
  dataPlantio: z.date(),
  quantidade: z.number(),
});
export const updateSeedSchema = createSeedSchema;
export type CreateSeedDTO = z.infer<typeof createSeedSchema>;
export type UpdateSeedDTO = z.infer<typeof updateSeedSchema>;