import { SensorRepository } from "../repositories/SensorRepository";
import { WeatherRepository } from "../repositories/WeatherRepository";
import { NotFoundError } from "../errors/NotFoundError";
import { Weather } from "../models/Weather";
import { ForbiddenError } from "../errors/ForbiddenError";
import { CreateSensorDTO } from "../schemas/sensor.schema";
import { CropRepository } from "../repositories/CropRepository";

export class SensorService {
  async listAll() {
    return await SensorRepository.findAll();
  }

  async getById(id: number) {
    const sensor = await SensorRepository.findById(id);

    if (!sensor) {
      throw new NotFoundError("Sensor nhão encontrado!!");
    }
    return sensor;
  }
  async listMySensors(cropId: number) {
    return SensorRepository.findByCropId(cropId);
  }

  // async create(data: {
  //     climaId: number,
  //     funcao: string,
  //     dados: string
  // }, loggedUserId: number) {

  //     if (!data.funcao) {
  //         throw new Error("Função é obrigatória");
  //     }

  //     let clima: Weather | null = null; // Aqui pode ter ou não um valor

  //     if (data.climaId) {
  //         // Busca o clima específico
  //         clima = await ClimaRepository.findOne({
  //             where: {
  //                 id: data.climaId,
  //                 territorio: { user: { id: loggedUserId } }
  //             },
  //             relations: ['territorio']
  //         });

  //         if (!clima) {
  //             throw new NotFoundError("Clima não encontrado!");
  //         }

  //     } else {
  //         // Busca sensores e pega o clima do primeiro
  //         const sensores = await SensorRepository.findByClimaId(data.climaId);
  //         const sensor = sensores?.[0] || null;

  //         if (!sensor) {
  //             throw new NotFoundError("Nenhum sensor encontrado!");
  //         }

  //         clima = sensor.clima;
  //     }

  //     return SensorRepository.create({
  //         funcao: data.funcao,
  //         dados: data.dados,
  //         clima: clima
  //     });
  // }
  // async update(id: number, data: { funcao:string, dados: string}, loggedUserId: number) {
  //     const sensor = await SensorRepository.findById(id)

  //     if (!sensor) {
  //         throw new NotFoundError("sensor não encontrado")
  //     }
  //     if (sensor.clima.territorio.user.id!== loggedUserId) {
  //         throw new ForbiddenError("Você não tem permissão para acessar esta planta!")
  //     }

  //     if(data.funcao) sensor.funcao = data.funcao
  //     if(data.dados) sensor.dados = data.dados

  //     const sensorUpdate = await SensorRepository.save(sensor)
  //     return sensorUpdate
  // }

  async create(data: CreateSensorDTO, cropId: number) {
    const territorio = await CropRepository.findById(cropId);
    if (!territorio) {
      throw new NotFoundError("Território não encontrado");
    }
    return await SensorRepository.create(data, territorio);
  }
  async delete(loggedUserId: number) {
    const sensor = await SensorRepository.delete(loggedUserId);

    if (sensor.affected === 0) {
      throw new NotFoundError("não foi encontrado o sensor");
    }
  }
}