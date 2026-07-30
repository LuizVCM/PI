import z from "zod";
export const createFinanceSchema = z.object({
  valor: z.number(),
  tipo: z.enum(["ganho", "gasto"]),
  quantidade: z.number(),
  descricao: z.string(),
  data: z.date(),
});
export const updateFinanceSchema = createFinanceSchema.partial();
export type CreateFinanceDTO = z.infer<typeof createFinanceSchema>;
export type UpdateFinanceDTO = z.infer<typeof updateFinanceSchema>;