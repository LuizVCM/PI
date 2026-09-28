"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlantController = void 0;
const PlantService_1 = require("../services/PlantService");
class PlantController {
    plantService = new PlantService_1.PlantService();
    async listAll(req, res, next) {
        try {
            const plants = await this.plantService.listAll();
            return res.status(200).json(plants);
        }
        catch (error) {
            next(error);
        }
    }
    async getById(req, res, next) {
        try {
            const id = Number(req.params.id);
            const plant = await this.plantService.getById(id);
            return res.status(200).json(plant);
        }
        catch (error) {
            next(error);
        }
    }
    async listBySeedId(req, res, next) {
        try {
            const id = Number(req.params.id);
            const loggedUser = req.user.id;
            const plants = await this.plantService.getPlantBySeedId(id, loggedUser);
            return res.status(200).json(plants);
        }
        catch (error) {
            next(error);
        }
    }
    async listByUserLogged(req, res, next) {
        try {
            const id = req.user.id;
            const plants = await this.plantService.listUsedByUser(id);
            return res.status(200).json(plants);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.PlantController = PlantController;
