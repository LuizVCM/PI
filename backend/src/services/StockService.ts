import { ForbiddenError } from "../errors/ForbiddenError";
import { NotFoundError } from "../errors/NotFoundError";
import { StockRepository } from "../repositories/StockRepository";
import { UserRepository } from "../repositories/UserRepository";
import { CreateStockDTO, UpdateStockDTO } from "../schemas/stock.schema";
import { omitPassword } from "../utils/omitPassword";
import { AuthorizationService } from "./AuthorizationService";

export class StockService {
  async listAll() {
    return await StockRepository.findAll();
  }
  async getById(id: number) {
    const stock = await StockRepository.findById(id);
    if (!stock) {
      throw new NotFoundError("Registro não encontrado");
    }
    return stock;
  }
  async listByUserId(userId: number) {
    return await StockRepository.findByUserId(userId);
  }
  async create(data: CreateStockDTO, loggedUserId: number) {
    const user = await UserRepository.findById(loggedUserId);
    if (!user) {
      throw new NotFoundError("Usuário não encontrado");
    }
    const stock = await StockRepository.create(data, user);
    return { ...stock, user: omitPassword(user) };
  }
  async update(id: number, data: UpdateStockDTO, loggedUserId: number) {
    const stock = await StockRepository.findById(id);
    if (!stock) {
      throw new NotFoundError("Registro não encontrado");
    }
    if (stock.usuario.id !== loggedUserId) {
      throw new ForbiddenError("Sem permissão");
    }
    Object.assign(
      stock,
      Object.fromEntries(
        Object.entries(data).filter(([, value]) => value !== undefined)
      )
    );
    const stockUpdated = await StockRepository.save(stock);
    return stockUpdated;
  }
  async delete(id: number, loggedUserId: number) {
    const stock = await StockRepository.findById(id);
    if (!stock) {
      throw new NotFoundError("Registro não encontrado");
    }

    AuthorizationService.ensureOwnership(
      stock,
      loggedUserId,
      "estoque de insumos"
    );

    const result = await StockRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundError("Registro não encontrado");
    }
  }
}