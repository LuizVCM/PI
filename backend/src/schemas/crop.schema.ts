import z from "zod";
const cropSchema = z.object({
    cep: z.string(),
    tamanho: z.number()
})
export const CreateCropDTO = cropSchema;