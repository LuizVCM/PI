import { AppDataSource } from "../config/data-source";
import { Clima } from "../models/Clima";
import { Territorio } from "../models/Territorio";

const repo = AppDataSource.getRepository(Clima);

export const ClimaRepository ={
    async findAll(){
        return repo.find()
    },
    async findById(id:number){
        return repo.findOne({where: {id}})
    },
    async findByTerritorioId(territorioId: number){
        return repo.find({where: {territorio: {id:territorioId}}, relations: ['territorio']})
    },
    async create(data:{data: Date, chuva: number, temperatura:number, vento:number, umidade:number, territorio: Territorio}){
       const clima = repo.create(data);
       return repo.save(clima)
    },
    async save(clima: Clima){
        return repo.save(clima);
    },
    async delete(id:number){
        return repo.delete(id)
    },
     async findOne(options: any) {
        return await repo.findOne(options);
    }
}