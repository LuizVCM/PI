import z from "zod";
export const createSensorSchema = z.object({
  funcao: z.string()
});
