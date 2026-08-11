import { NotFoundError } from "../errors/NotFoundError";
import { TerritoryRepository } from "../repositories/TerritoryRepository";
import { UserRepository } from "../repositories/UserRepository";
import { CreateTerritoryDTO, UpdateTerritoryDTO } from "../schemas/territory.schema";
import { omitPassword } from "../utils/omitPassword";
import { AuthorizationService } from "./AuthorizationService";

export class TerritoryService {
  async listAll() {
    return await TerritoryRepository.findAll();
  }
  async getById(id: number) {
    const territory = await TerritoryRepository.findById(id);

    if (!territory) {
      throw new NotFoundError("território");
    }
    return territory;
  }
  async listByUserLogged(userId: number) {
    return await TerritoryRepository.findByUserId(userId);
  }
  async create(data: CreateTerritoryDTO, loggedUserId: number) {
    const user = await UserRepository.findById(loggedUserId);
    if (!user) {
      throw new NotFoundError("usuário");
    }
    const territory = await TerritoryRepository.create(data, user);
    return { ...territory, user: omitPassword(user) };
  }
  async update(id: number, data: UpdateTerritoryDTO, loggedUserId: number) {
    const territory = await TerritoryRepository.findById(id);

    if (!territory) {
      throw new NotFoundError("território");
    }

    AuthorizationService.ensureOwnership(territory, loggedUserId, "territórios");

    Object.assign(
      territory,
      Object.fromEntries(
        Object.entries(data).filter(([, value]) => value !== undefined)
      )
    );

    const TerritoryUpdated = await TerritoryRepository.save(territory);
    return TerritoryUpdated;
  }
  async delete(id: number, loggedUserId: number) {
    const territory = await TerritoryRepository.findById(id);
    if (!territory) {
      throw new NotFoundError("território");
    }

    AuthorizationService.ensureOwnership(territory, loggedUserId, "territórios");

    const result = await TerritoryRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundError("território");
    }
  }
}