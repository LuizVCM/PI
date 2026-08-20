import { InternalServerError } from "../errors/InternalServerError";
import { NotFoundError } from "../errors/NotFoundError";
import { CropMapper } from "../mappers/CropMapper";
import { CropRepository } from "../repositories/CropRepository";
import { TerritoryRepository } from "../repositories/TerritoryRepository";
import { UserRepository } from "../repositories/UserRepository";
import { CreateCropDTO, UpdateCropDTO } from "../schemas/crop.schema";
import { dataFilter } from "../utils/data-filter";
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
    const crop = await this.repo.findByIdWithTerritory(id);
    if (!crop) {
      throw new NotFoundError("plantação");
    }
    return CropMapper.toResponse(crop);
  }
  async listByUserLogged(userId: number) {
    const crops = await this.repo.findAllByUserId(userId);
    if (crops.length === 0) {
      throw new NotFoundError("plantações", "não há plantações cadastradas");
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
  async update(id: number, data: UpdateCropDTO, loggedUserId: number) {
    const crop = await this.repo.findByIdWithTerritory(id);
    if (!crop) {
      throw new NotFoundError("plantação");
    }
    AuthorizationService.ensureRelationActive(
      crop.territorio,
      "plantação",
      "território"
    );
    AuthorizationService.ensureOwnership(
      crop.territorio,
      loggedUserId,
      "plantação"
    );
    const cropData = CropMapper.toUpdateEntity(data);
    dataFilter(crop, cropData);
    const cropUpdated = await this.repo.base.save(crop);
    return CropMapper.toSummaryResponse(cropUpdated);
  }
  async delete(id: number, loggedUserId: number) {
    const crop = await this.repo.findByIdWithTerritory(id);
    if (!crop) {
      throw new NotFoundError("plantação");
    }
    AuthorizationService.ensureRelationActive(
      crop.territorio,
      "plantação",
      "território"
    );
    AuthorizationService.ensureOwnership(
      crop.territorio,
      loggedUserId,
      "plantação"
    );
    const result = await this.repo.base.softDelete(id);
    if (result.affected === 0) {
      throw new InternalServerError("Não foi possível deletar");
    }
    return result;
  }
}