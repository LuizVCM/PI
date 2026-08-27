import z from "zod";

export const createStockSchema = z.object({
  nomeInsumo: z.string(),
  quantidade: z.number(),
  unidade: z.enum(["litros", "quilogramas"]),
  dataValidade: z.date(),
});
export const updateStockSchema = createStockSchema.partial();
export type CreateStockDTO = z.infer<typeof createStockSchema>;
export type UpdateStockDTO = z.infer<typeof updateStockSchema>;