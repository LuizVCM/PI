import { Request, Response, NextFunction } from "express";
import { SensorService } from "../services/SensorService";
import { climaService } from "./ClimaController";
import { territorioService } from "./TerritorioController";


export const sensorService = new SensorService()
export class SensorController {
  async list(req: Request, res: Response, next: NextFunction) {
        try {
            const sensor = await sensorService.listAll()
            return res.json(sensor)
        } catch (error) {
            next(error)
        }
    }
    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const sensor = await sensorService.getById(id)
            return res.json(sensor)
        } catch (error) {
            next(error)
        }
    }
    async listMySensors(req: Request, res: Response, next: NextFunction){
        try{
           const loggedUser = (req as any).user
            console.log(loggedUser)
           const mySensors = await sensorService.listMySensors(loggedUser.id)
           return res.status(200).json(
            mySensors
           )

        }catch(error){
      next(error)
        }
    }
    async create(req: Request, res: Response, next: NextFunction) {
     const loggedUser = (req as any).user

     // procura os id para relação (só assim deu certo)
  const territorio = await territorioService.findByUserId(loggedUser)
     const clima = await climaService.findByTerritorioId(loggedUser.id)
    if (!clima) {
        throw new Error('Território não possui um clima cadastrado');
    }
    if (!territorio) {
        throw new Error('Usuário não possui um território cadastrado');
    }
        try {
            const { funcao, dados } = req.body

            const loggedUser = (req as any).user;

            const sensor = await sensorService.create({climaId: clima.id, funcao, dados}, loggedUser.id)

            return res.status(201).json(sensor)
        } catch (error) {
            next(error)
        }
    }
    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id)
            const {funcao, dados} = req.body
            const loggedUser = (req as any).user;

            const sensor = await sensorService.update(id, {funcao, dados}, loggedUser.id) 
            return res.json(sensor)
        } catch (error) {
            next(error)
        }
    }
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id)
           await sensorService.delete(id);
            return res.status(204).send("sensor deletado do sistema com sucesso!!!")
        } catch (erro) {
            next(erro)
        }
    }


}