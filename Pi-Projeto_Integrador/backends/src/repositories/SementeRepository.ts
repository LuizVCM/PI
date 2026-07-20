import { AppDataSource } from "../config/data-source";
import { Semente } from "../models/Sementes";

const repo = AppDataSource.getRepository(Semente);

export const SementeRepository ={
    async findAll(){
        return repo.find()
    },
    async findById(id:number){
        return repo.findOne({where: {id}})
    },
    async findByUserId(userId: number){
        return repo.find({where: {user: {id:userId}}, relations: ['user']})
    },
    async create(data:{dataCompra: Date, nomePlanta: string, dataPlantio:Date, quantidade: number}){
       const semente = repo.create(data);
       return repo.save(semente)
    },
    async save(semente: Semente){
        return repo.save(semente);
    },
    async delete(id:number){
        return repo.delete(id)
    }
}