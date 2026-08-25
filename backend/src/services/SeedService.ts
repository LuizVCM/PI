import { NotFoundError } from "../errors/NotFoundError";
import { SeedRepository } from "../repositories/SeedRepository";
import { UserRepository } from "../repositories/UserRepository";
import { CreateSeedDTO, UpdateSeedDTO } from "../schemas/seed.schema";
import { AuthorizationService } from "./AuthorizationService";

export class SeedService {
  private repo = new SeedRepository();
  private userRepo = new UserRepository();
  async listAll() {
    return await this.repo.base.findAll();
  }
  async getById(id: number) {
    const seed = await this.repo.base.findById(id);

    if (!seed) {
      throw new NotFoundError("semente");
    }
    return seed;
  }
  async listByUserLogged(userId: number) {
    return this.repo.findByIdWithUser(userId);
  }
  async create(data: CreateSeedDTO, loggedUserId: number) {
    const user = await this.userRepo.base.findById(loggedUserId);
    if (!user) {
      throw new NotFoundError("usuário");
    }
    return this.repo.create(data, user);
  }
  async update(id: number, data: UpdateSeedDTO, loggedUserId: number) {
    const seed = await this.repo.base.findById(id);
    if (!seed) {
      throw new NotFoundError("semente");
    }

    AuthorizationService.ensureOwnership(seed, loggedUserId, "sementes");

    Object.assign(
      seed,
      Object.fromEntries(
        Object.entries(data).filter(([, value]) => value !== undefined)
      )
    );

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