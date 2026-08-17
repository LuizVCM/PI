import { NotFoundError } from "../errors/NotFoundError";
import { FinanceRepository } from "../repositories/FinanceRepository";
import { UserRepository } from "../repositories/UserRepository";
import { CreateFinanceDTO, UpdateFinanceDTO } from "../schemas/finance.schema";
import { AuthorizationService } from "./AuthorizationService";

export class FinanceService {
  private repo = new FinanceRepository();
  private userRepo = new UserRepository();
  async listAll() {
    return await this.repo.base.findAll();
  }
  async getById(id: number) {
    const finance = await this.repo.base.findById(id);

    if (!finance) {
      throw new NotFoundError("registro financeiro");
    }
    return finance;
  }
  async listByUserLogged(userId: number) {
    return await this.repo.findByUserId(userId);
  }
  async create(data: CreateFinanceDTO, loggedUserId: number) {
    const user = await this.userRepo.base.findById(loggedUserId);
    if (!user) {
      throw new NotFoundError("usuário");
    }
    return this.repo.create(data, user);
  }
  async update(id: number, data: UpdateFinanceDTO, loggedUserId: number) {
    const finance = await this.repo.base.findById(id);
    if (!finance) {
      throw new NotFoundError("registro financeiro");
    }

    AuthorizationService.ensureOwnership(
      finance,
      loggedUserId,
      "registros financeiros"
    );

    Object.assign(
      finance,
      Object.fromEntries(
        Object.entries(data).filter(([, value]) => value !== undefined)
      )
    );

    const financeUpdated = await this.repo.base.save(finance);
    return financeUpdated;
  }
  async delete(id: number, loggedUserId: number) {
    const finance = await this.repo.base.findById(id);

    if (!finance) {
      throw new NotFoundError("registro financeiro");
    }

    AuthorizationService.ensureOwnership(
      finance,
      loggedUserId,
      "registros financeiros"
    );

    const result = await this.repo.base.softDelete(id);

    if (result.affected === 0) {
      throw new NotFoundError("registro financeiro");
    }
  }
}