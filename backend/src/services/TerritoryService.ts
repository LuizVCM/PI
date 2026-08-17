import { NotFoundError } from "../errors/NotFoundError";
import { TerritoryMapper } from "../mappers/TerritoryMapper";
import { TerritoryRepository } from "../repositories/TerritoryRepository";
import { UserRepository } from "../repositories/UserRepository";
import {
  CreateTerritoryDTO,
  UpdateTerritoryDTO,
} from "../schemas/territory.schema";
import { AuthorizationService } from "./AuthorizationService";

export class TerritoryService {
  private repo = new TerritoryRepository();
  private userRepo = new UserRepository();
  async listAll() {
    const territories = await this.repo.findAllWithUser();
    console.log(territories);
    return TerritoryMapper.toResponseList(territories);
  }
  async getById(id: number) {
    const territory = await this.repo.findByIdWithRelations(id);
    if (!territory) {
      throw new NotFoundError("território");
    }
    return TerritoryMapper.toResponse(territory);
  }
  async listByUserLogged(userId: number) {
    const territories = await this.repo.findByUserIdWithRelations(userId);
    console.log(territories);
    return TerritoryMapper.toResponseList(territories);
  }
  async create(data: CreateTerritoryDTO, loggedUserId: number) {
    const user = await this.userRepo.base.findById(loggedUserId);
    if (!user) {
      throw new NotFoundError("usuário");
    }
    const territoryData = TerritoryMapper.toCreateEntity(data);
    const territory = await this.repo.create(territoryData, user);
    return TerritoryMapper.toResponse(territory);
  }
  async update(id: number, data: UpdateTerritoryDTO, loggedUserId: number) {
    const territory = await this.repo.base.findById(id);
    if (!territory) {
      throw new NotFoundError("território");
    }
    AuthorizationService.ensureOwnership(territory, loggedUserId, "território");
    Object.assign(
      territory,
      Object.fromEntries(
        Object.entries(data).filter(([, value]) => value !== undefined)
      )
    );
    const territoryData = TerritoryMapper.toUpdateEntity(territory);
    const territoryUpdated = await this.repo.base.save(territoryData);
    return TerritoryMapper.toResponse(territoryUpdated);
  }
  async delete(id: number, loggedUserId: number) {
    const territory = await this.repo.findByIdWithUser(id);
    if (!territory) {
      throw new NotFoundError("território");
    }
    console.log(territory);
    AuthorizationService.ensureOwnership(territory, loggedUserId, "território");
    const result = await this.repo.base.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundError("território");
    }
    return result;
  }
}