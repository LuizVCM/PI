"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CropController = void 0;
const CropService_1 = require("./../services/CropService");
class CropController {
    cropService = new CropService_1.CropService();
    async listAll(req, res, next) {
        try {
            const crops = await this.cropService.listAll();
            return res.json(crops);
        }
        catch (error) {
            next(error);
        }
    }
    async getById(req, res, next) {
        try {
            const id = Number(req.params.id);
            const loggedUser = req.user.id;
            const crop = await this.cropService.getById(id, loggedUser);
            return res.json(crop);
        }
        catch (error) {
            next(error);
        }
    }
    async listMyCrops(req, res, next) {
        try {
            const id = req.user.id;
            const myCrops = await this.cropService.listByUserLogged(id);
            return res.status(200).json(myCrops);
        }
        catch (error) {
            next(error);
        }
    }
    async create(req, res, next) {
        try {
            const loggedUser = req.user.id;
            const territoryId = Number(req.params.id);
            const createCropData = req.body;
            const crop = await this.cropService.create(createCropData, territoryId, loggedUser);
            return res.status(201).json(crop);
        }
        catch (error) {
            next(error);
        }
    }
    async update(req, res, next) {
        try {
            const id = Number(req.params.id);
            const loggedUser = req.user.id;
            const updateCropData = req.body;
            const crop = await this.cropService.update(id, updateCropData, loggedUser);
            return res.json(crop);
        }
        catch (error) {
            next(error);
        }
    }
    async delete(req, res, next) {
        try {
            const id = Number(req.params.id);
            const loggedUser = req.user.id;
            await this.cropService.delete(id, loggedUser);
            return res.sendStatus(204);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.CropController = CropController;
