import { AppDataSource } from "../config/data-source";
import { Stock } from "../models/Stock";
import { User } from "../models/User";
import { CreateStockDTO } from "../schemas/stock.schema";

const repo = AppDataSource.getRepository(Stock);

export const StockRepository = {
  async findAll() {
    return repo.find();
  },
  async findById(id: number) {
    return repo.findOne({ where: { id } });
  },
  async findByUserId(userId: number) {
    return repo.find({
      where: { usuario: { id: userId } },
      relations: { usuario: true },
    });
  },
  async create(data: CreateStockDTO, user: User) {
    const stock = repo.create({ ...data, usuario: user });
    return repo.save(stock);
  },
  async save(stock: Stock) {
    return repo.save(stock);
  },
  async delete(id: number) {
    return repo.delete(id);
  },
};
