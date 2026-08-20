import { PlantRepository } from "../repositories/PlantRepository";
import { NotFoundError } from "../errors/NotFoundError";
import { SeedRepository } from "../repositories/SeedRepository";
import { CreatePlantDTO, UpdatePlantDTO } from "../schemas/plant.schema";

export class PlantService {
  private repo = new PlantRepository();
  private seedRepo = new SeedRepository();
  async listAll() {
    return await this.repo.base.findAll();
  }
  async getById(id: number) {
    const plant = await this.repo.base.findById(id);

    if (!plant) {
      throw new NotFoundError("planta");
    }
    return plant;
  }
  async listBySeedId(seedId: number) {
    const plants = await this.repo.findBySeedId(seedId);
    if (!plants) {
      throw new NotFoundError("plantas");
    }
    return plants;
  }
  async listByUserLogged(userId: number) {
    const plants = await this.repo.findByUserId(userId);
    if (!plants) {
      throw new NotFoundError("plantas");
    }
    return plants;
  }
  async create(id: number, data: CreatePlantDTO) {
    const seed = await this.seedRepo.base.findById(id);
    if (!seed) {
      throw new NotFoundError("semente");
    }
    return this.repo.create(data);
  }
  async update(id: number, data: UpdatePlantDTO) {
    const plant = await this.repo.base.findById(id);

    if (!plant) {
      throw new NotFoundError("planta");
    }

    Object.assign(
      plant,
      Object.fromEntries(
        Object.entries(data).filter(([, value]) => value !== undefined)
      )
    );

    const plantaUpdate = await this.repo.base.save(plant);
    return plantaUpdate;
  }
  async delete(id: number) {
    const result = await this.repo.base.delete(id);
    if (result.affected === 0) {
      throw new NotFoundError("planta");
    }
  }
}