import { User } from "../models/User";

export class UserMapper {
  static toResponseCreated(user: User) {
    return {
      nome: user.nome,
      sobrenome: user.sobrenome,
      email: user.email,
      telefone: user.telefone,
      cpf: user.cpf,
    };
  }
  static toResponse(user: User) {
    return {
      nome: user.nome,
      sobrenome: user.sobrenome,
      email: user.email,
      territorios: user.territorios,
      sementes: user.sementes,
      financas: user.financas,
      insumos: user.insumos,
    };
  }
}