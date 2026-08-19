import z from "zod";
import { FinanceType } from "../models/Finance";
export const createFinanceSchema = z.object({
  tipo: z.enum(FinanceType, "Tipo de finança inválido"),
  valor: z.coerce.number("O valor deve ser um número").positive("O valor deve ser positivo"),
  observacoes: z.string().nullable().optional(),
  detalhes: z.string().nullable().optional(),
  data: z.coerce.date(),
});
export const updateFinanceSchema = createFinanceSchema.partial();
export type CreateFinanceDTO = z.infer<typeof createFinanceSchema>;
export type UpdateFinanceDTO = z.infer<typeof updateFinanceSchema>;