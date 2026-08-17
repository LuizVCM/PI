import { Weather } from "../models/Weather";
import { Territory } from "../models/Territory";
import { CreateWeatherDTO } from "../schemas/weather.schema";
import { createBaseRepository } from "./BaseRepository";

export class WeatherRepository {
  public base = createBaseRepository(Weather);
  async findByTerritoryId(territoryId: number): Promise<Weather[]> {
    return this.base.getRepository().find({
      where: { territorio: { id: territoryId } },
      relations: { territorio: true },
    });
  }
  async create(data: CreateWeatherDTO, territory: Territory): Promise<Weather> {
    const weather = this.base.create({ ...data, territorio: territory });
    return this.base.save(weather);
  }
}