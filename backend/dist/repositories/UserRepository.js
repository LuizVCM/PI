"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const User_1 = require("../models/User");
const BaseRepository_1 = require("./BaseRepository");
class UserRepository {
    base = (0, BaseRepository_1.createBaseRepository)(User_1.User);
    /** listar todos os usuários com território  */
    async listAllWithTerritory() {
        return this.base.findAll({
            relations: {
                territorios: true,
            },
        });
    }
    /** buscar por chaves únicas, a fim de validar um cadastro */
    async findConflicts(keys) {
        const users = await this.base.findAll({
            where: [
                { cpf: keys.cpf },
                { telefone: keys.telefone },
                { email: keys.email },
            ],
            withDeleted: true,
            select: { id: true, cpf: true, telefone: true, email: true },
        });
        // mapeia quais campos estão em uso
        const conflicts = {
            cpf: false,
            telefone: false,
            email: false,
        };
        for (const user of users) {
            if (user.cpf === keys.cpf)
                conflicts.cpf = true;
            if (user.telefone === keys.telefone)
                conflicts.telefone = true;
            if (user.email === keys.email)
                conflicts.email = true;
        }
        return conflicts;
    }
    async findUserWithTerritory(id) {
        return this.base.findById(id, {
            relations: {
                territorios: true,
            },
        });
    }
    /** busca apenas por e-mail */
    async findByEmail(email) {
        return this.base.findOne({
            where: { email },
            select: { id: true, email: true },
        });
    }
    /** busca por e-mail para ser utilizado ao logar. APENAS no login, pois aqui a senha é retornada */
    async findByEmailWithPassword(email) {
        return this.base.findOne({
            where: { email },
            select: { id: true, email: true, senha: true },
        });
    }
    /** buscar um usuário por ID com uma relação específica (ex: 'sementes', 'territorios', 'financas' ou 'insumos') */
    async findByIdWithRelation(id, relation) {
        return this.base.findById(id, { relations: [relation] });
    }
    /** cria um novo usuário */
    async create(data) {
        const user = this.base.create(data);
        return this.base.save(user);
    }
    async createAdmin(data) {
        const user = this.base.create(data);
        return this.base.save(user);
    }
    async existsByRole(role) {
        const count = await this.base.count({
            where: {
                role,
            },
        });
        return count > 0;
    }
}
exports.UserRepository = UserRepository;
