import { ForbiddenError } from "../errors/ForbiddenError";
import { NotFoundError } from "../errors/NotFoundError";
import { FinancasRepository } from "../repositories/FinanceRepository";
import { UserRepository } from "../repositories/UserRepository";
import { CreateFinanceDTO, UpdateFinanceDTO } from "../schemas/finance.schema";

export class FinancaService {
  async listAll() {
    return await FinancasRepository.findAll();
  }

  async getById(id: number) {
    const financa = await FinancasRepository.findById(id);

    if (!financa) {
      throw new NotFoundError("Finança não encontrada!!");
    }
    return financa;
  }
  async listMyFinances(userId: number) {
    return FinancasRepository.findByUserId(userId);
  }

  async create(data: CreateFinanceDTO, loggedUserId: number) {
    if (!data.valor) {
      throw new Error("Valor é obrigatório");
    }
    if (!data.tipo) {
      throw new Error("Tipo é obrigatório");
    }
    const user = await UserRepository.findById(loggedUserId);
    if (!user) {
      throw new NotFoundError("Usuário não encontrado!");
    }
    return FinancasRepository.create(data, user);
  }
  async update(id: number, data: UpdateFinanceDTO, loggedUserId: number) {
    const financa = await FinancasRepository.findById(id);
    if (!financa) {
      throw new NotFoundError("Finança não encontrada");
    }
    if (financa.user.id !== loggedUserId) {
      throw new ForbiddenError(
        "Você não tem permissão para acessar esta Finança!"
      );
    }
    if (data.valor) financa.valor = data.valor;
    if (data.tipo) financa.tipo = data.tipo;
    if (data.quantidade) financa.quantidade = data.quantidade;
    if (data.descricao) financa.descricao = data.descricao;
    if (data.data) financa.data = data.data;

    const financaUpdate = await FinancasRepository.save(financa);
    return financaUpdate;
  }
  async delete(loggedUserId: number) {
    const territorio = await FinancasRepository.delete(loggedUserId);

    if (territorio.affected === 0) {
      throw new NotFoundError("não foi encontrado finança");
    }
  }
}