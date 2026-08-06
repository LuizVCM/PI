import { Seed } from "../models/Seed";
import { User } from "../models/User";
import { CreateSeedDTO } from "../schemas/seed.schema";
import { createBaseRepository } from "./BaseRepository";

const base = createBaseRepository(Seed);

export const SeedRepository = {
  ...base,

  async findByUserId(userId: number): Promise<Seed[]> {
    return base.getRepository().find({
      where: { usuario: { id: userId } },
      relations: { usuario: true },
    });
  },

  async create(data: CreateSeedDTO, user: User): Promise<Seed> {
    const seed = base.create({ ...data, usuario: user });
    return base.save(seed);
  },
};