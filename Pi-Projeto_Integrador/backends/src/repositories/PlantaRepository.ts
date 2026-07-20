import { AppDataSource } from "../config/data-source";
import { Plantas } from "../models/Plantas";

const repo = AppDataSource.getRepository(Plantas);

export const PlantaRepository ={
    async findAll(){
        return repo.find()
    },
    async findById(id:number){
        return repo.findOne({where: {id}})
    },
    async findBySeedId(sementeId: number){
        return repo.find({where: {semente: {id:sementeId}}, relations: ['seed']})
    },
    async create(data:{nome:string, dataGerminacao: Date, iluminacao: number, regiao:number, enxofre:number, nitrogenio:number, potassio:number}){
       const planta= repo.create(data);
       return repo.save(planta)
    },
    async save(planta: Plantas){
        return repo.save(planta);
    },
    async delete(id:number){
        return repo.delete(id)
    }
}