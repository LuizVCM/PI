"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const json_web_token_1 = require("../auth/json-web-token");
class AuthService {
    generate(payload) {
        return (0, json_web_token_1.generateToken)({
            id: payload.id,
            email: payload.email,
            role: payload.role
        });
    }
    verify(token) {
        return (0, json_web_token_1.verifyToken)(token);
    }
}
exports.AuthService = AuthService;
