import { WeatherRepository } from "../repositories/WeatherRepository";
import { TerritoryRepository } from "../repositories/TerritoryRepository";
import { NotFoundError } from "../errors/NotFoundError";
import { CreateWeatherDTO } from "../schemas/weather.schema";
import { UserRepository } from "../repositories/UserRepository";
import { WeatherMapper } from "../mappers/WeatherMapper";

export class WeatherService {
  private repo = new WeatherRepository();
  private userRepo = new UserRepository();
  private territoryRepo = new TerritoryRepository();
  async listAll() {
    const weatherData = await this.repo.findAllWithTerritory();
    return WeatherMapper.toResponseList(weatherData);
  }
  async getById(id: number) {
    const weatherData = await this.repo.findByIdWithTeritory(id);
    if (!weatherData) {
      throw new NotFoundError("registro climático");
    }
    return WeatherMapper.toResponse(weatherData);
  }
  async findByTerritoryId(territoryId: number) {
    const weatherData = await this.repo.findByTerritoryId(territoryId);
    return WeatherMapper.toResponseList(weatherData);
  }
  async listByUserLogged(userId: number) {
    const user = await this.userRepo.base.findById(userId);
    if (!user) {
      throw new NotFoundError("usuário");
    }
    const weatherData = await this.repo.findAllByUserId(userId);
    return WeatherMapper.toResponseList(weatherData);
  }
  async create(data: CreateWeatherDTO, territoryId: number) {
    const territory = await this.territoryRepo.base.findById(territoryId);
    if (!territory) {
      throw new NotFoundError("território");
    }
    return await this.repo.create(data, territory);
  }
}