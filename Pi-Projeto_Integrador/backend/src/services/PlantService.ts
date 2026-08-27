import { PlantRepository } from "../repositories/PlantRepository";
import { NotFoundError } from "../errors/NotFoundError";
import { SeedRepository } from "../repositories/SeedRepository";
import { CreatePlantDTO, UpdatePlantDTO } from "../schemas/plant.schema";

export class PlantService {
  async listAll() {
    return await PlantRepository.findAll();
  }

  async getById(id: number) {
    const plant = await PlantRepository.findById(id);

    if (!plant) {
      throw new NotFoundError("planta");
    }
    return plant;
  }
  async listBySeedId(seedId: number) {
    const plants = await PlantRepository.findBySeedId(seedId);
    if (!plants) {
      throw new NotFoundError("plantas");
    }
    return plants;
  }
  async listByUserLogged(userId: number) {
    const plants = await PlantRepository.findByUserId(userId);
    if (!plants) {
      throw new NotFoundError("plantas");
    }
    return plants;
  }
  async create(id: number, data: CreatePlantDTO) {
    const seed = await SeedRepository.findById(id);
    if (!seed) {
      throw new NotFoundError("semente");
    }
    return PlantRepository.create(data);
  }
  async update(id: number, data: UpdatePlantDTO, seedId: number) {
    const plant = await PlantRepository.findById(id);

    if (!plant) {
      throw new NotFoundError("planta");
    }

    const seed = await SeedRepository.findById(seedId);

    if (!seed) {
      throw new NotFoundError("semente");
    }

    Object.assign(
      plant,
      Object.fromEntries(
        Object.entries(data).filter(([, value]) => value !== undefined)
      )
    );

    const plantaUpdate = await PlantRepository.save(plant);
    return plantaUpdate;
  }
  async delete(id: number) {
    const result = await PlantRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundError("planta");
    }
  }
}