import { NotFoundError } from "../errors/NotFoundError";
import { DataSensorRepository } from "../repositories/DataSensorRepository";
import { SensorRepository } from "../repositories/SensorRepository";
import { CreateDataSensorDTO } from "../schemas/data-sensor.schema";

export class DataSensorService {
  private repo = new DataSensorRepository();
  private sensorRepo = new SensorRepository();
  async listAll() {
    return await this.repo.base.findAll();
  }
  async getById(id: number) {
    const data = await this.repo.base.findById(id);
    if (!data) {
      throw new NotFoundError("dados do sensor");
    }
    return data;
  }
  async listBySensor(sensorId: number) {
    const data = await this.repo.findBySensorId(sensorId);
    if (!data) {
      throw new NotFoundError("dados do sensor");
    }
    return data;
  }
  async create(data: CreateDataSensorDTO, sensorId: number) {
    const sensor = await this.sensorRepo.base.findById(sensorId);
    if (!sensor) {
      throw new NotFoundError("sensor");
    }
    return await this.repo.create(data, sensor);
  }
}