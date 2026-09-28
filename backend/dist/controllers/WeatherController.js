"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherController = void 0;
const WeatherService_1 = require("../services/WeatherService");
class WeatherController {
    weatherService = new WeatherService_1.WeatherService();
    async listAll(req, res, next) {
        try {
            const weatherData = await this.weatherService.listAll();
            return res.json(weatherData);
        }
        catch (error) {
            next(error);
        }
    }
    async getById(req, res, next) {
        try {
            const id = Number(req.params.id);
            const loggedUser = req.user.id;
            const weatherData = await this.weatherService.getById(id, loggedUser);
            return res.json(weatherData);
        }
        catch (error) {
            next(error);
        }
    }
    async listMyWeathers(req, res, next) {
        try {
            const loggedUser = req.user.id;
            const myWeathers = await this.weatherService.listByUserLogged(loggedUser);
            return res.status(200).json(myWeathers);
        }
        catch (error) {
            next(error);
        }
    }
    async listByTerritoryId(req, res, next) {
        try {
            const id = Number(req.params.id);
            const loggedUser = req.user.id;
            const weatherData = await this.weatherService.findByTerritoryId(id, loggedUser);
            return res.status(200).json(weatherData);
        }
        catch (error) {
            next(error);
        }
    }
    async create(req, res, next) {
        try {
            const loggedUser = req.user.id;
            const id = Number(req.params.id);
            const createWeatherData = req.body;
            const weatherData = await this.weatherService.create(createWeatherData, id, loggedUser);
            return res.status(201).json(weatherData);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.WeatherController = WeatherController;
