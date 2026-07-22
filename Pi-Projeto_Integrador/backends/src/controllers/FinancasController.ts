import { Request, Response, NextFunction } from "express";
import { FinancaService } from "../services/FinancaService";

export const financaService = new FinancaService()
export class FinancaController {
  async list(req: Request, res: Response, next: NextFunction) {
        try {
            const financa = await financaService.listAll()
            return res.json(financa)
        } catch (error) {
            next(error)
        }
    }
    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const financa = await financaService.getById(id)
            return res.json(financa)
        } catch (error) {
            next(error)
        }
    }
    async listMyPosts(req: Request, res: Response, next: NextFunction){
        try{
           const loggedUser = (req as any).user
            console.log(loggedUser)
           const myfinances = await financaService.listMyFinances(loggedUser.id)
          
           return res.status(200).json(
            myfinances
           )

        }catch(error){
      next(error)
        }
    }
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { renda, quantidadeAdubo, dataGanho, dataPerda, quantidadeGanho, quantidadePerda } = req.body
            const loggedUser = (req as any).user;
            const financa = await financaService.create({renda, quantidadeAdubo, dataGanho, dataPerda, quantidadeGanho, quantidadePerda}, loggedUser.id)

            return res.status(201).json(financa)
        } catch (error) {
            next(error)
        }
    }
    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id)
            const { renda, quantidadeAdubo, dataGanho, dataPerda, quantidadeGanho, quantidadePerda } = req.body
            const loggedUser = (req as any).user;

            const financa = await financaService.update(id, {renda, quantidadeAdubo, dataGanho, dataPerda, quantidadeGanho, quantidadePerda}, loggedUser.id) 
            return res.json(financa)
        } catch (error) {
            next(error)
        }
    }
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id)
           await financaService.delete(id);
            return res.status(204).send("finança deletada com sucesso!!!")
        } catch (erro) {
            next(erro)
        }
    }


}