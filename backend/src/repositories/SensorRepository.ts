import { Sensor } from "../models/Sensor";
import { Crop } from "../models/Crop";
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

  create(data: CreateSensorDTO, crop: Crop): Promise<Sensor> {
    const sensor = base.create({ ...data, territorio: crop });
    return base.save(sensor);
  },
};