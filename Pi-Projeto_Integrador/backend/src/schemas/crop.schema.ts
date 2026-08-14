import z from "zod";
import { CropCulture, CropStatus } from "../models/Crop";
import { AreaUnit } from "../utils/area-converter";

export const createCropSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório").max(100),
  cultura: z.enum(CropCulture),
  variedade: z.string().min(1, "Variedade é obrigatória").max(100),
  area: z.number().positive("A área deve ser maior que zero"),
  unidadeArea: z.enum(AreaUnit),
  dataPlantio: z.coerce.date(),
  colheitaPrevista: z.coerce.date().nullable().optional(),
  responsavel: z.string().min(1, "Responsável é obrigatório").max(100),
  status: z.enum(CropStatus),
  observacoes: z.string().nullable().optional(),
  territorioId: z.number().int().positive(),
});
export const updateCropSchema = createCropSchema.partial();
export type CreateCropDTO = z.infer<typeof createCropSchema>;
export type UpdateCropDTO = z.infer<typeof updateCropSchema>;