import { Territory } from "../models/Territory";
import { User } from "../models/User";
import { CreateTerritoryDTO } from "../schemas/territory.schema";
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

  async findAllCropsRelatedByUser(userId: number) {
    return base
      .getRepository()
      .find({
        where: { usuario: { id: userId } },
        relations: { plantacoes: true },
        select: { plantacoes: true },
      });
  },

  /** criar um novo território associado a um usuário */
  async create(data: CreateTerritoryDTO, user: User): Promise<Territory> {
    const territory = base.create({ ...data, usuario: user });
    return base.save(territory);
  },
};
