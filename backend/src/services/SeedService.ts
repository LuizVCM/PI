import { ForbiddenError } from "../errors/ForbiddenError";
import { NotFoundError } from "../errors/NotFoundError";
import { SeedRepository } from "../repositories/SeedRepository";
import { UserRepository } from "../repositories/UserRepository";
import { CreateSeedDTO, UpdateSeedDTO } from "../schemas/seed.schema";

export class SeedService {
  async listAll() {
    return await SeedRepository.findAll();
  }

  async getById(id: number) {
    const seed = await SeedRepository.findById(id);

    if (!seed) {
      throw new NotFoundError("semente");
    }
    return seed;
  }
  async listMySeeds(userId: number) {
    return SeedRepository.findByUserId(userId);
  }

  async create(data: CreateSeedDTO, loggedUserId: number) {
    const user = await UserRepository.findById(loggedUserId);
    if (!user) {
      throw new NotFoundError("usuário");
    }
    return SeedRepository.create(data, user);
  }
  async update(id: number, data: UpdateSeedDTO, loggedUserId: number) {
    const seed = await SeedRepository.findById(id);

    if (!seed) {
      throw new NotFoundError("semente");
    }
    if (seed.usuario.id !== loggedUserId) {
      throw new ForbiddenError(
        "sementes",
        "tentativa de alterar dados de outro usuário"
      );
    }
    Object.assign(
      seed,
      Object.fromEntries(
        Object.entries(data).filter(([, value]) => value !== undefined)
      )
    );

    const seedUpdated = await SeedRepository.save(seed);
    return seedUpdated;
  }
  async delete(id: number) {
    const seed = await SeedRepository.delete(id);

    if (seed.affected === 0) {
      throw new NotFoundError("semente");
    }
  }
}