"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockService = void 0;
const InternalServerError_1 = require("../errors/InternalServerError");
const NotFoundError_1 = require("../errors/NotFoundError");
const StockMapper_1 = require("../mappers/StockMapper");
const StockRepository_1 = require("../repositories/StockRepository");
const UserRepository_1 = require("../repositories/UserRepository");
const data_filter_1 = require("../utils/data-filter");
const AuthorizationService_1 = require("./AuthorizationService");
class StockService {
    repo = new StockRepository_1.StockRepository();
    userRepo = new UserRepository_1.UserRepository();
    async listAll() {
        const stocks = await this.repo.findAllWithUser();
        return StockMapper_1.StockMapper.toResponseList(stocks);
    }
    async getById(id, loggedUserId) {
        const stock = await this.repo.findByIdWithUser(id);
        if (!stock) {
            throw new NotFoundError_1.NotFoundError("registro de insumo");
        }
        AuthorizationService_1.AuthorizationService.ensureOwnership(stock, loggedUserId, "registro de insumo");
        return StockMapper_1.StockMapper.toResponse(stock);
    }
    async listByUserLogged(userId) {
        const stocks = await this.repo.findAllByUserId(userId);
        return StockMapper_1.StockMapper.toResponseList(stocks);
    }
    async create(data, loggedUserId) {
        const user = await this.userRepo.base.findById(loggedUserId);
        if (!user) {
            throw new InternalServerError_1.InternalServerError("Ocorreu um erro inesperado");
        }
        const stock = await this.repo.create(data, user);
        return StockMapper_1.StockMapper.toResponse(stock);
    }
    async update(id, data, loggedUserId) {
        const stock = await this.repo.findByIdWithUser(id);
        if (!stock) {
            throw new NotFoundError_1.NotFoundError("registro de insumo");
        }
        AuthorizationService_1.AuthorizationService.ensureOwnership(stock, loggedUserId, "registros de insumos");
        (0, data_filter_1.dataFilter)(stock, data);
        const stockUpdated = await this.repo.base.save(stock);
        return StockMapper_1.StockMapper.toSummaryResponse(stockUpdated);
    }
    async delete(id, loggedUserId) {
        const stock = await this.repo.findByIdWithUser(id);
        if (!stock) {
            throw new NotFoundError_1.NotFoundError("registro de insumos");
        }
        AuthorizationService_1.AuthorizationService.ensureOwnership(stock, loggedUserId, "registros de insumos");
        const result = await this.repo.base.softDelete(id);
        if (result.affected === 0) {
            throw new InternalServerError_1.InternalServerError("Não foi possível deletar");
        }
        return result;
    }
}
exports.StockService = StockService;
