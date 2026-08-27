import { Territory } from "../models/Territory";
import { User } from "../models/User";
import { AreaUnit } from "../utils/area-converter";
import { createBaseRepository } from "./BaseRepository";

const base = createBaseRepository(Territory);

export const TerritoryRepository = {
  ...base,

  /** buscar todos os territórios de um usuário */
  async findByUserId(userId: number): Promise<Territory[]> {
    return base.getRepository().find({
      where: { usuario: { id: userId } },
      relations: { usuario: true },
    });
  },

  async findWithCropsByUserId(userId: number): Promise<Territory[]> {
    return base.getRepository().find({
      where: { usuario: { id: userId } },
      relations: {
        plantacoes: true,
      },
    });
  },

  /** criar um novo território associado a um usuário */
  async create(
    data: {
      cep: string;
      areaM2: number;
      unidadeArea: AreaUnit;
    },
    user: User
  ): Promise<Territory> {
    const territory = base.create({ ...data, usuario: user });
    return base.save(territory);
  },
};