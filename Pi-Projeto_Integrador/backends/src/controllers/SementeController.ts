import { Request, Response, NextFunction } from "express";
import { SementeService } from "../services/SementeService";

export const sementeService = new SementeService()
export class TerritorioController {
  async list(req: Request, res: Response, next: NextFunction) {
        try {
            const semente = await sementeService.listAll()
            return res.json(semente)
        } catch (error) {
            next(error)
        }
    }
    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const semente = await sementeService.getById(id)
            return res.json(semente)
        } catch (error) {
            next(error)
        }
    }
    async listMySeeds(req: Request, res: Response, next: NextFunction){
        try{
            // Pega as infos do usuário que está logado, através da Request, que recebeu estas infos pelo token
           const loggedUser = (req as any).user
            console.log(loggedUser)
           // Agora sim podemos listar os posts de um usuário logado
           const mySeeds = await sementeService.listMySeeds(loggedUser.id)
          
           return res.status(200).json(
            mySeeds
           )

        }catch(error){
      next(error)
        }
    }
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { dataCompra, nomePlanta, dataPlantio, quantidade } = req.body
            const loggedUser = (req as any).user;
            const semente = await sementeService.create({dataCompra, nomePlanta, dataPlantio, quantidade}, loggedUser.id)

            return res.status(201).json(semente)
        } catch (error) {
            next(error)
        }
    }
    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id)
            const { dataCompra, nomePlanta, dataPlantio, quantidade} = req.body
            const loggedUser = (req as any).user;

            const semente = await sementeService.update(id, {dataCompra, nomePlanta, dataPlantio, quantidade}, loggedUser.id) 
            return res.json(semente)
        } catch (error) {
            next(error)
        }
    }
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id)
           await sementeService.delete(id);
            return res.status(204).send("Semente deletada com sucesso!!!")
        } catch (erro) {
            next(erro)
        }
    }


}