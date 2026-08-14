import { Territory } from "../models/Territory";
import { User } from "../models/User";
import { AreaUnit } from "../utils/area-converter";
import { createBaseRepository } from "./BaseRepository";

const base = createBaseRepository(Territory);

interface TerritoryData {
  cep: string;
  areaM2: number;
  unidadeArea: AreaUnit;
}

export const TerritoryRepository = {
  ...base,
  async findAllWithUser() {
    return base.findAll({
      relations: {
        usuario: true,
      },
    });
  },
  /** buscar todos os territórios de um usuário */
  async findByUserId(userId: number): Promise<Territory[]> {
    return base.getRepository().find({
      where: { usuario: { id: userId } },
      relations: { usuario: true },
    });
  },
  async findByIdWithUser(id: number) {
    return base.findById(id, { relations: { usuario: true } });
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
  async create(data: TerritoryData, user: User): Promise<Territory> {
    const territory = base.create({ ...data, usuario: user });
    return base.save(territory);
  },
};
