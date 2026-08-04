import { Request, Response, NextFunction } from "express";
import { SeedService } from "../services/SeedService";

const seedService = new SeedService()
export class TerritorioController {
  async list(req: Request, res: Response, next: NextFunction) {
        try {
            const semente = await seedService.listAll()
            return res.json(semente)
        } catch (error) {
            next(error)
        }
    }
    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const semente = await seedService.getById(id)
            return res.json(semente)
        } catch (error) {
            next(error)
        }
    }
    async listMySeeds(req: Request, res: Response, next: NextFunction){
        try{
           const loggedUser = (req as any).user
            console.log(loggedUser)
           const mySeeds = await seedService.listMySeeds(loggedUser.id)
          
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
            const semente = await seedService.create({dataCompra, nomePlanta, dataPlantio, quantidade}, loggedUser.id)

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

            const semente = await seedService.update(id, {dataCompra, nomePlanta, dataPlantio, quantidade}, loggedUser.id) 
            return res.json(semente)
        } catch (error) {
            next(error)
        }
    }
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id)
           await seedService.delete(id);
            return res.status(204).send("Semente deletada com sucesso!!!")
        } catch (erro) {
            next(erro)
        }
    }


}