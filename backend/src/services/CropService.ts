import { InternalServerError } from "../errors/InternalServerError";
import { NotFoundError } from "../errors/NotFoundError";
import { CropMapper } from "../mappers/CropMapper";
import { CropRepository } from "../repositories/CropRepository";
import { TerritoryRepository } from "../repositories/TerritoryRepository";
import { UserRepository } from "../repositories/UserRepository";
import { CreateCropDTO } from "../schemas/crop.schema";
import { AuthorizationService } from "./AuthorizationService";

export class CropService {
  async listAll() {
    const crops = await CropRepository.findAllWithTerritory();
    return CropMapper.toResponseList(crops);
  }
  async getById(id: number) {
    const crop = await CropRepository.findById(id);
    if (!crop) {
      throw new NotFoundError("plantação");
    }
    return CropMapper.toResponse(crop);
  }
  async listByUserLogged(userId: number) {
    const crops = await CropRepository.findByUserId(userId);
    if (!crops) {
      throw new NotFoundError("plantações");
    }
    return CropMapper.toResponseList(crops);
  }
  async listByTerritoryId(territoryId: number) {
    const crops = await CropRepository.findByTerritoryId(territoryId);
    if (!crops) {
      throw new NotFoundError("plantações");
    }
    return CropMapper.toResponseList(crops);
  }
  async create(data: CreateCropDTO, territoryId: number, loggedUserId: number) {
    const user = await UserRepository.findById(loggedUserId);
    if (!user) {
      throw new InternalServerError("Ocorreu um erro inesperado");
    }
    const territory = await TerritoryRepository.findByIdWithUser(territoryId);
    if (!territory) {
      throw new NotFoundError("território");
    }
    AuthorizationService.ensureOwnership(
      territory,
      loggedUserId,
      "território"
    );
    const cropData = CropMapper.toCreateEntity(data);
    const crop = await CropRepository.create(cropData, territory);
    return CropMapper.toResponse(crop);
  }
}
