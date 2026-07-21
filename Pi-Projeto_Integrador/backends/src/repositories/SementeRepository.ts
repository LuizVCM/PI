import { AppDataSource } from "../config/data-source";
import { Semente } from "../models/Sementes";
import { User } from "../models/Usuario";

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
    async create(data:{dataCompra: Date, nomePlanta: string, dataPlantio:Date, quantidade: number, user: User}){
       const semente = repo.create(data);
       return repo.save(semente)
    },
    async save(semente: Semente){
        return repo.save(semente);
    },
    async delete(id:number){
        return repo.delete(id)
    },
    async findOne(options: any) {
        return await repo.findOne(options);
}
}