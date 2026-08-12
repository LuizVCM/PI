import bcrypt from "bcrypt";
import { UserRepository } from "../repositories/UserRepository";
import { generateToken } from "../auth/json-web-token";
import {
  CreateUserDTO,
  LoginUserDTO,
  UpdateUserDTO,
} from "../schemas/user.schema";
import { NotFoundError } from "../errors/NotFoundError";
import { BadRequestError } from "../errors/BadRequestError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { ConflictError } from "../errors/ConflictError";
import { InternalServerError } from "../errors/InternalServerError";
import { UserMapper } from "../mappers/UserMapper";
import { omitPassword } from "../utils/omitPassword";

export class UserService {
  async listAll() {
    const users = await UserRepository.findAll();
    return UserMapper.toResponseList(users);
  }
  async listByEmail(email: string) {
    if (!email) {
      throw new BadRequestError("e-mail não fornecido");
    }
    const user = await UserRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundError("usuário");
    }
    return UserMapper.toResponse(user);
  }
  async getById(id: number) {
    const user = await UserRepository.findById(id);
    if (!user) {
      throw new NotFoundError("usuário");
    }
    return UserMapper.toResponse(user);
  }
  /** buscar um usuário por ID com uma relação específica (ex: 'sementes', 'territorios', 'financas' ou 'insumos') */
  async listByIdWith(field: string, id: number) {
    const relations = ["sementes", "territorios", "financas", "insumos"];
    if (!relations.includes(field)) {
      throw new BadRequestError("relação com a entidade incorreta", field);
    }
    const user = await UserRepository.findByIdWithRelation(id, field);
    if (!user) {
      throw new NotFoundError("usuário");
    }
    return UserMapper.toResponse(user);
  }
  async create(data: CreateUserDTO) {
    const { cpf, telefone, email } = data;
    const alreadyInUse = await UserRepository.findConflicts({
      cpf,
      telefone,
      email,
    });
    if (alreadyInUse) {
      const fields: string[] = [];
      if (alreadyInUse.cpf) fields.push("CPF");
      if (alreadyInUse.telefone) fields.push("telefone");
      if (alreadyInUse.email) fields.push("e-mail");
      if (fields.length > 0) {
        throw new ConflictError(fields);
      }
    }
    const passHash = await bcrypt.hash(data.senha, 10);
    const user = await UserRepository.create({
      ...data,
      senha: passHash,
    });
    return UserMapper.toResponseSavedUser(user);
  }
  async update(id: number, data: UpdateUserDTO) {
    const user = await UserRepository.findById(id);
    if (!user) {
      throw new NotFoundError("usuário");
    }
    const { senha, ...rest } = data;
    Object.assign(
      user,
      Object.fromEntries(
        Object.entries(rest).filter(([, value]) => value !== undefined)
      )
    );
    if (senha) {
      user.senha = await bcrypt.hash(senha, 10);
    }
    const updatedUser = await UserRepository.save(user);
    return UserMapper.toResponseSavedUser(updatedUser);
  }
  async delete(id: number) {
    const result = await UserRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundError("usuário");
    }
    return result;
  }
  async login(data: LoginUserDTO) {
    const userRegistered = await UserRepository.findByEmail(data.email);
    if (!userRegistered) {
      throw new UnauthorizedError("credenciais inválidas");
    }
    const user = await UserRepository.findByEmailWithPassword(data.email);
    if (!user) {
      throw new InternalServerError("Ocorreu um erro inesperado");
    }
    const validCredentials = await bcrypt.compare(data.senha, user.senha);
    if (!validCredentials) {
      throw new UnauthorizedError("credenciais inválidas");
    }
    const token = generateToken({
      id: user.id,
      email: user.email,
    });
    return {
      usuario: omitPassword(user),
      token,
    };
  }
  async checkUserPassword(email: string, pass: string) {
    const user = await UserRepository.findByEmailWithPassword(email);
    if (!user) {
      throw new NotFoundError("usuário");
    }
    const passwordIsValid = await bcrypt.compare(pass, user.senha);
    if (!passwordIsValid) {
      throw new UnauthorizedError();
    }
    return { usuario: UserMapper.toResponse(user) };
  }
}