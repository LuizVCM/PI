import { PlantRepository } from "../repositories/PlantRepository";
import { NotFoundError } from "../errors/NotFoundError";
import { ForbiddenError } from "../errors/ForbiddenError";
import { Seed } from "../models/Seed";
import { SeedRepository } from "../repositories/SeedRepository";

export class PlantaService {
    async listAll() {
        return await PlantRepository.findAll()
    }

    async getById(id: number) {
        const planta = await PlantRepository.findById(id)

        if (!planta) {
            throw new NotFoundError("Planta não encontrada!!")
        }
        return planta;
    }
    async listMyPlants(sementeId: number) {
        return PlantRepository.findBySeedId(sementeId)
    }

    async create(data: {
        sementeId: Seed;
        nome: string;
        dataGerminacao: Date;
        iluminacao: number;
        regiao: string;
        enxofre: number;
        nitrogenio: number;
        potassio: number;
    }, loggedUserId: number) {

        if (!data.nome) {
            throw new Error("Nome é obrigatório");
        }
        if (!data.regiao) {
            throw new Error("região é obrigatória!");
        }

        let seed = null;

        if (data.sementeId) {
            // Busca a semente específica
            seed = await SeedRepository.findOne({
                where: {
                    id: data.sementeId,
                    user: { id: loggedUserId }
                },
                relations: ['user']
            });

            if (!seed) {
                throw new NotFoundError("Semente não encontrada!");
            }


        } else {
            // Busca a primeira semente do usuário
            const sementes = await SeedRepository.findByUserId(loggedUserId);
            seed = sementes?.[0] || null; // Pega a primeira ou null

            if (!seed) {
                throw new NotFoundError("Nenhuma semente encontrada para este usuário!");
            }
        }

        return PlantRepository.create({
            nome: data.nome,
            dataGerminacao: data.dataGerminacao,
            iluminacao: data.iluminacao,
            regiao: data.regiao,
            enxofre: data.enxofre,
            nitrogenio: data.nitrogenio,
            potassio: data.potassio,
            semente: seed 
        });
    }
    async update(id: number, data: { nome: string, dataGerminacao: Date, iluminacao: number, regiao: number, enxofre: number, nitrogenio: number, potassio: number }, loggedUserId: number) {
        const planta = await PlantRepository.findById(id)

        if (!planta) {
            throw new NotFoundError("planta não encontrada")
        }
        if (planta.sementes.user.id !== loggedUserId) {
            throw new ForbiddenError("Você não tem permissão para acessar esta planta!")
        }
        if (data.nome) planta.nome = data.nome
        if (data.dataGerminacao) planta.dataGerminacao = data.dataGerminacao
        if (data.iluminacao) planta.iluminacao = data.iluminacao
        if (data.regiao) planta.regiao = data.regiao
        if (data.enxofre) planta.enxofre = data.enxofre
        if (data.nitrogenio) planta.nitrogenio = data.nitrogenio
        if (data.potassio) planta.potassio = data.potassio

        const plantaUpdate = await PlantRepository.save(planta)
        return plantaUpdate
    }
    async delete(loggedUserId: number) {
        const planta = await PlantRepository.delete(loggedUserId)

        if (planta.affected === 0) {
            throw new NotFoundError("não foi encontrado planta")
        }
    }
}