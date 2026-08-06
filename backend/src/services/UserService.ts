import bcrypt from "bcrypt";
import { UserRepository } from "../repositories/UserRepository";
import { omitPassword } from "../utils/omitPassword";
import { generateToken } from "../utils/jwt";
import {
  CreateUserDTO,
  LoginUserDTO,
  UpdateUserDTO,
} from "../schemas/user.schema";
import { NotFoundError } from "../errors/NotFoundError";

export class UserService {
  async listAll() {
    return UserRepository.findAll();
  }

  async listByEmail(email: string) {
    if (!email) {
      throw new NotFoundError("Informações não encontradas");
    }

    return UserRepository.findByEmail(email);
  }

  async getById(id: number) {
    const user = await UserRepository.findById(id);

    if (!user) {
      throw new NotFoundError("Usuário não encontrado");
    }

    return omitPassword(user);
  }

  async listByIdWith(field: string, id: number) {
    const relations = ["territorio", "seeds", "finances"];

    if (!relations.includes(field)) {
      throw new NotFoundError("Informações não encontradas");
    }

    return UserRepository.findByIdWithRelation(id, field);
  }

  async create(data: CreateUserDTO) {
    const senhaHash = await bcrypt.hash(data.senha, 10);

    const user = await UserRepository.create({
      ...data,
      senha: senhaHash,
    });

    return omitPassword(user);
  }

  async update(id: number, data: UpdateUserDTO) {
    const user = await UserRepository.findById(id);

    if (!user) {
      throw new NotFoundError("Usuário não encontrado");
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

    return omitPassword(updatedUser);
  }

  async delete(id: number) {
    const result = await UserRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundError("Usuário não encontrado");
    }
  }

  async login(data: LoginUserDTO) {
    const user = await UserRepository.findByEmail(data.email);

    if (!user) {
      throw new NotFoundError("Usuário não encontrado");
    }

    const validCredentials = await bcrypt.compare(data.senha, user.senha);

    if (!validCredentials) {
      throw new NotFoundError("Informações incorretas");
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
    });

    return {
      user: omitPassword(user),
      token,
    };
  }
}