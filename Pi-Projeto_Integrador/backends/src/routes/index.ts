import { Router } from "express"
import embrapaRoutes from "./embrapa.routes"

export const routes = Router()  
routes.use("/plantas-daninhas-nomes-comuns", embrapaRoutes)