import { SensorRepository } from "../repositories/SensorRepository";
import { NotFoundError } from "../errors/NotFoundError";
import { CreateSensorDTO, UpdateSensorDTO } from "../schemas/sensor.schema";
import { TerritoryRepository } from "../repositories/TerritoryRepository";
import { AuthorizationService } from "./AuthorizationService";

export class SensorService {
  private repo = new SensorRepository();
  private territoryRepo = new TerritoryRepository();
  async listAll() {
    return await this.repo.base.findAll();
  }

  async getById(id: number) {
    const sensor = await this.repo.base.findById(id);

    if (!sensor) {
      throw new NotFoundError("sensor");
    }
    return sensor;
  }
  async listByTerritoryId(territoryId: number) {
    const sensors = await this.repo.findByTerritoryId(territoryId);

    if (!sensors) {
      throw new NotFoundError(
        "sensor",
        "nenhum sensor encontrado para esse território"
      );
    }
    return sensors;
  }
  async listByUserLogged(userId: number) {
    const sensors = await this.repo.findByUserId(userId);
    return sensors;
  }
  async create(data: CreateSensorDTO, territoryId: number) {
    const territory = await this.territoryRepo.base.findById(territoryId);
    if (!territory) {
      throw new NotFoundError("território");
    }
    return await this.repo.create(data, territory);
  }

  async update(id: number, data: UpdateSensorDTO, loggedUserId: number) {
    const sensor = await this.repo.base.findById(id);
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

    const sensorUpdated = await this.repo.base.save(sensor);
    return sensorUpdated;
  }

  async delete(id: number, loggedUserId: number) {
    const sensor = await this.repo.base.findById(id);

    if (!sensor) {
      throw new NotFoundError("sensor");
    }

    AuthorizationService.ensureOwnership(
      sensor.territorio,
      loggedUserId,
      "sensores"
    );

    const result = await this.repo.base.softDelete(id);

    if (result.affected === 0) {
      throw new NotFoundError("sensor");
    }
  }
}