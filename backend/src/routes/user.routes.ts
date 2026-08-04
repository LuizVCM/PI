import { validateUserUpdate } from '../middlewares/validateUSer';
import { Router } from "express";
import { UserController } from "../controllers/UserControllers";
import { validateUserCreate } from "../middlewares/validateUSer";

const router = Router() 
const userController = new UserController()

router.get('/', userController.list.bind(userController))
router.get('/:id', userController.getById.bind(userController))
router.post('/', validateUserCreate, userController.create.bind(userController))
router.put('/:id',  validateUserUpdate, userController.update.bind(userController))
router.delete('/:id', userController.delete.bind(userController))


export default router