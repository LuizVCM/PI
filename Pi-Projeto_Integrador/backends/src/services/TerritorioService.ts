import { TerritorioRepository } from "../repositories/TerritorioRepository";
import { UserRepository } from "../repositories/UserRepository";
import { NotFoundError } from "./UserService";

export class ForbiddenError extends Error {}

export class TerritorioService {
    async listAll(){
        return await TerritorioRepository.findAll()
    }

    async getById(id:number){
         const territorio = await TerritorioRepository.findById(id)

        if (!territorio) {
            throw new NotFoundError("Território não encontrado!!")
        }
        return territorio;
    }
    async listMyTerritorios(userId: number) {
        return TerritorioRepository.findByUserId(userId)
    }

    async create(data: {cep: string, tamanho:number}, loggedUserId:number){
          if (!data.cep) {
            throw new Error("CEP é obrigatório");
        }
        if(!data.tamanho){
            throw new Error("Tamanho é obrigatório!")
        }
        const user = await UserRepository.findById(loggedUserId);
        if (!user) {
            throw new NotFoundError("Usuário não encontrado!")
        }
        return TerritorioRepository.create({
            cep: data.cep,
            tamanho: data.tamanho,
            user: user
        });
    }
    async update(id:number, data: {cep?:string, tamanho?: number},loggedUserId:number){
        const territorio = await TerritorioRepository.findById(id)

        if(!territorio){
            throw new NotFoundError("Território não encontrado")
        }
        if(territorio.user.id !== loggedUserId){
            throw new ForbiddenError("Você não tem permissão para acessar este território!")
        }
        if(data.cep) territorio.cep = data.cep
        if(data.tamanho) territorio.tamanho = data.tamanho

        const territorioUpdate = await TerritorioRepository.create(territorio)
        return territorio
    }
    async delete(loggedUserId:number){
        const territorio = await TerritorioRepository.delete(loggedUserId)

        if(territorio.affected === 0){
            throw new NotFoundError("não foi encontrado território")
        }
    }
}