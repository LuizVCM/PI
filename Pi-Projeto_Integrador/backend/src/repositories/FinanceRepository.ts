import { DeleteResult } from "typeorm";
import { Finance } from "../models/Finance";
import { User } from "../models/User";
import { CreateFinanceDTO } from "../schemas/finance.schema";
import { createBaseRepository } from "./BaseRepository";

const base = createBaseRepository(Finance);

export const FinanceRepository = {
  ...base,

  async findByUserId(userId: number): Promise<Finance[]> {
    return base.getRepository().find({
      where: { usuario: { id: userId } },
      relations: { usuario: true },
    });
  },

  async create(data: CreateFinanceDTO, user: User): Promise<Finance> {
    const finance = base.create({ ...data, usuario: user });
    return base.save(finance);
  },
};