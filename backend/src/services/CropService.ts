import { deprecate } from "util";
import { ForbiddenError } from "../errors/ForbiddenError";
import { NotFoundError } from "../errors/NotFoundError";
import { CropRepository } from "../repositories/CropRepository";
import { UserRepository } from "../repositories/UserRepository";
import { CreateCropDTO, UpdateCropDTO } from "../schemas/crop.schema";
import { omitPassword } from "../utils/omitPassword";

export class CropService {
  async listAll() {
    return await CropRepository.findAll();
  }
  async getById(id: number) {
    const crop = await CropRepository.findById(id);

    if (!crop) {
      throw new NotFoundError("território");
    }
    return crop;
  }
  // será usado findByIdWithRelation do UserRepository, qualquer relação de user pode ser listado com esse método
  async listByUserId(userId: number) {
    return await CropRepository.findById(userId);
  }
  async create(data: CreateCropDTO, loggedUserId: number) {
    const user = await UserRepository.findById(loggedUserId);
    if (!user) {
      throw new NotFoundError("usuário");
    }
    const crop = await CropRepository.create(data, user);
    return { ...crop, user: omitPassword(user) };
  }
  async update(id: number, data: UpdateCropDTO, loggedUserId: number) {
    const crop = await CropRepository.findById(id);

    if (!crop) {
      throw new NotFoundError("território");
    }
    if (crop.usuario.id !== loggedUserId) {
      throw new ForbiddenError("territórios", "tentativa de alterar dados de outro usuário");
    }
    Object.assign(
      crop,
      Object.fromEntries(
        Object.entries(data).filter(([, value]) => value !== undefined)
      )
    );

    const cropUpdated = await CropRepository.save(crop);
    return cropUpdated;
  }
  async delete(id: number) {
    const crop = await CropRepository.softDelete(id);

    if (crop.affected === 0) {
      throw new NotFoundError("território");
    }
  }
}