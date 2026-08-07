import { ForbiddenError } from "../errors/ForbiddenError";
import { NotFoundError } from "../errors/NotFoundError";
import { FinanceRepository } from "../repositories/FinanceRepository";
import { UserRepository } from "../repositories/UserRepository";
import { CreateFinanceDTO, UpdateFinanceDTO } from "../schemas/finance.schema";

export class FinanceService {
  async listAll() {
    return await FinanceRepository.findAll();
  }

  async getById(id: number) {
    const finance = await FinanceRepository.findById(id);

    if (!finance) {
      throw new NotFoundError("registro financeiro");
    }
    return finance;
  }
  async listByUserId(userId: number) {
    return FinanceRepository.findByUserId(userId);
  }

  async create(data: CreateFinanceDTO, loggedUserId: number) {
    const user = await UserRepository.findById(loggedUserId);
    if (!user) {
      throw new NotFoundError("usuário");
    }
    return FinanceRepository.create(data, user);
  }
  async update(id: number, data: UpdateFinanceDTO, loggedUserId: number) {
    const finance = await FinanceRepository.findById(id);
    if (!finance) {
      throw new NotFoundError("registro financeiro");
    }
    if (finance.usuario.id !== loggedUserId) {
      throw new ForbiddenError(
        "registros financeiros",
        "tentativa de alterar dados de outro usuário"
      );
    }

    Object.assign(
      finance,
      Object.fromEntries(
        Object.entries(data).filter(([, value]) => value !== undefined)
      )
    );

    const financeUpdate = await FinanceRepository.save(finance);
    return financeUpdate;
  }
  async delete(id: number) {
    const finance = await FinanceRepository.softDelete(id);

    if (finance.affected === 0) {
      throw new NotFoundError("registro financeiro");
    }
  }
}