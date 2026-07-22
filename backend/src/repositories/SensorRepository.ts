import { AppDataSource } from "../config/data-source";
import { Weather } from "../models/Weather";
import { Sensor } from "../models/Sensor";

const repo = AppDataSource.getRepository(Sensor);

export const SensorRepository = {
  async findAll() {
    return repo.find();
  },
  async findById(id: number) {
    return repo.findOne({ where: { id } });
  },
  async findByClimaId(climaId: number) {
    return repo.find({
      where: { clima: { id: climaId } },
      relations: ["weather"],
    });
  },
  async create(data: { funcao: string; dados: string; clima: Weather }) {
    const sensor = repo.create(data);
    return repo.save(sensor);
  },
  async save(sensor: Sensor) {
    return repo.save(sensor);
  },
  async delete(id: number) {
    return repo.delete(id);
  },
};
