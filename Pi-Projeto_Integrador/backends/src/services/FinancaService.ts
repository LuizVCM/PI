import { FinancasRepository } from "../repositories/FinancasRepository";
import { NotFoundError } from "./UserService";
import { ForbiddenError } from "./TerritorioService";

export class FinancaService {
    async listAll(){
        return await FinancasRepository.findAll()
    }

    async getById(id:number){
         const financa = await FinancasRepository.findById(id)

        if (!financa) {
            throw new NotFoundError("Finança não encontrada!!")
        }
        return financa;
    }
    async listMyTerritorios(userId: number) {
        return FinancasRepository.findByUserId(userId)
    }

    async create(data: {renda:number, quantidadeAdubo: number, dataGanho: Date, dataPerda: Date, quantidadeGanho:number, quantidadePerda: number}, loggedUserId:number){
          if (!data.renda) {
            throw new Error("renda é obrigatória");
        }
        if(!data.quantidadeAdubo){
            throw new Error("quantidade de adubo é obrigatório!")
        }
        const user = await FinancasRepository.findById(loggedUserId);
        if (!user) {
            throw new NotFoundError("Usuário não encontrado!")
        }
        return FinancasRepository.create({
            renda: data.renda,
            quantidadeAdubo: data.quantidadeAdubo,
            dataGanho: data.dataGanho,
            dataPerda: data.dataPerda,
            quantidadeGanho: data.quantidadeGanho,
            quantidadePerda: data.quantidadePerda,
            user
        });
    }
    async update(id:number, data: {renda:number, quantidadeAdubo: number, dataGanho: Date, dataPerda: Date, quantidadeGanho:number, quantidadePerda: number},loggedUserId:number){
        const financa = await FinancasRepository.findById(id)

        if(!financa){
            throw new NotFoundError("Finança não encontrada")
        }
        if(financa.user.id !== loggedUserId){
            throw new ForbiddenError("Você não tem permissão para acessar esta Finança!")
        }
      if(data.renda) financa.renda = data.renda
      if(data.quantidadeAdubo) financa.quantidadeAdubo = data.quantidadeAdubo
      if(data.dataGanho) financa.dataGanho = data.dataGanho
      if(data.dataPerda) financa.dataPerda = data.dataPerda
      if(data.quantidadeGanho) financa.quantidadeGanho = data.quantidadeGanho
      if(data.quantidadePerda) financa.quantidadePerda = data.quantidadePerda

        const financaUpdate = await FinancasRepository.create(financa)
        return financaUpdate
    }
    async delete(loggedUserId:number){
        const territorio = await FinancasRepository.delete(loggedUserId)

        if(territorio.affected === 0){
            throw new NotFoundError("não foi encontrado finança")
        }
    }
}