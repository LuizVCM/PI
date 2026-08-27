import z from "zod";
import { FinanceType } from "../models/Finance";
export const createFinanceSchema = z.object({
  tipo: z.enum(FinanceType, "Tipo de finança inválido"),
  valor: z.coerce.number("O valor deve ser um número").positive("O valor deve ser positivo"),
  observacoes: z.string().trim().min(1, "No mínimo 1 caracter").max(255, "No máximo 255 caracteres").nullable().optional(),
  detalhes: z.string().trim().min(1, "No mínimo 1 caracter").max(255, "No máximo 255 caracteres").nullable().optional(),
  dataFinanca: z.coerce.date("Formato de data inválido"),
});
export const updateFinanceSchema = createFinanceSchema.partial();
export type CreateFinanceDTO = z.infer<typeof createFinanceSchema>;
export type UpdateFinanceDTO = z.infer<typeof updateFinanceSchema>;