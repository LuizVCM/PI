import { PlantRepository } from "../repositories/PlantRepository";
import { NotFoundError } from "../errors/NotFoundError";
import { ForbiddenError } from "../errors/ForbiddenError";
import { Seed } from "../models/Seed";
import { SeedRepository } from "../repositories/SeedRepository";
import { CreatePlantDTO, UpdatePlantDTO } from "../schemas/plant.schema";

export class PlantService {
  async listAll() {
    return await PlantRepository.findAll();
  }

  async getById(id: number) {
    const planta = await PlantRepository.findById(id);

    if (!planta) {
      throw new NotFoundError("planta");
    }
    return planta;
  }
  async listMyPlants(sementeId: number) {
    return PlantRepository.findBySeedId(sementeId);
  }

  async create(data: CreatePlantDTO, loggedUserId: number, seedId: number) {
      const seed = await SeedRepository.findById(seedId);
      if (!seed) {
        throw new NotFoundError("semente");
      }
      /// finalizar


    return PlantRepository.create(data);
  }
  async update(
    id: number,
    data: UpdatePlantDTO,
    loggedUserId: number,
    seedId: number
  ) {
    const planta = await PlantRepository.findById(id);

    if (!planta) {
      throw new NotFoundError("Planta não encontrada");
    }

    const semente = await SeedRepository.findById(seedId);

    if (!semente) {
      throw new NotFoundError("Semente não encontrada");
    }

    if (semente.usuario.id !== loggedUserId) {
      throw new ForbiddenError(
        "Você não tem permissão para acessar esta planta!"
      );
    }

    Object.assign(
      planta,
      Object.fromEntries(
        Object.entries(data).filter(([, value]) => value !== undefined)
      )
    );

    const plantaUpdate = await PlantRepository.save(planta);
    return plantaUpdate;
  }
  async delete(id: number) {
    const planta = await PlantRepository.delete(id);

    if (planta.affected === 0) {
      throw new NotFoundError("não foi encontrado planta");
    }
  }
}
