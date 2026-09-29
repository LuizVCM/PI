"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TerritoryRepository = void 0;
const Territory_1 = require("../models/Territory");
const BaseRepository_1 = require("./BaseRepository");
class TerritoryRepository {
    base = (0, BaseRepository_1.createBaseRepository)(Territory_1.Territory);
    async findAllWithUser() {
        return this.base.findAll({
            relations: {
                usuario: true,
            },
        });
    }
    async findByIdWithUser(id) {
        return this.base.findById(id, {
            relations: {
                usuario: true,
            },
        });
    }
    /** buscar todos os territórios de um usuário, com as relações */
    async findByUserIdWithRelations(userId) {
        return this.base.getRepository().find({
            where: { usuario: { id: userId } },
            relations: {
                usuario: true,
                plantacoes: true,
                sensores: true,
                clima: true,
            },
        });
    }
    async findByIdWithRelations(id) {
        return this.base.findById(id, {
            relations: {
                usuario: true,
                plantacoes: true,
                sensores: true,
                clima: true,
            },
        });
    }
    /** criar um novo território associado a um usuário */
    async create(data, user) {
        const territory = this.base.create({ ...data, usuario: user });
        return this.base.save(territory);
    }
}
exports.TerritoryRepository = TerritoryRepository;
