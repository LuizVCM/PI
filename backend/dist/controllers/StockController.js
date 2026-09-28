"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockController = void 0;
const StockService_1 = require("../services/StockService");
class StockController {
    stockService = new StockService_1.StockService();
    async listAll(req, res, next) {
        try {
            const stocks = await this.stockService.listAll();
            return res.json(stocks);
        }
        catch (error) {
            next(error);
        }
    }
    async getById(req, res, next) {
        try {
            const id = Number(req.params.id);
            const loggedUser = req.user.id;
            const stock = await this.stockService.getById(id, loggedUser);
            return res.json(stock);
        }
        catch (error) {
            next(error);
        }
    }
    async listMyStock(req, res, next) {
        try {
            const id = req.user.id;
            const stocks = await this.stockService.listByUserLogged(id);
            return res.status(200).json(stocks);
        }
        catch (error) {
            next(error);
        }
    }
    async create(req, res, next) {
        try {
            const loggedUser = req.user.id;
            const createStockData = req.body;
            const stock = await this.stockService.create(createStockData, loggedUser);
            return res.status(201).json(stock);
        }
        catch (error) {
            next(error);
        }
    }
    async update(req, res, next) {
        try {
            const id = Number(req.params.id);
            const loggedUser = req.user.id;
            const updateStockData = req.body;
            const stock = await this.stockService.update(id, updateStockData, loggedUser);
            return res.json(stock);
        }
        catch (error) {
            next(error);
        }
    }
    async delete(req, res, next) {
        try {
            const id = Number(req.params.id);
            const loggedUser = req.user.id;
            await this.stockService.delete(id, loggedUser);
            return res.sendStatus(204);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.StockController = StockController;
