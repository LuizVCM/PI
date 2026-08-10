import { Plant } from "../models/Plant";
import { CreatePlantDTO } from "../schemas/plant.schema";
import { createBaseRepository } from "./BaseRepository";
import { UserRepository } from "./UserRepository";

const base = createBaseRepository(Plant);

export const PlantRepository = {
  ...base,

  async findBySeedId(seedId: number): Promise<Plant[]> {
    return base.getRepository().find({
      where: { sementes: { id: seedId } },
      relations: { sementes: true },
    });
  },

  async findByUserId(userId: number) {
    return base
      .getRepository()
      .find({ where: { sementes: { usuario: { id: userId } } } });
  },
  async create(data: CreatePlantDTO): Promise<Plant> {
    const plant = base.create(data);
    return base.save(plant);
  },
};