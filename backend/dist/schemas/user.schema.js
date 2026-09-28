"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAdminSchema = exports.loginUserSchema = exports.updateUserSchema = exports.createUserSchema = exports.passwordSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const max_1 = require("libphonenumber-js/max");
const cpf_cnpj_validator_1 = require("cpf-cnpj-validator");
const User_1 = require("../models/User");
const telefoneSchema = zod_1.default.string().transform((valor, ctx) => {
    const tiposAceitos = ["MOBILE", "FIXED_LINE", "FIXED_LINE_OR_MOBILE"];
    const telefone = (0, max_1.parsePhoneNumberFromString)(valor, "BR");
    console.log(telefone?.getType());
    if (!telefone?.isValid() ||
        !tiposAceitos.includes(telefone.getType() ?? "")) {
        ctx.addIssue({
            code: "custom",
            message: "Telefone inválido",
        });
        return zod_1.default.NEVER;
    }
    return telefone.number; // retorna em e164 (ex: +5551999999999)
});
const cpfSchema = zod_1.default.string().transform((valor, ctx) => {
    const cpfLimpo = cpf_cnpj_validator_1.cpf.strip(valor);
    if (!cpf_cnpj_validator_1.cpf.isValid(cpfLimpo)) {
        ctx.addIssue({
            code: "custom",
            message: "CPF inválido",
        });
        return zod_1.default.NEVER;
    }
    return cpfLimpo;
});
exports.passwordSchema = zod_1.default
    .string("A senha é obrigatória")
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .regex(/[A-Z]/, "A senha deve ter pelo menos uma letra maiúscula")
    .regex(/[a-z]/, "A senha deve ter pelo menos uma letra minúscula")
    .regex(/[0-9]/, "A senha deve ter pelo menos um dígito")
    .regex(/[^a-zA-Z0-9\s]/, "A senha deve ter pelo menos um caractere especial")
    .max(255);
exports.createUserSchema = zod_1.default.object({
    nome: zod_1.default
        .string()
        .trim()
        .min(3, "O nome é muito curto")
        .max(100, "O nome é muito longo")
        .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:\s+[A-Za-zÀ-ÖØ-öø-ÿ]+)*$/, "Informe nome usando apenas letras"),
    sobrenome: zod_1.default
        .string()
        .trim()
        .min(3, "O sobrenome é muito curto")
        .max(100, "O sobrenome é muito longo")
        .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:\s+[A-Za-zÀ-ÖØ-öø-ÿ]+)*$/, "Informe sobrenome usando apenas letras"),
    email: zod_1.default.email("E-mail inválido"),
    telefone: telefoneSchema,
    cpf: cpfSchema,
    senha: exports.passwordSchema,
});
exports.updateUserSchema = exports.createUserSchema.partial();
exports.loginUserSchema = zod_1.default.object({
    email: zod_1.default.email("E-mail inválido"),
    senha: zod_1.default.string().min(1, "A senha é obrigatória"),
});
exports.createAdminSchema = zod_1.default.object({
    nome: zod_1.default.string().min(1, "Nome necessário"),
    email: zod_1.default.email("E-mail obrigatório"),
    senha: exports.passwordSchema,
    role: zod_1.default.enum(User_1.UserRole).optional(),
});
