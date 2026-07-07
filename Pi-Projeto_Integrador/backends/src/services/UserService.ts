import { UserRepository } from "../repositories/UserRepository";
import bcrypt from 'bcrypt';


export class NotFoundError extends Error {}

export class UserService {
    async listAllSemente(){
     return await UserRepository.findAllSementes();
    }
        async listAllTerritorios(){
     return await UserRepository.findAllTerritorios();
    }
        async listAllFinancas(){
     return await UserRepository.findAllFinancas();
    }

}


