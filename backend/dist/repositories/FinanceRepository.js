"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinanceRepository = void 0;
const Finance_1 = require("../models/Finance");
const BaseRepository_1 = require("./BaseRepository");
class FinanceRepository {
    base = (0, BaseRepository_1.createBaseRepository)(Finance_1.Finance);
    async findAllWithUser() {
        return this.base.findAll({ relations: { usuario: true } });
    }
    async findByIdWithUser(id) {
        return this.base.findById(id, { relations: { usuario: true } });
    }
    async findAllByUserId(userId) {
        return this.base.getRepository().find({
            where: { usuario: { id: userId } },
            relations: { usuario: true },
        });
    }
    async create(data, user) {
        const finance = this.base.create({ ...data, usuario: user });
        return this.base.save(finance);
    }
}
exports.FinanceRepository = FinanceRepository;
