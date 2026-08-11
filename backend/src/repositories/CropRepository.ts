import { Crop } from "../models/Territory";
import { User } from "../models/User";
import { CreateCropDTO } from "../schemas/crop.schema";
import { createBaseRepository } from "./BaseRepository";

const base = createBaseRepository(Crop);

export const CropRepository = {
  ...base,

  /** buscar todos os territórios de um usuário */
  async findByUserId(userId: number): Promise<Crop[]> {
    return base.getRepository().find({
      where: { usuario: { id: userId } },
      relations: { usuario: true },
    });
  },

  /** criar um novo território associado a um usuário */
  async create(data: CreateCropDTO, user: User): Promise<Crop> {
    const crop = base.create({ ...data, usuario: user });
    return base.save(crop);
  },
};