"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockRepository = void 0;
const Stock_1 = require("../models/Stock");
const BaseRepository_1 = require("./BaseRepository");
class StockRepository {
    base = (0, BaseRepository_1.createBaseRepository)(Stock_1.Stock);
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
        const stock = this.base.create({ ...data, usuario: user });
        return this.base.save(stock);
    }
}
exports.StockRepository = StockRepository;
