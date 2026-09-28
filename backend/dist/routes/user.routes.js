"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_validate_1 = require("../middlewares/index.validate");
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const auth_middleware_1 = require("../middlewares/auth-middleware");
const admin_token_middleware_1 = require("../middlewares/admin-token-middleware");
const admin_middleware_1 = require("../middlewares/admin-middleware");
const userRoutes = (0, express_1.Router)();
const userController = new UserController_1.UserController();
// criar admin. é necessário o token vindo do env enviado via header "x-admin-token"
userRoutes.post("/admin", admin_token_middleware_1.adminTokenMiddleware, index_validate_1.validateAdminCreate, userController.createAdmin.bind(userController));
userRoutes.get("/all", auth_middleware_1.authMiddleware, (0, admin_middleware_1.adminMiddleware)("usuários"), userController.listAllWithRelations.bind(userController));
userRoutes.get("/me", auth_middleware_1.authMiddleware, userController.getInfoUserLogged.bind(userController));
userRoutes.post("/", index_validate_1.validateUserCreate, userController.create.bind(userController));
userRoutes.put("/", auth_middleware_1.authMiddleware, index_validate_1.validateUserUpdate, userController.update.bind(userController));
userRoutes.delete("/", auth_middleware_1.authMiddleware, userController.delete.bind(userController));
exports.default = userRoutes;
