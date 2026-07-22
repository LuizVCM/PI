import { AppDataSource } from "../config/data-source";
import { Seed } from "../models/Seed";
import { User } from "../models/User";

const repo = AppDataSource.getRepository(Seed);

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
    async save(semente: Seed){
        return repo.save(semente);
    },
    async delete(id:number){
        return repo.delete(id)
    },
    async findOne(options: any) {
        return await repo.findOne(options);
}
}