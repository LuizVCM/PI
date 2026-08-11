import { Sensor } from "../models/Sensor";
import { Crop } from "../models/Territory";
import { CreateSensorDTO } from "../schemas/sensor.schema";
import { createBaseRepository } from "./BaseRepository";

const base = createBaseRepository(Sensor);

export const SensorRepository = {
  ...base,

  async findByCropId(cropId: number): Promise<Sensor[]> {
    return base.getRepository().find({
      where: { territorio: { id: cropId } },
    });
  },

  async findByUserId(userId: number): Promise<Sensor[]> {
    return base
      .getRepository()
      .find({ where: { territorio: { usuario: { id: userId } } } });
  },

  async create(data: CreateSensorDTO, crop: Crop): Promise<Sensor> {
    const sensor = base.create({ ...data, territorio: crop });
    return base.save(sensor);
  },
};