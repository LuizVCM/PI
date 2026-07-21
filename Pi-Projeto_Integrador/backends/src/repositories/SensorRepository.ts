import { AppDataSource } from "../config/data-source";
import { Sensor } from "../models/Sensores";
import { User } from "../models/Usuario";

const repo = AppDataSource.getRepository(Sensor);

export const PlantaRepository ={
    async findAll(){
        return repo.find()
    },
    async findById(id:number){
        return repo.findOne({where: {id}})
    },
    async findBy(sementeId: number){
        return repo.find({where: {semente: {id:sementeId}}, relations: ['seed']})
    },
    async create(data:{nome:string, dataGerminacao: Date, iluminacao: number, regiao:number, enxofre:number, nitrogenio:number, potassio:number, user:User}){
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