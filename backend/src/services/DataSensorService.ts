import { NotFoundError } from "../errors/NotFoundError";
import { DataSensorMapper } from "../mappers/DataSensor";
import { DataSensorRepository } from "../repositories/DataSensorRepository";
import { SensorRepository } from "../repositories/SensorRepository";
import { CreateDataSensorDTO } from "../schemas/data-sensor.schema";

export class DataSensorService {
  private repo = new DataSensorRepository();
  private sensorRepo = new SensorRepository();
  async getById(id: number) {
    const data = await this.repo.findByIdWithRelation(id);
    if (!data) {
      throw new NotFoundError("dados do sensor");
    }
    return DataSensorMapper.toResponse(data);
  }
  async listBySensor(sensorId: number) {
    const data = await this.repo.findBySensorId(sensorId);
    if (!data) {
      throw new NotFoundError("dados do sensor");
    }
    return DataSensorMapper.toResponseList(data);
  }
  async create(data: CreateDataSensorDTO, sensorId: number) {
    const sensor = await this.sensorRepo.findByIdWithRelations(sensorId);
    if (!sensor) {
      throw new NotFoundError("sensor");
    }
    const dataSensor = await this.repo.create(data, sensor);
    return DataSensorMapper.toResponse(dataSensor);
  }
}