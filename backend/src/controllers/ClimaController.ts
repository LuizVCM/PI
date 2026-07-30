import { Request, Response, NextFunction } from "express";
import { ClimaService } from "../services/WeatherService";

export const climaService = new ClimaService()
export class ClimaController {
  async list(req: Request, res: Response, next: NextFunction) {
        try {
            const clima = await climaService.listAll()
            return res.json(clima)
        } catch (error) {
            next(error)
        }
    }
    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const clima = await climaService.getById(id)
            return res.json(clima)
        } catch (error) {
            next(error)
        }
    }
    async listMyPlants(req: Request, res: Response, next: NextFunction){
        try{
           const loggedUser = (req as any).user
            console.log(loggedUser)
           const myWeathers = await climaService.listMyWeathers(loggedUser.id)
          
           return res.status(200).json(
            myWeathers
           )

        }catch(error){
      next(error)
        }
    }
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { data, chuva, temperatura, vento, umidade } = req.body

            const loggedUser = (req as any).user;

            const clima = await climaService.create({data, chuva, temperatura, vento, umidade}, loggedUser.id)

            return res.status(201).json(clima)
        } catch (error) {
            next(error)
        }
    }
    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id)
            const {data, chuva, temperatura, vento, umidade } = req.body
            const loggedUser = (req as any).user;

            const clima = await climaService.update(id, {data, chuva, temperatura, vento, umidade}, loggedUser.id) 
            return res.json(clima)
        } catch (error) {
            next(error)
        }
    }
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id)
           await climaService.delete(id);
            return res.status(204).send("clima deletado com sucesso!!!")
        } catch (erro) {
            next(erro)
        }
    }


}