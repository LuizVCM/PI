import { Crop } from "../models/Crop";
import { Territory } from "../models/Territory";
import { CreateCropDTO } from "../schemas/crop.schema";
import { createBaseRepository } from "./BaseRepository";

const base = createBaseRepository(Crop);

export const CropRepository = {
  ...base,
  async findByTerritoryId(territoryId: number) {
    return base.getRepository().find({
      where: { territorio: { id: territoryId } },
      relations: { territorio: true },
    });
  },
  async findByUserId(userId: number) {
    return base
      .getRepository()
      .find({ where: { territorio: { usuario: { id: userId } } } });
  },
  async create(data: CreateCropDTO, territory: Territory) {
    const crop = base.create({ ...data, territorio: territory });
    return base.save(crop);
  },
};