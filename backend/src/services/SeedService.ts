import { ForbiddenError } from "../errors/ForbiddenError";
import { NotFoundError } from "../errors/NotFoundError";
import { SeedRepository } from "../repositories/SeedRepository";
import { UserRepository } from "../repositories/UserRepository";

export class SeedService {
  async listAll() {
    return await SeedRepository.findAll();
  }

  async getById(id: number) {
    const semente = await SeedRepository.findById(id);

    if (!semente) {
      throw new NotFoundError("Semente não encontrado!!");
    }
    return semente;
  }
  async listMySeeds(userId: number) {
    return SeedRepository.findByUserId(userId);
  }

  async create(
    data: {
      dataCompra: Date;
      nomePlanta: string;
      dataPlantio: Date;
      quantidade: number;
    },
    loggedUserId: number
  ) {
    if (!data.dataCompra) {
      throw new Error("Data de compra é obrigatória");
    }
    if (!data.quantidade) {
      throw new Error("Quantidade é obrigatória!");
    }
    const user = await UserRepository.findById(loggedUserId);
    if (!user) {
      throw new NotFoundError("Usuário não encontrado!");
    }
    return SeedRepository.create(data, user);
  }
  async update(
    id: number,
    data: {
      dataCompra?: Date;
      nomePlanta?: string;
      dataPlantio?: Date;
      quantidade?: number;
    },
    loggedUserId: number
  ) {
    const semente = await SeedRepository.findById(id);

    if (!semente) {
      throw new NotFoundError("Semente não encontrado");
    }
    if (semente.usuario.id !== loggedUserId) {
      throw new ForbiddenError(
        "Você não tem permissão para acessar esta semente!"
      );
    }
    if (data.dataCompra) semente.dataCompra = data.dataCompra;
    if (data.dataPlantio) semente.dataPlantio = data.dataPlantio;
    if (data.nomePlanta) semente.nomePlanta = data.nomePlanta;
    if (data.quantidade) semente.quantidade = data.quantidade;

    const sementeUpdate = await SeedRepository.save(semente);
    return sementeUpdate;
  }
  async delete(loggedUserId: number) {
    const semente = await SeedRepository.delete(loggedUserId);

    if (semente.affected === 0) {
      throw new NotFoundError("não foi encontrado semente");
    }
  }
}