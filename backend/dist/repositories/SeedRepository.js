"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedRepository = void 0;
const Seed_1 = require("../models/Seed");
const BaseRepository_1 = require("./BaseRepository");
class SeedRepository {
    base = (0, BaseRepository_1.createBaseRepository)(Seed_1.Seed);
    async findAllWithRelations() {
        return this.base.findAll({ relations: { usuario: true, planta: true } });
    }
    async findByIdWithRelations(id) {
        return this.base.findById(id, {
            relations: { usuario: true, planta: true, plantacao: true },
        });
    }
    async findByUserIdWithRelations(userId) {
        return this.base.findAll({
            where: { usuario: { id: userId } },
            relations: { usuario: true, planta: true, plantacao: true },
        });
    }
    async create(data, user, plant) {
        const seed = this.base.create({ ...data, usuario: user, planta: plant });
        return this.base.save(seed);
    }
}
exports.SeedRepository = SeedRepository;
