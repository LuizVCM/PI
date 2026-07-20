import { AppDataSource } from "../config/data-source";
import { Crop } from "../models/Crop";

const repo = AppDataSource.getRepository(Territorio);
export const TerritorioRepository = {
    async findAll(){
        return repo.find()
    },
    async findById(id:number){
        return repo.findOne({where: {id}})
    },

    async findByUserId(userId: number){
  return repo.find({where: {user: {id:userId}}, relations:['user']})
    },
    async create(data: {cep:string, tamanho:number }){
        const territorio = repo.create(data);
        return repo.save(territorio)
    }, 
    async save(territorio:Crop){
        return repo.save(territorio);
    },
    async delete(id: number){
        return repo.delete(id)
    }    
}