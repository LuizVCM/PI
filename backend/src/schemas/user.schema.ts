import z from "zod";
export const createUserSchema = z.object({
  nome: z.string().min(3).max(100),
  sobrenome: z.string().min(3).max(100),
  email: z.email(),
  telefone: z.e164(),
  cpf: z.string(),
  senha: z
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .regex(/^(?=.*[A-Z])/, "A senha deve ter pelo menos uma letra maiúscula")
    .regex(/^(?=.*[a-z])/, "A senha deve ter pelo menos uma letra minúscula")
    .regex(/^(?=.*[0-9])/, "A senha deve ter pelo menos um dígito (0-9)")
    .regex(/^(?=.*[@%!&*_])/, "A senha deve ter pelo menos um caractere especial (@, %, !. &, * ou _)")
    .max(255),
});
export const updateUserSchema = createUserSchema.partial();
export type CreateUserDTO = z.infer<typeof createUserSchema>;
export type UpdateUserDTO = z.infer<typeof updateUserSchema>;