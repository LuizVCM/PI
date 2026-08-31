import { Weather } from "../models/Weather";
import { Territory } from "../models/Territory";
import { CreateWeatherDTO } from "../schemas/weather.schema";
import { createBaseRepository } from "./BaseRepository";

export class WeatherRepository {
  public base = createBaseRepository(Weather);
  async findAllWithTerritory() {
    return this.base.findAll({ relations: { territorio: true } });
  }
  async findByIdWithTeritory(id: number) {
    return this.base.findById(id, {
      relations: { territorio: true },
    });
  }
  async findByTerritoryId(territoryId: number): Promise<Weather[]> {
    return this.base.getRepository().find({
      where: { territorio: { id: territoryId } },
      relations: { territorio: true },
    });
  }
  async findAllByUserId(userId: number) {
    return this.base
      .getRepository()
      .find({ where: { territorio: { usuario: { id: userId } } } });
  }
  async create(data: CreateWeatherDTO, territory: Territory): Promise<Weather> {
    const weather = this.base.create({ ...data, territorio: territory });
    return this.base.save(weather);
  }
}