"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinanceService = void 0;
const InternalServerError_1 = require("../errors/InternalServerError");
const NotFoundError_1 = require("../errors/NotFoundError");
const FinanceMapper_1 = require("../mappers/FinanceMapper");
const FinanceRepository_1 = require("../repositories/FinanceRepository");
const UserRepository_1 = require("../repositories/UserRepository");
const data_filter_1 = require("../utils/data-filter");
const AuthorizationService_1 = require("./AuthorizationService");
class FinanceService {
    repo = new FinanceRepository_1.FinanceRepository();
    userRepo = new UserRepository_1.UserRepository();
    async listAll() {
        const finances = await this.repo.findAllWithUser();
        return FinanceMapper_1.FinanceMapper.toResponseList(finances);
    }
    async getById(id, loggedUserId) {
        const finance = await this.repo.findByIdWithUser(id);
        if (!finance) {
            throw new NotFoundError_1.NotFoundError("registro financeiro");
        }
        AuthorizationService_1.AuthorizationService.ensureOwnership(finance, loggedUserId, "registro financeiro");
        return FinanceMapper_1.FinanceMapper.toResponse(finance);
    }
    async listByUserLogged(userId) {
        const finances = await this.repo.findAllByUserId(userId);
        return FinanceMapper_1.FinanceMapper.toResponseList(finances);
    }
    async create(data, loggedUserId) {
        const user = await this.userRepo.base.findById(loggedUserId);
        if (!user) {
            throw new InternalServerError_1.InternalServerError("Ocorreu um erro inesperado");
        }
        const finance = await this.repo.create(data, user);
        return FinanceMapper_1.FinanceMapper.toResponse(finance);
    }
    async update(id, data, loggedUserId) {
        const finance = await this.repo.findByIdWithUser(id);
        if (!finance) {
            throw new NotFoundError_1.NotFoundError("registro financeiro");
        }
        AuthorizationService_1.AuthorizationService.ensureOwnership(finance, loggedUserId, "registros financeiros");
        (0, data_filter_1.dataFilter)(finance, data);
        const financeUpdated = await this.repo.base.save(finance);
        return FinanceMapper_1.FinanceMapper.toSummaryResponse(financeUpdated);
    }
    async delete(id, loggedUserId) {
        const finance = await this.repo.findByIdWithUser(id);
        if (!finance) {
            throw new NotFoundError_1.NotFoundError("registro financeiro");
        }
        AuthorizationService_1.AuthorizationService.ensureOwnership(finance, loggedUserId, "registros financeiros");
        const result = await this.repo.base.softDelete(id);
        if (result.affected === 0) {
            throw new InternalServerError_1.InternalServerError("Não foi possível deletar");
        }
        return result;
    }
}
exports.FinanceService = FinanceService;
