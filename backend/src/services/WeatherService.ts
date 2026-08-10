import { WeatherRepository } from "../repositories/WeatherRepository";
import { CropRepository } from "../repositories/CropRepository";
import { NotFoundError } from "../errors/NotFoundError";
import { CreateWeatherDTO, UpdateWeatherDTO } from "../schemas/weather.schema";
import { UserRepository } from "../repositories/UserRepository";
import { AuthorizationService } from "./AuthorizationService";

export class WeatherService {
  async listAll() {
    return await WeatherRepository.findAll();
  }

  async getById(id: number) {
    const data = await WeatherRepository.findById(id);

    if (!data) {
      throw new NotFoundError("registro climático");
    }
    return data;
  }
  async findByCropId(cropId: number) {
    return await WeatherRepository.findByCropId(cropId);
  }
  async listByUserLogged(userId: number) {
    const user = await UserRepository.findById(userId);
    if (!user) {
      throw new NotFoundError("usuário");
    }
    const weatherData = await WeatherRepository.findAll({
      where: { territorio: { usuario: user } },
      relations: { territorio: true },
    });
    return weatherData;
  }

  async create(data: CreateWeatherDTO, cropId: number) {
    const crop = await CropRepository.findById(cropId);

    if (!crop) {
      throw new NotFoundError("território");
    }

    return await WeatherRepository.create(data, crop);
  }
  async update(id: number, data: UpdateWeatherDTO, loggedUserId: number) {
    const weatherData = await WeatherRepository.findById(id);
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
    const weatherUpdated = await WeatherRepository.save(weatherData);
    return weatherUpdated;
  }
  async delete(id: number, loggedUserId: number) {
    const weatherData = await WeatherRepository.findById(id);

    if (!weatherData) {
      throw new NotFoundError("registro climático");
    }
    AuthorizationService.ensureOwnership(
      weatherData.territorio,
      loggedUserId,
      "registros climáticos"
    );

    const result = await WeatherRepository.softDelete(id);

    if (result.affected === 0) {
      throw new NotFoundError("registro climático");
    }
  }
}