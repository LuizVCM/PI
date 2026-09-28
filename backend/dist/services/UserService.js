"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserRepository_1 = require("../repositories/UserRepository");
const NotFoundError_1 = require("../errors/NotFoundError");
const BadRequestError_1 = require("../errors/BadRequestError");
const UnauthorizedError_1 = require("../errors/UnauthorizedError");
const ConflictError_1 = require("../errors/ConflictError");
const InternalServerError_1 = require("../errors/InternalServerError");
const UserMapper_1 = require("../mappers/UserMapper");
const data_filter_1 = require("../utils/data-filter");
const User_1 = require("../models/User");
class UserService {
    repo = new UserRepository_1.UserRepository();
    async listAllWithRelations() {
        const users = await this.repo.listAllWithTerritory();
        return UserMapper_1.UserMapper.toResponseList(users);
    }
    async listByEmail(email) {
        if (!email) {
            throw new BadRequestError_1.BadRequestError("e-mail não fornecido");
        }
        const user = await this.repo.findByEmail(email);
        if (!user) {
            throw new NotFoundError_1.NotFoundError("usuário");
        }
        return UserMapper_1.UserMapper.toResponse(user);
    }
    async getInfoUser(id) {
        const user = await this.repo.findUserWithTerritory(id);
        if (!user) {
            throw new NotFoundError_1.NotFoundError("usuário");
        }
        return UserMapper_1.UserMapper.toResponse(user);
    }
    /** buscar um usuário por ID com uma relação específica (ex: 'sementes', 'territorios', 'financas' ou 'insumos') */
    async listByIdWith(field, id) {
        const relations = ["sementes", "territorios", "financas", "insumos"];
        if (!relations.includes(field)) {
            throw new BadRequestError_1.BadRequestError("relação com a entidade incorreta", field);
        }
        const user = await this.repo.findByIdWithRelation(id, field);
        if (!user) {
            throw new NotFoundError_1.NotFoundError("usuário");
        }
        return UserMapper_1.UserMapper.toResponse(user);
    }
    async create(data) {
        const { cpf, telefone, email } = data;
        const alreadyInUse = await this.repo.findConflicts({
            cpf,
            telefone,
            email,
        });
        if (alreadyInUse) {
            const fields = [];
            if (alreadyInUse.cpf)
                fields.push("CPF");
            if (alreadyInUse.telefone)
                fields.push("telefone");
            if (alreadyInUse.email)
                fields.push("e-mail");
            if (fields.length > 0) {
                throw new ConflictError_1.ConflictError({ fields: fields });
            }
        }
        const passHash = await bcrypt_1.default.hash(data.senha, 10);
        const user = await this.repo.create({
            ...data,
            senha: passHash,
        });
        return UserMapper_1.UserMapper.toResponseSavedUser(user);
    }
    async update(id, data) {
        const user = await this.repo.base.findById(id);
        if (!user) {
            throw new NotFoundError_1.NotFoundError("usuário");
        }
        const { senha, ...rest } = data;
        (0, data_filter_1.dataFilter)(user, rest);
        if (senha) {
            user.senha = await bcrypt_1.default.hash(senha, 10);
        }
        const updatedUser = await this.repo.base.save(user);
        return UserMapper_1.UserMapper.toResponseSavedUser(updatedUser);
    }
    async delete(id) {
        const result = await this.repo.base.softDelete(id);
        if (result.affected === 0) {
            throw new InternalServerError_1.InternalServerError("Não foi possível deletar");
        }
        return result;
    }
    async login(data) {
        const userRegistered = await this.repo.findByEmail(data.email);
        if (!userRegistered) {
            throw new UnauthorizedError_1.UnauthorizedError("credenciais inválidas");
        }
        const user = await this.repo.findByEmailWithPassword(data.email);
        if (!user) {
            throw new InternalServerError_1.InternalServerError("Ocorreu um erro inesperado");
        }
        const validCredentials = await bcrypt_1.default.compare(data.senha, user.senha);
        if (!validCredentials) {
            throw new UnauthorizedError_1.UnauthorizedError("credenciais inválidas");
        }
        return {
            id: user.id,
            email: user.email,
            role: user.role,
        };
    }
    async checkUserPassword(email, pass) {
        const user = await this.repo.findByEmailWithPassword(email);
        if (!user) {
            throw new NotFoundError_1.NotFoundError("usuário");
        }
        const passwordIsValid = await bcrypt_1.default.compare(pass, user.senha);
        if (!passwordIsValid) {
            throw new UnauthorizedError_1.UnauthorizedError("credenciais inválidas");
        }
        return { usuario: UserMapper_1.UserMapper.toResponse(user) };
    }
    async createAdmin(data) {
        const existingUser = await this.repo.findByEmail(data.email);
        if (existingUser) {
            throw new ConflictError_1.ConflictError({ fields: ["e-mail"] });
        }
        const adminExists = await this.repo.existsByRole(User_1.UserRole.ADMIN);
        if (adminExists) {
            throw new UnauthorizedError_1.UnauthorizedError("o administrador inicial já foi configurado");
        }
        const senha = await bcrypt_1.default.hash(data.senha, 10);
        const user = await this.repo.createAdmin({
            ...data,
            senha,
            role: User_1.UserRole.ADMIN,
        });
        return { nome: user.nome, email: user.email };
    }
}
exports.UserService = UserService;
