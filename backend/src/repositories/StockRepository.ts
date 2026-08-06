import { Stock } from "../models/Stock";
import { User } from "../models/User";
import { CreateStockDTO } from "../schemas/stock.schema";
import { createBaseRepository } from "./BaseRepository";

const base = createBaseRepository(Stock);

export const StockRepository = {
  ...base,

  async findByUserId(userId: number): Promise<Stock[]> {
    return base.getRepository().find({
      where: { usuario: { id: userId } },
      relations: { usuario: true },
    });
  },

  async create(data: CreateStockDTO, user: User): Promise<Stock> {
    const stock = base.create({ ...data, usuario: user });
    return base.save(stock);
  },
};