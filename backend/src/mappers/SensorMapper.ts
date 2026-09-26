import { Sensor } from "./../models/Sensor";
import { SensorDataMapper } from "./SensorDataMapper";
import { TerritoryMapper } from "./TerritoryMapper";

export class SensorMapper {
  static toResponse(sensor: Sensor) {
    return {
      id: sensor.id,
      modelo: sensor.modelo,
      tipo: sensor.tipo,
      unidade: sensor.getUnidade(),
      territorio: sensor.territorio
        ? TerritoryMapper.toSummaryResponse(sensor.territorio)
        : "indisponível",
      dados: sensor.dados
        ? SensorDataMapper.toSummaryResponseList(sensor.dados)
        : "sem dados",
    };
  }
  static toSummaryResponse(sensor: Sensor) {
    return {
      id: sensor.id,
      modelo: sensor.modelo,
      tipo: sensor.tipo,
      unidade: sensor.getUnidade(),
      territorio: TerritoryMapper.toSummaryResponse(sensor.territorio)
    };
  }
  static toResponseList(sensorList: Sensor[]) {
    return sensorList.map((sensor) => SensorMapper.toResponse(sensor));
  }
  static toSummaryResponseList(sensorList: Sensor[]) {
    return sensorList.map((sensor) => SensorMapper.toSummaryResponse(sensor));
  }
}