"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const UserService_1 = require("../services/UserService");
const AuthService_1 = require("../services/AuthService");
const UnauthorizedError_1 = require("../errors/UnauthorizedError");
class AuthController {
    authService = new AuthService_1.AuthService();
    userService = new UserService_1.UserService();
    async login(req, res, next) {
        try {
            const loginData = req.body;
            const loggedUser = await this.userService.login(loginData);
            const token = this.authService.generate({
                id: loggedUser.id,
                email: loggedUser.email,
                role: loggedUser.role,
            });
            // console.log("Token:", token);
            res.cookie("token", token, {
                httpOnly: true,
                secure: true, // false -> thunderclient, true -> front
                sameSite: "none", // 'lax' -> thunderclient, 'none' -> front
                maxAge: 1000 * 60 * 60, // 1h
            });
            // console.log("Headers:", res.getHeaders());
            return res.status(200).json({
                success: true,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async logout(req, res, next) {
        try {
            res.clearCookie("token");
            return res.sendStatus(204);
        }
        catch (error) {
            next(error);
        }
    }
    /** para solicitar confirmação ao alterar dados sensíveis, se necessário  */
    async checkUserPassword(req, res, next) {
        try {
            const { senha } = req.body;
            if (!req.user?.email) {
                throw new UnauthorizedError_1.UnauthorizedError("não autenticado");
            }
            const passwordIsValid = await this.userService.checkUserPassword(req.user?.email, senha);
            if (!passwordIsValid) {
                throw new UnauthorizedError_1.UnauthorizedError("credenciais inválidas");
            }
            return res.status(200).json({ success: true });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AuthController = AuthController;
