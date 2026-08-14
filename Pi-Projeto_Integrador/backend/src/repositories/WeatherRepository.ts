import { Weather } from "../models/Weather";
import { Territory } from "../models/Territory";
import { CreateWeatherDTO } from "../schemas/weather.schema";
import { createBaseRepository } from "./BaseRepository";

const base = createBaseRepository(Weather);

export const WeatherRepository = {
  ...base,

  async findByCropId(cropId: number): Promise<Weather[]> {
    return base.getRepository().find({
      where: { territorio: { id: cropId } },
      relations: { territorio: true },
    });
  },
  
  async create(data: CreateWeatherDTO, territory: Territory): Promise<Weather> {
    const weather = base.create({ ...data, territorio: territory });
    return base.save(weather);
  },
};