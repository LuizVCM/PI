import { User } from "../models/User";
import { CreateUserDTO } from "../schemas/user.schema";

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
      territorios: usuario.territorios ? usuario.territorios : "não há territórios registrados",
      sementes: usuario.sementes ? usuario.sementes : "não há sementes registradas",
      financas: usuario.financas ? usuario.financas : "não há registros financeiros registrados",
      insumos: usuario.insumos ? usuario.insumos : "não há insumos registrados",
    };
  }
  static toResponseList(usuarios: User[]) {
    return usuarios.map(this.toResponse);
  }
}