import { Sensor } from "../models/Sensor";
import { Territory } from "../models/Territory";
import { CreateSensorDTO } from "../schemas/sensor.schema";
import { createBaseRepository } from "./BaseRepository";

export class SensorRepository {
  public base = createBaseRepository(Sensor);
  async findByTerritoryId(territoryId: number): Promise<Sensor[]> {
    return this.base.getRepository().find({
      where: { territorio: { id: territoryId } },
    });
  }
  async findByUserId(userId: number): Promise<Sensor[]> {
    return this.base
      .getRepository()
      .find({ where: { territorio: { usuario: { id: userId } } } });
  }
  async create(data: CreateSensorDTO, territory: Territory): Promise<Sensor> {
    const sensor = this.base.create({ ...data, territorio: territory });
    return this.base.save(sensor);
  }
}