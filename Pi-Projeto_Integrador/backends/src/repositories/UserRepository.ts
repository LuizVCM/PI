import { AppDataSource } from "../config/data-source";
import { User } from "../models/Usuario";

const repo = AppDataSource.getRepository(User);
export const UserRepository = {
    // encontrar tudo
    async findAllSementes(){
        return repo.find({relations: ['seeds']});
    },
    async findAllTerritorios(){
        return repo.find({relations:['territorios']});
    },
    async findAllFinancas(){
        return repo.find({relations: ['financas']});
    },

   // encontrar por ID
    async findByIdSemente(id: number){
        return repo.findOne({where: { id }, relations: ['seeds']});
    }, 
    async findByIdTerritorio(id: number){
        return repo.findOne({where: { id }, relations: ['territorios']});
    }, 
    async findByIdFinancas(id: number){
        return repo.findOne({where: { id }, relations: ['financas']});
    },
    // criar user 
    async create(data: {nome: string, sobrenome: string, email: string,fone: string, cpf: string, senha: string}){
        const user = repo.create(data);
        return repo.save(user)
    }, 
    async save(user:User){
        return repo.save(user);
    },
    async delete(id: number){
        return repo.delete(id)
    }    
}