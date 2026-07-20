import { PlantaRepository } from "../repositories/PlantaRepository";
import { NotFoundError } from "./UserService";
import { ForbiddenError } from "./TerritorioService";
import { UserRepository } from "../repositories/UserRepository";

export class PlantaService {
    async listAll(){
        return await PlantaRepository.findAll()
    }

    async getById(id:number){
         const planta = await PlantaRepository.findById(id)

        if (!planta) {
            throw new NotFoundError("Planta não encontrada!!")
        }
        return planta;
    }
    async listMyPlants(sementeId: number) {
        return PlantaRepository.findBySeedId(sementeId)
    }

    async create(data: {nome:string, dataGerminacao: Date, iluminacao: number, regiao:number, enxofre:number, nitrogenio:number, potassio:number}, loggedUserId:number){
          if (!data.nome) {
            throw new Error("Nome é obrigatório");
        }
        if(!data.regiao){
            throw new Error("região é obrigatória!")
        }
        const user = await UserRepository.findById(loggedUserId);
        if (!user) {
            throw new NotFoundError("Usuário não encontrado!")
        }
        return PlantaRepository.create({
            nome: data.nome,
            dataGerminacao: data.dataGerminacao,
            iluminacao: data.iluminacao,
            regiao: data.regiao,
            enxofre:data.enxofre,
            nitrogenio:data.nitrogenio,
            potassio:data.potassio,
            user: user.semente
        });
    }
    async update(id:number, data: {nome:string, dataGerminacao: Date, iluminacao: number, regiao:number, enxofre:number, nitrogenio:number, potassio:number},loggedUserId:number){
        const planta = await PlantaRepository.findById(id)

        if(!planta){
            throw new NotFoundError("planta não encontrada")
        }
        if(planta.semente.id !== loggedUserId){
            throw new ForbiddenError("Você não tem permissão para acessar esta planta!")
        }
      if(data.nome) planta.nome = data.nome
      if(data.dataGerminacao) planta.dataGerminacao = data.dataGerminacao
      if(data.iluminacao) planta.iluminacao = data.iluminacao
      if(data.regiao) planta.regiao = data.regiao
      if(data.enxofre) planta.enxofre = data.enxofre
      if(data.nitrogenio) planta.nitrogenio = data.nitrogenio
      if(data.potassio) planta.potassio = data.potassio

        const plantaUpdate = await PlantaRepository.create(planta)
        return plantaUpdate
    }
    async delete(loggedUserId:number){
        const planta = await PlantaRepository.delete(loggedUserId)

        if(planta.affected === 0){
            throw new NotFoundError("não foi encontrado planta")
        }
    }
}