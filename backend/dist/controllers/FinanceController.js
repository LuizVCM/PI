"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinanceController = void 0;
const FinanceService_1 = require("../services/FinanceService");
class FinanceController {
    financeService = new FinanceService_1.FinanceService();
    async listAll(req, res, next) {
        try {
            const finances = await this.financeService.listAll();
            return res.json(finances);
        }
        catch (error) {
            next(error);
        }
    }
    async getById(req, res, next) {
        try {
            const id = Number(req.params.id);
            const loggedUser = req.user.id;
            const finance = await this.financeService.getById(id, loggedUser);
            return res.json(finance);
        }
        catch (error) {
            next(error);
        }
    }
    async listMyFinances(req, res, next) {
        try {
            const id = req.user.id;
            const myFinances = await this.financeService.listByUserLogged(id);
            return res.status(200).json(myFinances);
        }
        catch (error) {
            next(error);
        }
    }
    async create(req, res, next) {
        try {
            const id = req.user.id;
            const createFinanceData = req.body;
            const finance = await this.financeService.create(createFinanceData, id);
            return res.status(201).json(finance);
        }
        catch (error) {
            next(error);
        }
    }
    async update(req, res, next) {
        try {
            const id = Number(req.params.id);
            const loggedUser = req.user.id;
            const updateFinanceData = req.body;
            const finance = await this.financeService.update(id, updateFinanceData, loggedUser);
            return res.json(finance);
        }
        catch (error) {
            next(error);
        }
    }
    async delete(req, res, next) {
        try {
            const id = Number(req.params.id);
            const loggedUser = req.user.id;
            await this.financeService.delete(id, loggedUser);
            return res.sendStatus(204);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.FinanceController = FinanceController;
