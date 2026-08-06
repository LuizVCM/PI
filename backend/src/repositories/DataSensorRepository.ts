import { DataSensor } from "../models/DataSensor";
import { Sensor } from "../models/Sensor";
import { CreateDataSensorDTO } from "../schemas/data-sensor.schema";
import { createBaseRepository } from "./BaseRepository";

const base = createBaseRepository(DataSensor);

export const DataSensorRepository = {
  ...base,

  async findBySensorId(sensorId: number): Promise<DataSensor | null> {
    return base.findOne({
      where: { sensor: { id: sensorId } },
      relations: { sensor: true },
    });
  },

  async create(data: CreateDataSensorDTO, sensor: Sensor): Promise<DataSensor> {
    const dataSensor = base.create({ ...data, sensor });
    return base.save(dataSensor);
  },
};