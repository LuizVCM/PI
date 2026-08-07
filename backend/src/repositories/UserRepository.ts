import { User } from "../models/User";
import { CreateUserDTO } from "../schemas/user.schema";
import { createBaseRepository } from "./BaseRepository";

const base = createBaseRepository(User);

export const UserRepository = {
  ...base,
  /** buscar por chaves únicas, a fim de validar um cadastro */
  async findUniqueKeys(keys: { cpf: string; telefone: string; email: string }) {
    return base.findAll({
      where: keys,
      select: { cpf: true, telefone: true, email: true },
    });
  },
  /** busca apenas por e-mail */
  async findByEmail(email: string) {
    return base.findOne({
      where: { email },
      select: { id: true, email: true },
    });
  },
  /** busca por e-mail para ser utilizado ao logar. APENAS no login, pois aqui a senha é retornada */
  async findByEmailWithPassword(email: string) {
    return base.findOne({
      where: { email },
      select: { id: true, email: true, senha: true },
    });
  },
  /** buscar um usuário por ID com uma relação específica (ex: 'sementes', 'territorios', 'financas' ou 'insumos') */
  async findByIdWithRelation(
    id: number,
    relation: string
  ): Promise<User | null> {
    return base.findById(id, { relations: [relation] });
  },

  /** cria um novo usuário */
  async create(data: CreateUserDTO): Promise<User> {
    const user = base.create(data);
    return base.save(user);
  },
};
