import { TerritorioRepository } from "../repositories/TerritorioRepository";
import bcrypt from 'bcrypt'
import { omitPassword } from "../utils/omitPassword";
import { generateToken } from "../utils/jwt";
import { NotFoundError } from "./UserService";
import { Unauthorized } from "./UserService";

export class TerritorioService {
    async listAll(){
        return await TerritorioRepository.findAll()
    }

    async getById(id:number){
        return await TerritorioRepository.findById(id)
    }
    async create(data: {cep: string, tamanho:number}){
        // const
    }
}