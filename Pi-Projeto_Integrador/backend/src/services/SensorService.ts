import { SensorRepository } from "../repositories/SensorRepository";
import { NotFoundError } from "../errors/NotFoundError";
import { CreateSensorDTO, UpdateSensorDTO } from "../schemas/sensor.schema";
import { TerritoryRepository } from "../repositories/TerritoryRepository";
import { AuthorizationService } from "./AuthorizationService";

export class SensorService {
  async listAll() {
    return await SensorRepository.findAll();
  }

  async getById(id: number) {
    const sensor = await SensorRepository.findById(id);

    if (!sensor) {
      throw new NotFoundError("sensor");
    }
    return sensor;
  }
  async listByTerritoryId(territoryId: number) {
    const sensors = await SensorRepository.findByTerritoryId(territoryId);

    if (!sensors) {
      throw new NotFoundError(
        "sensor",
        "nenhum sensor encontrado para esse território"
      );
    }
    return sensors;
  }
  async listByUserLogged(userId: number) {
    const sensors = await SensorRepository.findByUserId(userId);
    if (!sensors) {
      throw new NotFoundError(
        "sensor",
        "nenhum sensor encontrado para esse usuário"
      );
    }
    return sensors;
  }
  async create(data: CreateSensorDTO, territoryId: number) {
    const territory = await TerritoryRepository.findById(territoryId);
    if (!territory) {
      throw new NotFoundError("território");
    }
    return await SensorRepository.create(data, territory);
  }

  async update(id: number, data: UpdateSensorDTO, loggedUserId: number) {
    const sensor = await SensorRepository.findById(id);
    if (!sensor) {
      throw new NotFoundError("sensor");
    }

    AuthorizationService.ensureOwnership(
      sensor.territorio,
      loggedUserId,
      "sensores"
    );

    Object.assign(
      sensor,
      Object.fromEntries(
        Object.entries(data).filter(([, value]) => value !== undefined)
      )
    );

    const sensorUpdated = await SensorRepository.save(sensor);
    return sensorUpdated;
  }

  async delete(id: number, loggedUserId: number) {
    const sensor = await SensorRepository.findById(id);

    if (!sensor) {
      throw new NotFoundError("sensor");
    }

    AuthorizationService.ensureOwnership(
      sensor.territorio,
      loggedUserId,
      "sensores"
    );

    const result = await SensorRepository.softDelete(id);

    if (result.affected === 0) {
      throw new NotFoundError("sensor");
    }
  }
}