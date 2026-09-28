"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorMapper = void 0;
const DataSensor_1 = require("./DataSensor");
const TerritoryMapper_1 = require("./TerritoryMapper");
class SensorMapper {
    static toResponse(sensor) {
        return {
            id: sensor.id,
            modelo: sensor.modelo,
            tipo: sensor.tipo,
            unidade: sensor.getUnidade(),
            territorios: sensor.territorio
                ? TerritoryMapper_1.TerritoryMapper.toSummaryResponse(sensor.territorio)
                : "indisponível",
            dados: sensor.dados
                ? DataSensor_1.DataSensorMapper.toSummaryResponseList(sensor.dados)
                : "sem dados",
        };
    }
    static toSummaryResponse(sensor) {
        return {
            id: sensor.id,
            modelo: sensor.modelo,
            tipo: sensor.tipo,
            unidade: sensor.getUnidade(),
        };
    }
    static toResponseList(sensorList) {
        return sensorList.map((sensor) => SensorMapper.toResponse(sensor));
    }
    static toSummaryResponseList(sensorList) {
        return sensorList.map((sensor) => SensorMapper.toSummaryResponse(sensor));
    }
}
exports.SensorMapper = SensorMapper;
