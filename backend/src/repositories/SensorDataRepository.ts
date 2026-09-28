import { SensorData } from "../models/SensorData";
import { Sensor } from "../models/Sensor";
import { CreateSensorDataDTO } from "../schemas/sensor-data.schema";
import { createBaseRepository } from "./BaseRepository";

export class SensorDataRepository {
  public base = createBaseRepository(SensorData);
  async findBySensorId(sensorId: number): Promise<SensorData[]> {
    return this.base.findAll({
      where: { sensor: { id: sensorId } },
      relations: { sensor: { territorio: true } },
    });
  }
  async findByIdWithRelation(id: number) {
    return this.base.findById(id, {
      relations: {
        sensor: {
          territorio: {
            usuario: true,
          },
        },
      },
    });
  }
  async findLatestBySensorId(sensorId: number): Promise<SensorData | null> {
    return this.base.findOne({
      where: {
        sensor: {
          id: sensorId,
        },
      },
      relations: {
        sensor: { territorio: true },
      },
      order: {
        dataLeitura: "DESC",
      },
    });
  }
  async create(data: CreateSensorDataDTO, sensor: Sensor): Promise<SensorData> {
    const SensorData = this.base.create({ ...data, sensor });
    return this.base.save(SensorData);
  }
}
