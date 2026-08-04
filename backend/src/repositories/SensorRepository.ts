import { AppDataSource } from "../config/data-source";
import { Weather } from "../models/Weather";
import { Sensor } from "../models/Sensor";
import { CreateSensorDTO } from "../schemas/sensor.schema";
import { Crop } from "../models/Crop";

const repo = AppDataSource.getRepository(Sensor);

export const SensorRepository = {
  async findAll() {
    return repo.find();
  },
  async findById(id: number) {
    return repo.findOne({ where: { id } });
  },
  // async findByClimaId(climaId: number) {
  //   return repo.find({
  //     where: { clima: { id: climaId } },
  //     relations: ["weather"],
  //   });
  // },
  // async create(data: { funcao: string; dados: string; clima: Weather }) {
  //   const sensor = repo.create(data);
  //   return repo.save(sensor);
  // },
  async findByCropId(cropId: number) {
    return repo.find({ where: { territorio: { id: cropId } } });
  },
  async create(data: CreateSensorDTO, crop: Crop) {
    return repo.create({ ...data, territorio: crop});
  },
  async save(sensor: Sensor) {
    return repo.save(sensor);
  },
  async delete(id: number) {
    return repo.delete(id);
  },
};
