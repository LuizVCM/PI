import { SementeRepository } from "../repositories/SeedRepository";
import { NotFoundError } from "./UserService";
import { ForbiddenError } from "./CropService";
import { UserRepository } from "../repositories/UserRepository";


export class SementeService {
    async listAll(){
        return await SementeRepository.findAll()
    }

    async getById(id:number){
         const semente = await SementeRepository.findById(id)

        if (!semente) {
            throw new NotFoundError("Semente não encontrado!!")
        }
        return semente;
    }
    async listMySeeds(userId: number) {
        return SementeRepository.findByUserId(userId)
    }

    async create(data: {dataCompra: Date, nomePlanta: string, dataPlantio:Date, quantidade: number}, loggedUserId:number){
          if (!data.dataCompra) {
            throw new Error("Data de compra é obrigatória");
        }
        if(!data.quantidade){
            throw new Error("Quantidade é obrigatória!")
        }
        const user = await UserRepository.findById(loggedUserId);
        if (!user) {
            throw new NotFoundError("Usuário não encontrado!")
        }
        return SementeRepository.create({
            dataCompra: data.dataCompra,
            nomePlanta: data.nomePlanta,
            dataPlantio: data.dataPlantio,
            quantidade: data.quantidade,
            user: user
        });
    }
    async update(id:number, data: {dataCompra?: Date, nomePlanta?: string, dataPlantio?:Date, quantidade?: number},loggedUserId:number){
        const semente = await SementeRepository.findById(id)

        if(!semente){
            throw new NotFoundError("Semente não encontrado")
        }
        if(semente.user.id !== loggedUserId){
            throw new ForbiddenError("Você não tem permissão para acessar esta semente!")
        }
       if(data.dataCompra) semente.dataCompra = data.dataCompra
       if(data.dataPlantio) semente.dataPlantio = data.dataPlantio
       if(data.nomePlanta) semente.nomePlanta = data.nomePlanta
       if(data.quantidade) semente.quantidade = data.quantidade

        const sementeUpdate = await SementeRepository.save(semente)
        return sementeUpdate
    }
    async delete(loggedUserId:number){
        const semente = await SementeRepository.delete(loggedUserId)

        if(semente.affected === 0){
            throw new NotFoundError("não foi encontrado semente")
        }
    }
}