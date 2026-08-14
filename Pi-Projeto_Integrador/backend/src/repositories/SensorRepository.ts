import { Sensor } from "../models/Sensor";
import { Territory } from "../models/Territory";
import { CreateSensorDTO } from "../schemas/sensor.schema";
import { createBaseRepository } from "./BaseRepository";

const base = createBaseRepository(Sensor);

export const SensorRepository = {
  ...base,

  async findByTerritoryId(territoryId: number): Promise<Sensor[]> {
    return base.getRepository().find({
      where: { territorio: { id: territoryId } },
    });
  },

  async findByUserId(userId: number): Promise<Sensor[]> {
    return base
      .getRepository()
      .find({ where: { territorio: { usuario: { id: userId } } } });
  },

  async create(data: CreateSensorDTO, territory: Territory): Promise<Sensor> {
    const sensor = base.create({ ...data, territorio: territory });
    return base.save(sensor);
  },
};