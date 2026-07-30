import z from "zod";
export const createSensorSchema = z.object({
  tipo: z.enum(["umidade", "temperatura", "vento"]),
});
export type CreateSensorDTO = z.infer<typeof createSensorSchema>;