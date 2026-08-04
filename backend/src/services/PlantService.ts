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
      throw new NotFoundError("Planta não encontrada!!");
    }
    return planta;
  }
  async listMyPlants(sementeId: number) {
    return PlantRepository.findBySeedId(sementeId);
  }

  async create(data: CreatePlantDTO, loggedUserId: number, seedId: number) {
    if (!data.nome) {
      throw new Error("Nome é obrigatório");
    }
    if (!data.regiao) {
      throw new Error("região é obrigatória!");
    }

    if (seedId) {
      // Busca a semente específica
      const seed = await SeedRepository.findById(seedId);
      if (!seed) {
        throw new NotFoundError("Semente não encontrada!");
      }
    } else {
      // Busca a primeira semente do usuário
      const sementes = await SeedRepository.findByUserId(loggedUserId);

      if (!sementes) {
        throw new NotFoundError(
          "Nenhuma semente encontrada para este usuário!"
        );
      }
    }

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
    if (data.nome) planta.nome = data.nome;
    if (data.dataGerminacao) planta.dataGerminacao = data.dataGerminacao;
    if (data.iluminacao) planta.iluminacao = data.iluminacao;
    if (data.regiao) planta.regiao = data.regiao;
    if (data.enxofre) planta.enxofre = data.enxofre;
    if (data.nitrogenio) planta.nitrogenio = data.nitrogenio;
    if (data.potassio) planta.potassio = data.potassio;

    const plantaUpdate = await PlantRepository.save(planta);
    return plantaUpdate;
  }
  async delete(loggedUserId: number) {
    const planta = await PlantRepository.delete(loggedUserId);

    if (planta.affected === 0) {
      throw new NotFoundError("não foi encontrado planta");
    }
  }
}