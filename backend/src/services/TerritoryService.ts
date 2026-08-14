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
  async listAll() {

    const territories = await TerritoryRepository.findAllWithUser();
    console.log(territories)
    return TerritoryMapper.toResponseList(territories);
  }
  async getById(id: number) {
    const territory = await TerritoryRepository.findById(id);
    if (!territory) {
      throw new NotFoundError("território");
    }
    return TerritoryMapper.toResponse(territory);
  }
  async listByUserLogged(userId: number) {
    return await TerritoryRepository.findByUserId(userId);
  }
  async listWithCropsByUser(userId: number) {
    const territories = await TerritoryRepository.findWithCropsByUserId(userId);
    return TerritoryMapper.toResponseList(territories);
  }
  async create(data: CreateTerritoryDTO, loggedUserId: number) {
    const user = await UserRepository.findById(loggedUserId);
    if (!user) {
      throw new NotFoundError("usuário");
    }
    const territoryData = TerritoryMapper.toCreateEntity(data);
    const territory = await TerritoryRepository.create(territoryData, user);
    return TerritoryMapper.toResponse(territory);
  }
  async update(id: number, data: UpdateTerritoryDTO, loggedUserId: number) {
    const territory = await TerritoryRepository.findById(id);
    if (!territory) {
      throw new NotFoundError("território");
    }
    AuthorizationService.ensureOwnership(
      territory,
      loggedUserId,
      "território"
    );
    Object.assign(
      territory,
      Object.fromEntries(
        Object.entries(data).filter(([, value]) => value !== undefined)
      )
    );
    const territoryData = TerritoryMapper.toUpdateEntity(territory);
    const territoryUpdated = await TerritoryRepository.save(territoryData);
    return TerritoryMapper.toResponse(territoryUpdated);
  }
  async delete(id: number, loggedUserId: number) {
    const territory = await TerritoryRepository.findByIdWithUser(id);
    if (!territory) {
      throw new NotFoundError("território");
    }
    console.log(territory);
    AuthorizationService.ensureOwnership(
      territory,
      loggedUserId,
      "território"
    );
    const result = await TerritoryRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundError("território");
    }
    return result;
  }
}
