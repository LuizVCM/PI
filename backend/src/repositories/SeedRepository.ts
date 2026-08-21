import { Seed } from "../models/Seed";
import { User } from "../models/User";
import { CreateSeedDTO } from "../schemas/seed.schema";
import { createBaseRepository } from "./BaseRepository";

export class SeedRepository {
  public base = createBaseRepository(Seed);
  async findAllWithUser() {
    return this.base.findAll({ relations: { usuario: true } });
  }
  async findByIdWithUser(id: number) {
    return this.base.findById(id, { relations: { usuario: true } });
  }
  async findByUserIdWithRelations(userId: number): Promise<Seed[]> {
    return this.base.getRepository().find({
      where: { usuario: { id: userId } },
      relations: { usuario: true, planta: true },
    });
  }
  async findByIdWithRelations(id: number) {
    return this.base.findById(id, {
      relations: { usuario: true, planta: true },
    });
  }
  async create(data: CreateSeedDTO, user: User): Promise<Seed> {
    const seed = this.base.create({ ...data, usuario: user });
    return this.base.save(seed);
  }
}