"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const UserService_1 = require("../services/UserService");
class UserController {
    userService = new UserService_1.UserService();
    async listAllWithRelations(_req, res, next) {
        try {
            const users = await this.userService.listAllWithRelations();
            return res.status(200).json(users);
        }
        catch (error) {
            next(error);
        }
    }
    async getInfoUserLogged(req, res, next) {
        try {
            const id = req.user.id;
            const user = await this.userService.getInfoUser(id);
            return res.json(user);
        }
        catch (error) {
            next(error);
        }
    }
    async getRelationUserLogged(req, res, next) {
        try {
            const id = req.user.id;
            const relation = req.body.relation;
            const data = await this.userService.listByIdWith(relation, id);
            return res.json(data);
        }
        catch (error) {
            next(error);
        }
    }
    async create(req, res, next) {
        try {
            const createUserData = req.body;
            const created = await this.userService.create(createUserData);
            return res.status(201).json(created);
        }
        catch (error) {
            next(error);
        }
    }
    async createAdmin(req, res, next) {
        try {
            const createAdminData = req.body;
            const created = await this.userService.createAdmin(createAdminData);
            return res.status(201).json(created);
        }
        catch (error) {
            next(error);
        }
    }
    async update(req, res, next) {
        try {
            const id = req.user.id;
            const updateUserData = req.body;
            const user = await this.userService.update(id, updateUserData);
            return res.json(user);
        }
        catch (error) {
            next(error);
        }
    }
    async delete(req, res, next) {
        try {
            const id = req.user.id;
            await this.userService.delete(id);
            return res.sendStatus(204);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.UserController = UserController;
