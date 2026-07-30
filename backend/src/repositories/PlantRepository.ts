import { Seed } from './../models/Seed';
import { AppDataSource } from "../config/data-source";
import { Plant } from "../models/Plant";
import { CreatePlantDTO } from "../schemas/plant.schema";

const repo = AppDataSource.getRepository(Plant);

export const PlantaRepository = {
  async findAll() {
    return repo.find();
  },
  async findById(id: number) {
    return repo.findOne({ where: { id } });
  },
  async findBySeedId(seedId: number) {
    return repo.find({
      where: { sementes: { id: seedId } },
      relations: ["seed"],
    });
  },
  async create(data: CreatePlantDTO) {
    const planta = repo.create(data);
    return repo.save(planta);
  },
  async save(planta: Plant) {
    return repo.save(planta);
  },
  async delete(id: number) {
    return repo.delete(id);
  },
};
