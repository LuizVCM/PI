import z from "zod";
export const createSensorDataSchema = z.object({
  configuracoes: z.record(z.string(), z.any()),
});
export type CreateSensorDataDTO = z.infer<typeof createSensorDataSchema>;