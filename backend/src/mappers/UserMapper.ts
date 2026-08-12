import { User } from "../models/User";

export class UserMapper {
  static toResponseSavedUser(usuario: User) {
    return {
      nome: usuario.nome,
      sobrenome: usuario.sobrenome,
      email: usuario.email,
      telefone: usuario.telefone,
      cpf: usuario.cpf,
    };
  }
  static toResponse(usuario: User) {
    return {
      nome: usuario.nome,
      sobrenome: usuario.sobrenome,
      email: usuario.email,
      telefone: usuario.telefone,
      cpf: usuario.cpf,
      territorios: usuario.territorios,
      sementes: usuario.sementes,
      financas: usuario.financas,
      insumos: usuario.insumos,
    };
  }
  static toResponseList(usuarios: User[]) {
    return usuarios.map(this.toResponse);
  }
}