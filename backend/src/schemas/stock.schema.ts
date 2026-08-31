import z from "zod";
import { MeasurementUnit } from "../models/Stock";
export const createStockSchema = z.object({
  nome: z.string().trim().min(1, "No mínimo 1 caracter").max(100, "No máximo 100 caracteres"),
  quantidade: z.coerce.number("A quantidade deve ser um número").positive("A quantidade deve ser positiva"),
  unidade: z.enum(MeasurementUnit, "Tipo de unidade inválido"),
  dataValidade: z.coerce.date("Formato de data inválido"),
});
export const updateStockSchema = createStockSchema.partial();
export type CreateStockDTO = z.infer<typeof createStockSchema>;
export type UpdateStockDTO = z.infer<typeof updateStockSchema>;