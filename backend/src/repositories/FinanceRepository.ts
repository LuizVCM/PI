import { AppDataSource } from "../config/data-source";
import { Finance } from "../models/Finance";
import { User } from "../models/User";
import { CreateFinanceDTO } from "../schemas/finance.schema";

const repo = AppDataSource.getRepository(Finance);

export const FinanceRepository = {
    async findAll(){
        return repo.find()
    },
    async findById(id:number){
        return repo.findOne({where: {id}})
    },
    async findByUserId(userId: number){
        return repo.find({where: {user: {id:userId}}, relations: ['user']})
    },
    async create(data: CreateFinanceDTO, user: User){
       const financa = repo.create({ ...data, user});
       return repo.save(financa)
    },
    async save(financa: Finance){
        return repo.save(financa);
    },
    async delete(id:number){
        return repo.delete(id)
    }
}