import z from "zod";
export const createUserSchema = z.object({
  nome: z.string().min(3).max(100),
  sobrenome: z.string().min(3).max(100),
  email: z.email(),
  telefone: z.number(),
  senha: z.string(),
  cpf: z.string(),
});
export const updateUserSchema = createUserSchema.partial();
export type CreateUserDTO = z.infer<typeof createUserSchema>;
export type UpdateUserDTO = z.infer<typeof updateUserSchema>;