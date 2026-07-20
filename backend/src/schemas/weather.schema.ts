import z from "zod";
export const createWeatherSchema = z.object({
  data: z.date(),
  chuva: z.number(),
  temperatura: z.number(),
  vento: z.number(),
  umidade: z.number(),
});
export const updateWeatherSchema = createWeatherSchema.partial();
export type CreateWeatherDTO = z.infer<typeof createWeatherSchema>
export type UpdateWeatherDTO = z.infer<typeof updateWeatherSchema>