import { ForbiddenError } from "../errors/ForbiddenError";
import { NotFoundError } from "../errors/NotFoundError";
import { StockRepository } from "../repositories/StockRepository";
import { UserRepository } from "../repositories/UserRepository";
import { CreateStockDTO, UpdateStockDTO } from "../schemas/stock.schema";
import { omitPassword } from "../utils/omitPassword";

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
    Array(data).forEach((value) => {
        if(value) {

        }
    })
  }
  async delete(id: number) {
    const territorio = await StockRepository.delete(id);

    if (territorio.affected === 0) {
      throw new NotFoundError("não foi encontrado território");
    }
  }
}
