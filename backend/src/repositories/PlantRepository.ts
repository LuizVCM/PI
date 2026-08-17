import { Plant } from "../models/Plant";
import { CreatePlantDTO } from "../schemas/plant.schema";
import { createBaseRepository } from "./BaseRepository";

export class PlantRepository {
  public base = createBaseRepository(Plant);
  async findBySeedId(seedId: number): Promise<Plant[]> {
    return this.base.getRepository().find({
      where: { sementes: { id: seedId } },
      relations: { sementes: true },
    });
  }
  async findByUserId(userId: number) {
    return this.base
      .getRepository()
      .find({ where: { sementes: { usuario: { id: userId } } } });
  }
  async create(data: CreatePlantDTO): Promise<Plant> {
    const plant = this.base.create(data);
    return this.base.save(plant);
  }
}