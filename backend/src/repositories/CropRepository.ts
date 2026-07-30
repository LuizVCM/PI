import { AppDataSource } from "../config/data-source";
import { Crop } from "../models/Crop";
import { User } from "../models/User";
import { CreateCropDTO } from "../schemas/crop.schema";

const repo = AppDataSource.getRepository(Crop);
export const CropRepository = {
  async findAll() {
    return repo.find();
  },
  async findById(id: number) {
    return repo.findOne({ where: { id } });
  },

  async findByUserId(userId: number) {
    return repo.find({ where: { user: { id: userId } }, relations: ["user"] });
  },
  async create(data: CreateCropDTO, user: User) {
    const territorio = repo.create({ ...data, user});
    return repo.save(territorio);
    
  },
  async save(territorio: Crop) {
    return repo.save(territorio);
  },
  async delete(id: number) {
    return repo.delete(id);
  },
  async findOne(options: any) {
    return await repo.findOne(options);
  },
};