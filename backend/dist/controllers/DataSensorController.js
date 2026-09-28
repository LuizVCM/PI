"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataSensorController = void 0;
const DataSensorService_1 = require("../services/DataSensorService");
class DataSensorController {
    dataSensorService = new DataSensorService_1.DataSensorService();
    async getById(req, res, next) {
        try {
            const id = Number(req.params.id);
            const loggedUser = req.user.id;
            const data = await this.dataSensorService.getById(id, loggedUser);
            return res.json(data);
        }
        catch (error) {
            next(error);
        }
    }
    async listBySensor(req, res, next) {
        try {
            const id = Number(req.params.id);
            const loggedUser = req.user.id;
            const data = await this.dataSensorService.listBySensor(id, loggedUser);
            return res.status(200).json(data);
        }
        catch (error) {
            next(error);
        }
    }
    async create(req, res, next) {
        try {
            const id = Number(req.params.id);
            const loggedUser = req.user.id;
            const createDataSensor = req.body;
            const data = await this.dataSensorService.create(createDataSensor, id, loggedUser);
            return res.status(201).json(data);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.DataSensorController = DataSensorController;
