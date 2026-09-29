"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherMapper = void 0;
const TerritoryMapper_1 = require("./TerritoryMapper");
class WeatherMapper {
    static toResponse(weather) {
        return {
            id: weather.id,
            data: weather.data,
            temperaturaMinima: weather.temperaturaMinima,
            temperaturaMaxima: weather.temperaturaMaxima,
            precipitacao: weather.precipitacao,
            velocidadeVentoMaxima: weather.velocidadeVentoMaxima,
            evapotranspiracao: weather.evapotranspiracao ?? "evapotranspiração indisponível",
            territorio: weather.territorio
                ? TerritoryMapper_1.TerritoryMapper.toSummaryResponse(weather.territorio)
                : "território indisponível",
        };
    }
    static toSummaryResponse(weather) {
        return {
            id: weather.id,
            data: weather.data,
            temperaturaMinima: weather.temperaturaMinima,
            temperaturaMaxima: weather.temperaturaMaxima,
            precipitacao: weather.precipitacao,
            velocidadeVentoMaxima: weather.velocidadeVentoMaxima,
            evapotranspiracao: weather.evapotranspiracao ?? "evapotranspiração indisponível",
        };
    }
    static toResponseList(weatherList) {
        return weatherList.map((weather) => WeatherMapper.toResponse(weather));
    }
    static toSummaryResponseList(weatherList) {
        return weatherList.map((weather) => WeatherMapper.toSummaryResponse(weather));
    }
}
exports.WeatherMapper = WeatherMapper;
