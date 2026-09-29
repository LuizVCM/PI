"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherService = void 0;
const WeatherRepository_1 = require("../repositories/WeatherRepository");
const TerritoryRepository_1 = require("../repositories/TerritoryRepository");
const NotFoundError_1 = require("../errors/NotFoundError");
const UserRepository_1 = require("../repositories/UserRepository");
const WeatherMapper_1 = require("../mappers/WeatherMapper");
const AuthorizationService_1 = require("./AuthorizationService");
const ConflictError_1 = require("../errors/ConflictError");
class WeatherService {
    repo = new WeatherRepository_1.WeatherRepository();
    userRepo = new UserRepository_1.UserRepository();
    territoryRepo = new TerritoryRepository_1.TerritoryRepository();
    async listAll() {
        const weatherData = await this.repo.findAllWithTerritory();
        return WeatherMapper_1.WeatherMapper.toResponseList(weatherData);
    }
    async getById(id, loggedUserId) {
        const weatherData = await this.repo.findByIdWithTeritory(id);
        if (!weatherData) {
            throw new NotFoundError_1.NotFoundError("registro climático");
        }
        AuthorizationService_1.AuthorizationService.ensureRelationActive(weatherData.territorio, "registro climático", "território");
        AuthorizationService_1.AuthorizationService.ensureOwnership(weatherData.territorio, loggedUserId, "registro climático");
        return WeatherMapper_1.WeatherMapper.toResponse(weatherData);
    }
    async findByTerritoryId(territoryId, loggedUserId) {
        const territory = await this.territoryRepo.base.findById(territoryId);
        if (!territory) {
            throw new NotFoundError_1.NotFoundError("território");
        }
        AuthorizationService_1.AuthorizationService.ensureOwnership(territory, loggedUserId, "território");
        const weatherData = await this.repo.findByTerritoryId(territoryId);
        return WeatherMapper_1.WeatherMapper.toResponseList(weatherData);
    }
    async listByUserLogged(userId) {
        const user = await this.userRepo.base.findById(userId);
        if (!user) {
            throw new NotFoundError_1.NotFoundError("usuário");
        }
        const weatherData = await this.repo.findAllByUserId(userId);
        return WeatherMapper_1.WeatherMapper.toResponseList(weatherData);
    }
    async create(data, territoryId, loggedUserId) {
        const territory = await this.territoryRepo.findByIdWithUser(territoryId);
        if (!territory) {
            throw new NotFoundError_1.NotFoundError("território");
        }
        const conflict = await this.repo.findConflicts(territoryId);
        if (conflict) {
            throw new ConflictError_1.ConflictError({ fields: ["data"], message: "Já poosui registro para o dia atual" });
        }
        AuthorizationService_1.AuthorizationService.ensureOwnership(territory, loggedUserId, "território");
        const weatherData = {
            data: data.daily.time[0],
            temperaturaMaxima: data.daily.temperature_2m_max[0],
            temperaturaMinima: data.daily.temperature_2m_min[0],
            precipitacao: data.daily.precipitation_sum[0],
            velocidadeVentoMaxima: data.daily.wind_speed_10m_max[0],
            evapotranspiracao: data.daily.et0_fao_evapotranspiration[0],
        };
        const weather = await this.repo.create(weatherData, territory);
        return WeatherMapper_1.WeatherMapper.toResponse(weather);
    }
}
exports.WeatherService = WeatherService;
