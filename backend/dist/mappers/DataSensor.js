"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataSensorMapper = void 0;
class DataSensorMapper {
    static toResponse(data) {
        return {
            id: data.id,
            valor: data.valor,
            unidade: data.sensor.getUnidade(),
            dataLeitura: data.dataLeitura,
            sensor: data.sensor,
        };
    }
    static toSummaryResponse(data) {
        return {
            id: data.id,
            valor: data.valor,
            unidade: data.sensor.getUnidade(),
            dataLeitura: data.dataLeitura,
        };
    }
    static toResponseList(dataList) {
        return dataList.map((data) => DataSensorMapper.toResponse(data));
    }
    static toSummaryResponseList(dataList) {
        return dataList.map((data) => DataSensorMapper.toSummaryResponse(data));
    }
}
exports.DataSensorMapper = DataSensorMapper;
