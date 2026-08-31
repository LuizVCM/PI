import { PlantRepository } from "../repositories/PlantRepository";
import { NotFoundError } from "../errors/NotFoundError";
import { CreatePlantDTO, UpdatePlantDTO } from "../schemas/plant.schema";
import { ConflictError } from "../errors/ConflictError";
import { dataFilter } from "../utils/data-filter";
import { PlantMapper } from "../mappers/PlantMapper";

export class PlantService {
  private repo = new PlantRepository();
  async listAll() {
    const plants = await this.repo.base.findAll();
    return PlantMapper.toResponseList(plants)
  }
  async getById(id: number) {
    const plant = await this.repo.base.findById(id);
    if (!plant) {
      throw new NotFoundError("planta");
    }
    return PlantMapper.toResponse(plant);
  }
  async listBySeedId(seedId: number) {
    const plant = await this.repo.findBySeedId(seedId);
    if (!plant) {
      throw new NotFoundError("planta");
    }
    return PlantMapper.toResponseWithRelation(plant);
  }
  async listByUserLogged(userId: number) {
    const plants = await this.repo.findByUserId(userId);
    return PlantMapper.toResponseWithRelationList(plants);
  }
  async create(data: CreatePlantDTO) {
    const {nomeCientifico} = data;
    const exists = await this.repo.findExisting(nomeCientifico);
    if (exists) {
      throw new ConflictError(["nome científico"])
    }
    return this.repo.create(data);
  }
  async update(id: number, data: UpdatePlantDTO) {
    const plant = await this.repo.base.findById(id);
    if (!plant) {
      throw new NotFoundError("planta");
    }
    dataFilter(plant, data);
    const plantUpdated = await this.repo.base.save(plant);
    return plantUpdated;
  }
}