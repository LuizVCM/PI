import { AppDataSource } from "../config/data-source";
import { DataSensor } from "../models/DataSensor";
import { Sensor } from "../models/Sensor";
import { CreateDataSensorDTO } from "../schemas/data-sensor.schema";

const repo = AppDataSource.getRepository(DataSensor);

export const DataSensorRepository = {
  async findAll() {
    return repo.find();
  },
  async findById(id: number) {
    return repo.findOne({ where: { id } });
  },
  async findBySensorId(sensorId: number) {
    return repo.findOne({
      where: { sensor: { id: sensorId } },
      relations: { sensor: true },
    });
  },
  async create(data: CreateDataSensorDTO, sensor: Sensor) {
    const dataSensor = repo.create({ ...data, sensor: sensor });
    return repo.save(dataSensor);
  },
  async save(data: DataSensor) {
    return repo.save(data);
  },
  async delete(id: number) {
    return repo.softDelete(id);
  }
};
