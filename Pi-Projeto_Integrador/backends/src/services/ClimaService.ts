import { ClimaRepository } from "../repositories/ClimaRepository";
import { NotFoundError } from "./UserService";
import { ForbiddenError } from "./TerritorioService";
import { UserRepository } from "../repositories/UserRepository";
import { Territorio } from "../models/Territorio";
import { SementeRepository } from "../repositories/SementeRepository";
import { TerritorioRepository } from "../repositories/TerritorioRepository";



export class ClimaService {
    async listAll(){
        return await ClimaRepository.findAll()
    }

    async getById(id:number){
         const clima = await ClimaRepository.findById(id)

        if (!clima) {
            throw new NotFoundError("Clima exato não encontrado!!")
        }
        return clima;
    }
    async listMyWeathers(territorioId: number) {
        return await ClimaRepository.findByTerritorioId(territorioId)
    }

async create(data: {data: Date, chuva:number, temperatura: number, vento: number, umidade:number, territorioId?: number}, loggedUserId:number){
    if (!data.data) {
        throw new Error("Informe a data do clima!");
    }
    
    // Se forneceu um territorioId específico
    let territorio;
    if (data.territorioId) {
        territorio = await TerritorioRepository.findOne({ 
            where: { id: data.territorioId, user: { id: loggedUserId } }
        });
    } else {
        // Ou pega o primeiro
        const territorios = await TerritorioRepository.findByUserId(loggedUserId);
        territorio = territorios?.[0];
    }
    
    if (!territorio) {
        throw new NotFoundError("território não encontrado!");
    }
    
    return await ClimaRepository.create({
        data: data.data,
        chuva: data.chuva,
        temperatura: data.temperatura,
        vento: data.vento,
        umidade: data.umidade,
        territorio: territorio
    });
}
    async update(id:number, data: {data: Date, chuva:number, temperatura: number, vento: number, umidade:number},loggedUserId:number){
        const clima = await ClimaRepository.findById(id)

        if(!clima){
            throw new NotFoundError("clima exato não encontrado")
        }
        if(clima.territorio.user.id !== loggedUserId){
            throw new ForbiddenError("Você não tem permissão para acessar este clima!")
        }

        if(data.data) clima.data = data.data
        if(data.chuva) clima.chuva = data.chuva
        if(data.temperatura) clima.temperatura = data.temperatura
        if(data.vento) clima.vento = data.vento
        if(data.umidade) clima.umidade = data.umidade
   

        const climaUpdate = await ClimaRepository.save(clima)
        return climaUpdate
    }
    async delete(loggedUserId:number){
        const clima = await ClimaRepository.delete(loggedUserId)

        if(clima.affected === 0){
            throw new NotFoundError("não foi encontrado Clima")
        }
    }
}