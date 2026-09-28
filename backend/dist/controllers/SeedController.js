"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedController = void 0;
const SeedService_1 = require("../services/SeedService");
class SeedController {
    seedService = new SeedService_1.SeedService();
    async listAll(req, res, next) {
        try {
            const seeds = await this.seedService.listAll();
            return res.json(seeds);
        }
        catch (error) {
            next(error);
        }
    }
    async getById(req, res, next) {
        try {
            const id = Number(req.params.id);
            const loggedUser = req.user.id;
            const seed = await this.seedService.getById(id, loggedUser);
            return res.json(seed);
        }
        catch (error) {
            next(error);
        }
    }
    async listMySeeds(req, res, next) {
        try {
            const id = req.user.id;
            const seeds = await this.seedService.listByUserLogged(id);
            return res.status(200).json(seeds);
        }
        catch (error) {
            next(error);
        }
    }
    async create(req, res, next) {
        try {
            const id = req.user.id;
            const createSeedData = req.body;
            const seed = await this.seedService.create(createSeedData, id);
            return res.status(201).json(seed);
        }
        catch (error) {
            next(error);
        }
    }
    async update(req, res, next) {
        try {
            const id = Number(req.params.id);
            const loggedUser = req.user.id;
            const updateSeedData = req.body;
            const seed = await this.seedService.update(id, updateSeedData, loggedUser);
            return res.json(seed);
        }
        catch (error) {
            next(error);
        }
    }
    async delete(req, res, next) {
        try {
            const id = Number(req.params.id);
            const loggedUser = req.user.id;
            await this.seedService.delete(id, loggedUser);
            return res.sendStatus(204);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.SeedController = SeedController;
