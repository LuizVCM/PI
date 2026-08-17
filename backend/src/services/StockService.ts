import { NotFoundError } from "../errors/NotFoundError";
import { StockRepository } from "../repositories/StockRepository";
import { UserRepository } from "../repositories/UserRepository";
import { CreateStockDTO, UpdateStockDTO } from "../schemas/stock.schema";
import { omitPassword } from "../utils/omitPassword";
import { AuthorizationService } from "./AuthorizationService";

export class StockService {
  private repo = new StockRepository();
  private userRepo = new UserRepository();
  async listAll() {
    return await this.repo.base.findAll();
  }
  async getById(id: number) {
    const stock = await this.repo.base.findById(id);
    if (!stock) {
      throw new NotFoundError("registro de insumo");
    }
    return stock;
  }
  async listByUserLogged(userId: number) {
    return await this.repo.findByUserId(userId);
  }
  async create(data: CreateStockDTO, loggedUserId: number) {
    const user = await this.userRepo.base.findById(loggedUserId);
    if (!user) {
      throw new NotFoundError("usuário");
    }
    const stock = await this.repo.create(data, user);
    return { ...stock, user: omitPassword(user) };
  }
  async update(id: number, data: UpdateStockDTO, loggedUserId: number) {
    const stock = await this.repo.base.findById(id);
    if (!stock) {
      throw new NotFoundError("registro de insumo");
    }

    AuthorizationService.ensureOwnership(
      stock,
      loggedUserId,
      "registros de insumos"
    );

    Object.assign(
      stock,
      Object.fromEntries(
        Object.entries(data).filter(([, value]) => value !== undefined)
      )
    );
    const stockUpdated = await this.repo.base.save(stock);
    return stockUpdated;
  }
  async delete(id: number, loggedUserId: number) {
    const stock = await this.repo.base.findById(id);
    if (!stock) {
      throw new NotFoundError("registro de insumos");
    }

    AuthorizationService.ensureOwnership(
      stock,
      loggedUserId,
      "registros de insumos"
    );

    const result = await this.repo.base.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundError("registro de insumos");
    }
  }
}