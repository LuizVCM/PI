import { SensorRepository } from "../repositories/SensorRepository";
import { NotFoundError } from "../errors/NotFoundError";
import { CreateSensorDTO } from "../schemas/sensor.schema";
import { CropRepository } from "../repositories/CropRepository";

export class SensorService {
  async listAll() {
    return await SensorRepository.findAll();
  }

  async getById(id: number) {
    const sensor = await SensorRepository.findById(id);

    if (!sensor) {
      throw new NotFoundError("Sensor nhão encontrado!!");
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
  
  async delete(id: number) {
    const sensor = await SensorRepository.softDelete(id);

    if (sensor.affected === 0) {
      throw new NotFoundError("não foi encontrado o sensor");
    }
  }
}