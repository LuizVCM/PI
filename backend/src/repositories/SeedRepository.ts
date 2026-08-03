import { AppDataSource } from "../config/data-source";
import { Seed } from "../models/Seed";
import { User } from "../models/User";
import { CreateSeedDTO } from "../schemas/seed.schema";

const repo = AppDataSource.getRepository(Seed);

export const SeedRepository = {
  async findAll() {
    return repo.find();
  },
  async findById(id: number) {
    return repo.findOne({ where: { id } });
  },
  async findByUserId(userId: number) {
    return repo.find({ where: { user: { id: userId } }, relations: ["user"] });
  },
  async create(data: CreateSeedDTO, user: User) {
    const semente = repo.create({...data, user});
    return repo.save(semente);
  },
  async save(semente: Seed) {
    return repo.save(semente);
  },
  async delete(id: number) {
    return repo.delete(id);
  },
  async findOne(options: any) {
    return await repo.findOne(options);
  },
};
