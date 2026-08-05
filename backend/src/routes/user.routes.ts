import { validateUserUpdate } from '../middlewares/validateUser';
import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { validateUserCreate } from "../middlewares/validateUser";

const userRoutes = Router() 
const userController = new UserController()

userRoutes.get('/', userController.list.bind(userController))
userRoutes.get('/:id', userController.getById.bind(userController))
userRoutes.post('/', validateUserCreate, userController.create.bind(userController))
userRoutes.put('/:id',  validateUserUpdate, userController.update.bind(userController))
userRoutes.delete('/:id', userController.delete.bind(userController))

export default userRoutes