import z from "zod";
export const createDataSensor = z.object({
  valor: z.number(),
});
export type CreateDataSensorDTO = z.infer<typeof createDataSensor>;