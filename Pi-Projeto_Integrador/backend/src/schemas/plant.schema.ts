import z from "zod";
export const createPlantSchema = z.object({
  nome: z.string(),
  dataGerminacao: z.date(),
  iluminacao: z.number(),
  regiao: z.string(),
  enxofre: z.number(),
  nitrogenio: z.number(),
  potassio: z.number(),
});
export const updatePlantSchema = createPlantSchema.partial();
export type CreatePlantDTO = z.infer<typeof createPlantSchema>;
export type UpdatePlantDTO = z.infer<typeof updatePlantSchema>;