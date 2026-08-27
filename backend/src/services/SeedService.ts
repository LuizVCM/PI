import { NotFoundError } from "../errors/NotFoundError";
import { SeedMapper } from "../mappers/SeedMapper";
import { PlantRepository } from "../repositories/PlantRepository";
import { SeedRepository } from "../repositories/SeedRepository";
import { UserRepository } from "../repositories/UserRepository";
import { CreateSeedDTO, UpdateSeedDTO } from "../schemas/seed.schema";
import { dataFilter } from "../utils/data-filter";
import { AuthorizationService } from "./AuthorizationService";

export class SeedService {
  private repo = new SeedRepository();
  private userRepo = new UserRepository();
  private plantRepo = new PlantRepository();
  async listAll() {
    const seeds = await this.repo.findAllWithRelations();
    return SeedMapper.toResponseList(seeds);
  }
  async getById(id: number) {
    const seed = await this.repo.findByIdWithRelations(id);
    if (!seed) {
      throw new NotFoundError("semente");
    }
    return SeedMapper.toResponse(seed);
  }
  async listByUserLogged(userId: number) {
    const seeds = await this.repo.findByUserIdWithRelations(userId);
    return SeedMapper.toSummaryResponseList(seeds);
  }
  async create(data: CreateSeedDTO, loggedUserId: number) {
    const user = await this.userRepo.base.findById(loggedUserId);
    if (!user) {
      throw new NotFoundError("usuário");
    }
    const plant = await this.plantRepo.base.findById(data.plantaId);
    if (!plant) {
      throw new NotFoundError("planta");
    }
    const seed = await this.repo.create(data, user, plant);
    return SeedMapper.toResponse(seed);
  }
  async update(id: number, data: UpdateSeedDTO, loggedUserId: number) {
    const seed = await this.repo.base.findById(id);
    if (!seed) {
      throw new NotFoundError("semente");
    }
    AuthorizationService.ensureRelationActive(seed, "semente", "usuário")
    AuthorizationService.ensureRelationActive(seed.plantacao, "semente", "plantação")
    AuthorizationService.ensureOwnership(seed, loggedUserId, "sementes");
    dataFilter(seed, data)
    const seedUpdated = await this.repo.base.save(seed);
    return seedUpdated;
  }
  async delete(id: number, loggedUserId: number) {
    const seed = await this.repo.base.findById(id);

    if (!seed) {
      throw new NotFoundError("semente");
    }

    AuthorizationService.ensureOwnership(seed, loggedUserId, "sementes");

    const result = await this.repo.base.softDelete(id);

    if (result.affected === 0) {
      throw new NotFoundError("semente");
    }
  }
}
