import { AppDataSource } from "../config/data-source";
import { Weather } from "../models/Weather";
import { Crop } from "../models/Crop";
import { CreateWeatherDTO } from "../schemas/weather.schema";

const repo = AppDataSource.getRepository(Weather);

export const WeatherRepository = {
  async findAll() {
    return repo.find();
  },
  async findById(id: number) {
    return repo.findOne({ where: { id } });
  },
  async findByTerritorioId(territorioId: number) {
    return repo.find({
      where: { territorio: { id: territorioId } },
      relations: ["territorio"],
    });
  },
  async create(data: CreateWeatherDTO, territorio: Crop) {
    const clima = repo.create({ ...data, territorio: territorio });
    return repo.save(clima);
  },
  async save(clima: Weather) {
    return repo.save(clima);
  },
  async delete(id: number) {
    return repo.delete(id);
  },
  async findOne(options: any) {
    return await repo.findOne(options);
  },
};