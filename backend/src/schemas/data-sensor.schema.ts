import z from "zod";
export const createDataSensor = z.object({
  nomeInsumo: z.string(),
  quantidade: z.number(),
  unidade: z.string(),
  dataValidade: z.date(),
});
export type CreateDataSensorDTO = z.infer<typeof createDataSensor>;