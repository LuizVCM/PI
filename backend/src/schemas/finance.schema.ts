import z from "zod";
const financeSchema = z.object({
    valor: z.number(),
    tipo: z.enum(["Ganho", "Gasto"]),
    quantidade: z.number(),
    descricao: z.string(),
    data: z.date()
});
export const CreateFinanceDTO = financeSchema;