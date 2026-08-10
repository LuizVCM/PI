import { SensorRepository } from "../repositories/SensorRepository";
import { NotFoundError } from "../errors/NotFoundError";
import { CreateSensorDTO, UpdateSensorDTO } from "../schemas/sensor.schema";
import { CropRepository } from "../repositories/CropRepository";
import { ForbiddenError } from "../errors/ForbiddenError";

export class SensorService {
  async listAll() {
    return await SensorRepository.findAll();
  }

  async getById(id: number) {
    const sensor = await SensorRepository.findById(id);

    if (!sensor) {
      throw new NotFoundError("Sensor não encontrado");
    }
    return sensor;
  }
  async listMySensors(cropId: number) {
    return SensorRepository.findByCropId(cropId);
  }
  async create(data: CreateSensorDTO, cropId: number) {
    const territorio = await CropRepository.findById(cropId);
    if (!territorio) {
      throw new NotFoundError("Território não encontrado");
    }
    return await SensorRepository.create(data, territorio);
  }

    async update(id: number, data: UpdateSensorDTO, loggedUserId: number) {
      const sensor = await SensorRepository.findById(id);
  
      if (!sensor) {
        throw new NotFoundError("Semente não encontrada");
      }
      if (sensor.territorio.usuario.id !== loggedUserId) {
        throw new ForbiddenError(
          "Você não tem permissão para alterar e acessar esses dados"
        );
      }
      Object.assign(
        sensor,
        Object.fromEntries(
          Object.entries(data).filter(([, value]) => value !== undefined)
        )
      );
  
      const sensorUpdated = await SensorRepository.save(sensor);
      return sensorUpdated;
    }
  
  async delete(id: number) {
    const sensor = await SensorRepository.softDelete(id);

    if (sensor.affected === 0) {
      throw new NotFoundError("não foi encontrado o sensor");
    }
  }
}