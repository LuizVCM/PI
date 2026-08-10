import { NotFoundError } from "../errors/NotFoundError";
import { CropRepository } from "../repositories/CropRepository";
import { UserRepository } from "../repositories/UserRepository";
import { CreateCropDTO, UpdateCropDTO } from "../schemas/crop.schema";
import { omitPassword } from "../utils/omitPassword";
import { AuthorizationService } from "./AuthorizationService";

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
  async listByUserLogged(userId: number) {
    return await UserRepository.findByIdWithRelation(userId, "territorios");
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

    AuthorizationService.ensureOwnership(crop, loggedUserId, "territórios");

    Object.assign(
      crop,
      Object.fromEntries(
        Object.entries(data).filter(([, value]) => value !== undefined)
      )
    );

    const cropUpdated = await CropRepository.save(crop);
    return cropUpdated;
  }
  async delete(id: number, loggedUserId: number) {
    const crop = await CropRepository.findById(id);
    if (!crop) {
      throw new NotFoundError("território");
    }

    AuthorizationService.ensureOwnership(crop, loggedUserId, "territórios");

    const result = await CropRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundError("território");
    }
  }
}