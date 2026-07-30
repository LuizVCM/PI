import { Request, Response, NextFunction } from "express";
import { PlantaService } from "../services/PlantaService";
import { Semente } from "../models/Sementes";

export const plantaService = new PlantaService()
export class PlantaController {
  async list(req: Request, res: Response, next: NextFunction) {
        try {
            const planta = await plantaService.listAll()
            return res.json(planta)
        } catch (error) {
            next(error)
        }
    }
    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const planta = await plantaService.getById(id)
            return res.json(planta)
        } catch (error) {
            next(error)
        }
    }
    async listMyPlants(req: Request, res: Response, next: NextFunction){
        try{
           const loggedUser = (req as any).user
            console.log(loggedUser)
           const myPlants = await plantaService.listMyPlants(loggedUser.id)
          
           return res.status(200).json(
            myPlants
           )

        }catch(error){
      next(error)
        }
    }
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { nome, dataGerminacao, iluminacao, regiao, enxofre, nitrogenio, potassio } = req.body

            const loggedUser = (req as any).user;
            const semente:Semente = new Semente()
            const planta = await plantaService.create({nome, dataGerminacao, iluminacao, regiao, enxofre, nitrogenio, potassio, sementeId:semente}, loggedUser.id)

            return res.status(201).json(planta)
        } catch (error) {
            next(error)
        }
    }
    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id)
            const { nome, dataGerminacao, iluminacao, regiao, enxofre, nitrogenio, potassio } = req.body
            const loggedUser = (req as any).user;

            const planta = await plantaService.update(id, {nome, dataGerminacao, iluminacao, regiao, enxofre, nitrogenio, potassio}, loggedUser.id) 
            return res.json(planta)
        } catch (error) {
            next(error)
        }
    }
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id)
           await plantaService.delete(id);
            return res.status(204).send("Planta deletada com sucesso!!!")
        } catch (erro) {
            next(erro)
        }
    }


}