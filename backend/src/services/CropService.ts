import { InternalServerError } from "../errors/InternalServerError";
import { NotFoundError } from "../errors/NotFoundError";
import { CropMapper } from "../mappers/CropMapper";
import { CropRepository } from "../repositories/CropRepository";
import { TerritoryRepository } from "../repositories/TerritoryRepository";
import { UserRepository } from "../repositories/UserRepository";
import { CreateCropDTO } from "../schemas/crop.schema";
import { AuthorizationService } from "./AuthorizationService";

export class CropService {
  private repo = new CropRepository();
  private userRepo = new UserRepository();
  private territoryRepo = new TerritoryRepository();
  async listAll() {
    const crops = await this.repo.findAllWithTerritory();
    return CropMapper.toResponseList(crops);
  }
  async getById(id: number) {
    const crop = await this.repo.base.findById(id);
    if (!crop) {
      throw new NotFoundError("plantação");
    }
    return CropMapper.toResponse(crop);
  }
  async listByUserLogged(userId: number) {
    const crops = await this.repo.findByUserId(userId);
    if (!crops) {
      throw new NotFoundError("plantações");
    }
    return CropMapper.toResponseList(crops);
  }
  async listByTerritoryId(territoryId: number) {
    const crops = await this.repo.findByTerritoryId(territoryId);
    if (!crops) {
      throw new NotFoundError("plantações");
    }
    return CropMapper.toResponseList(crops);
  }
  async create(data: CreateCropDTO, territoryId: number, loggedUserId: number) {
    const user = await this.userRepo.base.findById(loggedUserId);
    if (!user) {
      throw new InternalServerError("Ocorreu um erro inesperado");
    }
    const territory = await this.territoryRepo.findByIdWithUser(territoryId);
    if (!territory) {
      throw new NotFoundError("território");
    }
    AuthorizationService.ensureOwnership(territory, loggedUserId, "território");
    const cropData = CropMapper.toCreateEntity(data);
    const crop = await this.repo.create(cropData, territory);
    return CropMapper.toResponse(crop);
  }
}