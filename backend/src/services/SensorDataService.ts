import { NotFoundError } from "../errors/NotFoundError";
import { AuthorizationService } from "./AuthorizationService";
import { SensorDataMapper } from "../mappers/SensorDataMapper";
import { SensorDataRepository } from "../repositories/SensorDataRepository";
import { SensorRepository } from "../repositories/SensorRepository";
import { CreateSensorDataDTO } from "../schemas/sensor-data.schema";

export class SensorDataService {
  private repo = new SensorDataRepository();
  private sensorRepo = new SensorRepository();

  async getById(id: number, loggedUserId: number) {
    const data = await this.repo.findByIdWithRelation(id);
    if (!data) {
      throw new NotFoundError("dados do sensor");
    }
    AuthorizationService.ensureRelationActive(
      data.sensor,
      "dados do sensor",
      "sensor"
    );
    AuthorizationService.ensureRelationActive(
      data.sensor.territorio,
      "sensor",
      "território"
    );
    AuthorizationService.ensureOwnership(
      data.sensor.territorio,
      loggedUserId,
      "sensor"
    );
    return SensorDataMapper.toResponse(data);
  }
  async getLatestBySensor(sensorId: number, loggedUserId: number) {
    const sensor = await this.sensorRepo.findByIdWithRelations(sensorId);
    if (!sensor) {
      throw new NotFoundError("sensor");
    }
    AuthorizationService.ensureRelationActive(
      sensor.territorio,
      "sensor",
      "território"
    );
    AuthorizationService.ensureOwnership(
      sensor.territorio,
      loggedUserId,
      "sensor"
    );
    const data = await this.repo.findLatestBySensorId(sensorId);
    if (!data) {
      throw new NotFoundError("dados do sensor");
    }
    return SensorDataMapper.toResponse(data);
  }
  async listBySensor(sensorId: number, loggedUserId: number) {
    const sensor = await this.sensorRepo.findByIdWithRelations(sensorId);
    if (!sensor) {
      throw new NotFoundError("sensor");
    }
    AuthorizationService.ensureRelationActive(
      sensor.territorio,
      "sensor",
      "território"
    );
    AuthorizationService.ensureOwnership(
      sensor.territorio,
      loggedUserId,
      "sensor"
    );
    const data = await this.repo.findBySensorId(sensorId);
    return SensorDataMapper.toResponseList(data);
  }
  async create(
    data: CreateSensorDataDTO,
    sensorId: number,
    loggedUserId: number
  ) {
    const sensor = await this.sensorRepo.findByIdWithRelations(sensorId);
    if (!sensor) {
      throw new NotFoundError("sensor");
    }
    AuthorizationService.ensureRelationActive(
      sensor.territorio,
      "sensor",
      "território"
    );
    AuthorizationService.ensureOwnership(
      sensor.territorio,
      loggedUserId,
      "sensor"
    );
    const sensorData = await this.repo.create(data, sensor);
    return SensorDataMapper.toResponse(sensorData);
  }
}
