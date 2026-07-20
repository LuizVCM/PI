import { AppDataSource } from "../config/data-source";
import { User } from "../models/User";

const repo = AppDataSource.getRepository(User);
export const UserRepository = {
    async findAll(){
        return repo.find()
    },
    async findById(id:number){
        return repo.findOne({where: {id}})
    },

    async findBy(field: string) {
        return repo.find({relations: [`${field}`]});   
    },
    // encontrar tudo (com itens específicos)
    // async findAllSementes(){
    //     return repo.find({relations: ['seeds']});
    // },
    //  async findAllTerritorios(){
    //      return repo.find({relations:['territorios']});
    //  },
    // async findAllFinancas(){
    //     return repo.find({relations: ['financas']});
    // },

    async findByEmail(email: string){
        return repo.findOne({where: {email}})
    },
     
   // encontrar por ID
   async findByIdWith(field: string, id:number){
    return repo.findOne({where: {id}, relations: [field]})
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