import { User } from "../models/User";
import { CreateUserDTO } from "../schemas/user.schema";
import { createBaseRepository } from "./BaseRepository";

const base = createBaseRepository(User);

export const UserRepository = {
  ...base,

  /** buscar usuário por email (único) */
  async findByEmail(email: string): Promise<User | null> {
    return base.findOne({ where: { email } });
  },

  /** buscar usuários por ID com uma relação específica (ex: 'seeds', 'territorios') */
  async findByIdWithRelation(id: number, relation: string): Promise<User | null> {
    return base.findById(id, { relations: [relation] });
  },

  /** cria um novo usuário */
  async create(data: CreateUserDTO): Promise<User> {
    const user = base.create(data);
    return base.save(user);
  },
};