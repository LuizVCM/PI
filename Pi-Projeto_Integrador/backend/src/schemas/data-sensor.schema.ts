import z from "zod";
export const createDataSensor = z.object({
  valor: z.number(),
  unidade: z.enum(["porcento", "celsius", "kmh"])
});
export type CreateDataSensorDTO = z.infer<typeof createDataSensor>;