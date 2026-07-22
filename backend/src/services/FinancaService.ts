import { FinancasRepository } from "../repositories/FinanceRepository";
import { NotFoundError } from "./UserService";
import { ForbiddenError } from "./CropService";
import { UserRepository } from "../repositories/UserRepository";

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
    async listMyFinances(userId: number) {
        return FinancasRepository.findByUserId(userId)
    }

    async create(data: {renda:number, quantidadeAdubo: number, dataGanho: Date, dataPerda: Date, quantidadeGanho:number, quantidadePerda: number}, loggedUserId:number){
          if (!data.renda) {
            throw new Error("renda é obrigatória");
        }
        if(!data.quantidadeAdubo){
            throw new Error("quantidade de adubo é obrigatório!")
        }
        const user = await UserRepository.findById(loggedUserId);
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
            user: user
        });
    }
    async update(id:number, data: {valor:number, tipo: string, quantidade: number, descricao: string, data: Date },loggedUserId:number){
        const financa = await FinancasRepository.findById(id)

        if(!financa){
            throw new NotFoundError("Finança não encontrada")
        }
        if(financa.user.id !== loggedUserId){
            throw new ForbiddenError("Você não tem permissão para acessar esta Finança!")
        }
      if(data.valor) financa.valor = data.valor
      if(data.tipo) financa.tipo = data.tipo
      if(data.quantidade) financa.quantidade = data.quantidade
      if(data.descricao) financa.descricao = data.descricao
      if(data.data) financa.data = data.data

        const financaUpdate = await FinancasRepository.save(financa)
        return financaUpdate
    }
    async delete(loggedUserId:number){
        const territorio = await FinancasRepository.delete(loggedUserId)

        if(territorio.affected === 0){
            throw new NotFoundError("não foi encontrado finança")
        }
    }
}