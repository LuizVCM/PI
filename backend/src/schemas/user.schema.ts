import z from "zod";
const userSchema = z.object({
    nome: z.string().min(3).max(100),
    sobrenome: z.string().min(3).max(100),
    email: z.email(),
    telefone: z.number(),
    senha: z.string(),
    cpf: z.string()
});
export const CreateUserDTO = userSchema;
export const UpdateUserDTO = userSchema.partial();