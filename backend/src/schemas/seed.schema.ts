import z from "zod";
const seedsSchema = z.object({
    dataCompra: z.date(),
    nomePlanta: z.string(),
    dataPlantio: z.date(),
    quantidade: z.number()
});
export const CreateSeedDTO = seedsSchema;