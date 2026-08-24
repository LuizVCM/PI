import z from "zod";
import { NpkUnit } from "../models/Plant";

const plantSchema = z.object({
  nome: z
    .string()
    .trim()
    .min(1, "Nome é obrigatório")
    .max(100, "Nome deve ter no máximo 100 caracteres"),

  nomeCientifico: z
    .string()
    .trim()
    .min(1, "Nome científico é obrigatório")
    .max(150, "Nome científico deve ter no máximo 150 caracteres"),

  cicloMinimoDias: z.coerce
    .number()
    .int()
    .positive("Ciclo mínimo deve ser maior que zero"),

  cicloMaximoDias: z.coerce
    .number()
    .int()
    .positive("Ciclo máximo deve ser maior que zero"),

  phMinimo: z.coerce.number().min(0).max(14).optional(),

  phMaximo: z.coerce.number().min(0).max(14).optional(),

  temperaturaMinima: z.coerce.number().optional(),

  temperaturaMaxima: z.coerce.number().optional(),

  precipitacaoMinima: z.coerce.number().nonnegative().optional(),

  precipitacaoMaxima: z.coerce.number().nonnegative().optional(),

  necessidadeLuz: z.string().max(50).optional(),

  necessidadeAgua: z.string().max(50).optional(),

  texturaSolo: z.string().max(100).optional(),

  nitrogenio: z.coerce.number().nonnegative().optional(),

  fosforo: z.coerce.number().nonnegative().optional(),

  potassio: z.coerce.number().nonnegative().optional(),

  unidadeNpk: z.nativeEnum(NpkUnit).optional(),
});

export const createPlantSchema = plantSchema
  .refine((data) => data.cicloMinimoDias <= data.cicloMaximoDias, {
    message: "O ciclo mínimo não pode ser maior que o ciclo máximo",
    path: ["cicloMinimoDias"],
  })
  .refine(
    (data) =>
      data.phMinimo === undefined ||
      data.phMaximo === undefined ||
      data.phMinimo <= data.phMaximo,
    {
      message: "O pH mínimo não pode ser maior que o pH máximo",
      path: ["phMinimo"],
    }
  )
  .refine(
    (data) =>
      data.temperaturaMinima === undefined ||
      data.temperaturaMaxima === undefined ||
      data.temperaturaMinima <= data.temperaturaMaxima,
    {
      message: "A temperatura mínima não pode ser maior que a máxima",
      path: ["temperaturaMinima"],
    }
  )
  .refine(
    (data) =>
      data.precipitacaoMinima === undefined ||
      data.precipitacaoMaxima === undefined ||
      data.precipitacaoMinima <= data.precipitacaoMaxima,
    {
      message: "A precipitação mínima não pode ser maior que a máxima",
      path: ["precipitacaoMinima"],
    }
  );

export const updatePlantSchema = plantSchema
  .partial()
  .refine(
    (data) =>
      data.cicloMinimoDias === undefined ||
      data.cicloMaximoDias === undefined ||
      data.cicloMinimoDias <= data.cicloMaximoDias,
    {
      message: "O ciclo mínimo não pode ser maior que o ciclo máximo",
      path: ["cicloMinimoDias"],
    }
  )
  .refine(
    (data) =>
      data.phMinimo === undefined ||
      data.phMaximo === undefined ||
      data.phMinimo <= data.phMaximo,
    {
      message: "O pH mínimo não pode ser maior que o pH máximo",
      path: ["phMinimo"],
    }
  )
  .refine(
    (data) =>
      data.temperaturaMinima === undefined ||
      data.temperaturaMaxima === undefined ||
      data.temperaturaMinima <= data.temperaturaMaxima,
    {
      message: "A temperatura mínima não pode ser maior que a máxima",
      path: ["temperaturaMinima"],
    }
  )
  .refine(
    (data) =>
      data.precipitacaoMinima === undefined ||
      data.precipitacaoMaxima === undefined ||
      data.precipitacaoMinima <= data.precipitacaoMaxima,
    {
      message: "A precipitação mínima não pode ser maior que a máxima",
      path: ["precipitacaoMinima"],
    }
  );

export type CreatePlantDTO = z.infer<typeof createPlantSchema>;
export type UpdatePlantDTO = z.infer<typeof updatePlantSchema>;