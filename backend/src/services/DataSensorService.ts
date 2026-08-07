import { NotFoundError } from "../errors/NotFoundError";
import { DataSensorRepository } from "../repositories/DataSensorRepository";
import { SensorRepository } from "../repositories/SensorRepository";
import { CreateDataSensorDTO } from "../schemas/data-sensor.schema";

export class DataSensorService {
  async listAll() {
    return await DataSensorRepository.findAll();
  }
  async getById(id: number) {
    const data = await DataSensorRepository.findById(id);
    if (!data) {
      throw new NotFoundError("dados do sensor");
    }
    return data;
  }
  async listBySensor(sensorId: number) {
    const data = await DataSensorRepository.findBySensorId(sensorId);
    if (!data) {
      throw new NotFoundError("dados do sensor");
    }
  }
  async create(data: CreateDataSensorDTO, sensorId: number) {
    const sensor = await SensorRepository.findById(sensorId);
    if (!sensor) {
      throw new NotFoundError("sensor");
    }
    return await DataSensorRepository.create(data, sensor);
  }
}
