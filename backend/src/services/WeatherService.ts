import { WeatherRepository } from "../repositories/WeatherRepository";
import { CropRepository } from "../repositories/CropRepository";
import { ForbiddenError } from "../errors/ForbiddenError";
import { NotFoundError } from "../errors/NotFoundError";

export class ClimaService {
    async listAll(){
        return await WeatherRepository.findAll()
    }

    async getById(id:number){
         const clima = await WeatherRepository.findById(id)

        if (!clima) {
            throw new NotFoundError("Clima exato não encontrado!!")
        }
        return clima;
    }
    async findByTerritorioId(territorioId: number) {
    return await WeatherRepository.findOne({ 
        where: { territorioId: territorioId } 
    });
}
    async listMyWeathers(territorioId: number) {
        return await WeatherRepository.findByTerritorioId(territorioId)
    }

async create(data: {data: Date, chuva:number, temperatura: number, vento: number, umidade:number, territorioId?: number}, loggedUserId:number){
    if (!data.data) {
        throw new Error("Informe a data do clima!");
    }
    
    // Se forneceu um territorioId específico
    let territorio;
    if (data.territorioId) {
        territorio = await CropRepository.findOne({ 
            where: { id: data.territorioId, user: { id: loggedUserId } }
        });
    } else {
        // Ou pega o primeiro
        const territorios = await CropRepository.findByUserId(loggedUserId);
        territorio = territorios?.[0];
    }
    
    if (!territorio) {
        throw new NotFoundError("território não encontrado!");
    }
    
    return await WeatherRepository.create({
        data: data.data,
        chuva: data.chuva,
        temperatura: data.temperatura,
        vento: data.vento,
        umidade: data.umidade,
        territorio: territorio
    });
}
    async update(id:number, data: {data: Date, chuva:number, temperatura: number, vento: number, umidade:number},loggedUserId:number){
        const clima = await WeatherRepository.findById(id)

        if(!clima){
            throw new NotFoundError("clima exato não encontrado")
        }
        if(clima.territorio.user.id !== loggedUserId){
            throw new ForbiddenError("Você não tem permissão para acessar este clima!")
        }

        if(data.data) clima.data = data.data
        if(data.chuva) clima.precipitacao = data.chuva
        if(data.temperatura) clima.temperatura = data.temperatura
        if(data.vento) clima.vento = data.vento
        if(data.umidade) clima.umidade = data.umidade
   

        const climaUpdate = await WeatherRepository.save(clima)
        return climaUpdate
    }
    async delete(loggedUserId:number){
        const clima = await WeatherRepository.delete(loggedUserId)

        if(clima.affected === 0){
            throw new NotFoundError("não foi encontrado Clima")
        }
    }
}