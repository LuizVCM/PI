import { SensorData } from "../models/SensorData";
import { SensorMapper } from "./SensorMapper";

export class SensorDataMapper {
  static toResponse(data: SensorData) {
    return {
      id: data.id,
      configuracoes: data.configuracoes,
      dataLeitura: data.dataLeitura,
      sensor: SensorMapper.toSummaryResponse(data.sensor),
    };
  }
  static toSummaryResponse(data: SensorData) {
    return {
      id: data.id,
      configuracoes: data.configuracoes,
      dataLeitura: data.dataLeitura,
    };
  }
  static toResponseList(dataList: SensorData[]) {
    return dataList.map((data) => SensorDataMapper.toResponse(data));
  }
  static toSummaryResponseList(dataList: SensorData[]) {
    return dataList.map((data) => SensorDataMapper.toSummaryResponse(data));
  }
}