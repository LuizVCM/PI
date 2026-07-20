import { AppDataSource } from "../config/data-source";
import { Financas } from "../models/Financas";

const repo = AppDataSource.getRepository(Financas);

export const FinancasRepository = {
    async findAll(){
        return repo.find()
    },
    async findById(id:number){
        return repo.findOne({where: {id}})
    },
    async findByUserId(userId: number){
        return repo.find({where: {user: {id:userId}}, relations: ['user']})
    },
    async create(data:{renda:number, quantidadeAdubo:number, dataGanho: Date, dataPerda: Date, quantidadeGanho:number, quantidadePerda:number}){
       const financa = repo.create(data);
       return repo.save(financa)
    },
    async save(financa: Financas){
        return repo.save(financa);
    },
    async delete(id:number){
        return repo.delete(id)
    }
}