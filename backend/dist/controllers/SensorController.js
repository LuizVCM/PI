"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorController = void 0;
const SensorService_1 = require("../services/SensorService");
class SensorController {
    sensorService = new SensorService_1.SensorService();
    async listAll(req, res, next) {
        try {
            const sensors = await this.sensorService.listAll();
            return res.json(sensors);
        }
        catch (error) {
            next(error);
        }
    }
    async getById(req, res, next) {
        try {
            const id = Number(req.params.id);
            const loggedUser = req.user.id;
            const sensor = await this.sensorService.getById(id, loggedUser);
            return res.json(sensor);
        }
        catch (error) {
            next(error);
        }
    }
    async listMySensors(req, res, next) {
        try {
            const id = req.user.id;
            const sensors = await this.sensorService.listByUserLogged(id);
            return res.status(200).json(sensors);
        }
        catch (error) {
            next(error);
        }
    }
    async listByTerritoryId(req, res, next) {
        try {
            const id = Number(req.params.id);
            const loggedUser = req.user.id;
            const sensors = await this.sensorService.listByTerritoryId(id, loggedUser);
            return res.status(200).json(sensors);
        }
        catch (error) {
            next(error);
        }
    }
    async create(req, res, next) {
        try {
            const loggedUser = req.user.id;
            const territoryId = Number(req.params.id);
            const createSensorData = req.body;
            const sensor = await this.sensorService.create(createSensorData, territoryId, loggedUser);
            return res.status(201).json(sensor);
        }
        catch (error) {
            next(error);
        }
    }
    async update(req, res, next) {
        try {
            const id = Number(req.params.id);
            const loggedUser = req.user.id;
            const updateSensorData = req.body;
            const sensor = await this.sensorService.update(id, updateSensorData, loggedUser);
            return res.json(sensor);
        }
        catch (error) {
            next(error);
        }
    }
    async delete(req, res, next) {
        try {
            const loggedUser = req.user.id;
            const id = Number(req.params.id);
            await this.sensorService.delete(id, loggedUser);
            return res.sendStatus(204);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.SensorController = SensorController;
