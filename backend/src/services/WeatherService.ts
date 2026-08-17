import { WeatherRepository } from "../repositories/WeatherRepository";
import { TerritoryRepository } from "../repositories/TerritoryRepository";
import { NotFoundError } from "../errors/NotFoundError";
import { CreateWeatherDTO, UpdateWeatherDTO } from "../schemas/weather.schema";
import { UserRepository } from "../repositories/UserRepository";
import { AuthorizationService } from "./AuthorizationService";

export class WeatherService {
  private repo = new WeatherRepository();
  private userRepo = new UserRepository();
  private territoryRepo = new TerritoryRepository();
  async listAll() {
    return await this.repo.base.findAll();
  }
  async getById(id: number) {
    const data = await this.repo.base.findById(id);

    if (!data) {
      throw new NotFoundError("registro climático");
    }
    return data;
  }
  async findByTerritoryId(territoryId: number) {
    return await this.repo.findByTerritoryId(territoryId);
  }
  async listByUserLogged(userId: number) {
    const user = await this.userRepo.base.findById(userId);
    if (!user) {
      throw new NotFoundError("usuário");
    }
    const weatherData = await this.repo.base.findAll({
      where: { territorio: { usuario: user } },
      relations: { territorio: true },
    });
    return weatherData;
  }

  async create(data: CreateWeatherDTO, territoryId: number) {
    const territory = await this.territoryRepo.base.findById(territoryId);

    if (!territory) {
      throw new NotFoundError("território");
    }

    return await this.repo.create(data, territory);
  }
  async update(id: number, data: UpdateWeatherDTO, loggedUserId: number) {
    const weatherData = await this.repo.base.findById(id);
    if (!weatherData) {
      throw new NotFoundError("registro climático");
    }

    AuthorizationService.ensureOwnership(
      weatherData.territorio,
      loggedUserId,
      "registros climáticos"
    );

    Object.assign(
      weatherData,
      Object.fromEntries(
        Object.entries(data).filter(([, value]) => value !== undefined)
      )
    );
    const weatherUpdated = await this.repo.base.save(weatherData);
    return weatherUpdated;
  }
  async delete(id: number, loggedUserId: number) {
    const weatherData = await this.repo.base.findById(id);

    if (!weatherData) {
      throw new NotFoundError("registro climático");
    }
    AuthorizationService.ensureOwnership(
      weatherData.territorio,
      loggedUserId,
      "registros climáticos"
    );

    const result = await this.repo.base.softDelete(id);

    if (result.affected === 0) {
      throw new NotFoundError("registro climático");
    }
  }
}