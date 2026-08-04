import { UserRepository } from "../repositories/UserRepository";
import bcrypt from "bcrypt";
import { omitPassword } from "../utils/omitPassword";
import { generateToken } from "../utils/jwt";
import { CreateUserDTO, LoginUserDTO, UpdateUserDTO } from "../schemas/user.schema";
import { NotFoundError } from "../errors/NotFoundError";

export class UserService {
  async listAll() {
    return await UserRepository.findAll();
  }

  async listAllBy(field: string) {
    if (
      !field ||
      (field !== "territorio" && field !== "seeds" && field !== "finances")
    ) {
      throw new NotFoundError("Informaçõs não encontradas");
    }
    return await UserRepository.findBy(field);
  }
  async listByEmail(email: string) {
    if (!email) {
      throw new NotFoundError("Informações não encontradas");
    }
    return await UserRepository.findByEmail(email);
  }
  async getById(id: number) {
    if (!id) {
      throw new NotFoundError("Usuario não foi encontrado");
    }
    return await UserRepository.findById(id);
  }

  async listByIdWith(field: string, id: number) {
    if (
      !field ||
      (field !== "territorio" && field !== "seeds" && field !== "finances")
    ) {
      throw new NotFoundError("Informaçõs não encontradas");
    }
    return await UserRepository.findByIdWith(field, id);
  }

  // criar
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
      throw new NotFoundError("Usuário não encontrado!!!!!");
    }
    // Só vamos alterar/atualizar os campos que vieram
    // Assim, podemos atualizar só o nome, ou só o email, ou só o nome e senha, etc

    if (data.nome) user.nome = data.nome;
    if (data.sobrenome) user.sobrenome = data.sobrenome;
    if (data.email) user.email = data.email;
    if (data.telefone) user.telefone = data.telefone;
    if (data.cpf) user.cpf = data.cpf;

    if (data.senha) user.senha = await bcrypt.hash(data.senha, 10);

    const updateUser = await UserRepository.save(user);

    return omitPassword(updateUser);
  }

  async delete(id: number) {
    const user = await UserRepository.delete(id);
    if (user.affected === 0) {
      throw new NotFoundError("Erro ao encontrar usuário");
    }
  }

  async login(data: LoginUserDTO) {
    const user = await UserRepository.findByEmail(data.email);
    if (!user) {
      throw new Error("Uusário não cadastrado ou deletado");
    }
    const validCredentials = await bcrypt.compare(data.senha, user.senha);

    if (!validCredentials) {
      throw new NotFoundError("informações incorretas");
    }

    const token = generateToken({ id: user.id, email: user.email });
    console.log(token);

    return {
      user: omitPassword(user),
      token,
    };
  }
}