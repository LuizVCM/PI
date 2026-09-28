"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TerritoryController = void 0;
const TerritoryService_1 = require("../services/TerritoryService");
class TerritoryController {
    territoryService = new TerritoryService_1.TerritoryService();
    async listAll(req, res, next) {
        try {
            const territories = await this.territoryService.listAll();
            return res.json(territories);
        }
        catch (error) {
            next(error);
        }
    }
    async getById(req, res, next) {
        try {
            const id = Number(req.params.id);
            const loggedUser = req.user.id;
            const territory = await this.territoryService.getById(id, loggedUser);
            return res.json(territory);
        }
        catch (error) {
            next(error);
        }
    }
    async listMyTerritories(req, res, next) {
        try {
            const id = req.user.id;
            const myTerritories = await this.territoryService.listByUserLogged(id);
            return res.status(200).json(myTerritories);
        }
        catch (error) {
            next(error);
        }
    }
    async create(req, res, next) {
        try {
            const id = req.user.id;
            const createTerritoryData = req.body;
            const territory = await this.territoryService.create(createTerritoryData, id);
            return res.status(201).json(territory);
        }
        catch (error) {
            next(error);
        }
    }
    async update(req, res, next) {
        try {
            const id = Number(req.params.id);
            const loggedUser = req.user.id;
            const updateTerritoryData = req.body;
            const territory = await this.territoryService.update(id, updateTerritoryData, loggedUser);
            return res.json(territory);
        }
        catch (error) {
            next(error);
        }
    }
    async delete(req, res, next) {
        try {
            const id = Number(req.params.id);
            const loggedUser = req.user.id;
            await this.territoryService.delete(id, loggedUser);
            return res.sendStatus(204);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.TerritoryController = TerritoryController;
