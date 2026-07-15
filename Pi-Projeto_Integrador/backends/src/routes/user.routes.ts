import { Router } from "express";
import { UserController } from "../controllers/UserControllers";
import { validadeUser } from "../middlewares/UserValidate";

const router = Router() 
const userController = new UserController()

router.get('/', userController.list.bind(userController))
router.get('/:id', userController.getById.bind(userController))
router.post('/', validadeUser, userController.create.bind(userController))
router.put('/:id', userController.update.bind(userController))
router.delete('/:id', userController.delete.bind(userController))


   export default router