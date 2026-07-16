import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/UserService";

 const userService = new UserService();
export class UserController{
   
    async list(req: Request, res:Response, next: NextFunction){
         try{
               const users = await userService.listAll()

               return res.status(200).json(users)
         }catch(error){
            next(error)
         }
}
 async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const user = await userService.getById(id)
            return res.json(user)
        } catch (error) {
            next(error)
        }
    }
    // POST /users/:id -> busca um cupinxa pelo id
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { nome, sobrenome, email, fone, cpf, senha } = req.body // pega name, email, password pelo corpo da requisição
            const user = await userService.create({ nome, sobrenome, email, fone, cpf, senha })
            return res.status(201).json(user)

        } catch (error) {
            next(error)

        }
    }
    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id)
            const { nome, sobrenome, email, fone, cpf, senha  } = req.body
            const user = await userService.update(id, { nome, sobrenome, email, fone, cpf, senha })
            return res.json(user)
        } catch (error) {
            next(error)
        }
    }
    async delete(req: Request, res: Response, next: NextFunction){
        try{
    const id = Number(req.params.id)

    const user = await userService.delete(id);
    return res.status(204).send("Usuário deletado com sucesso!!")
        }catch(error){
next()
        }
    }
}
