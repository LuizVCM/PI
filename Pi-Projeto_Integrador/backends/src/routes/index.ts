import { Router } from "express"
import embrapaRoutes from "./embrapa.routes"

export const routes = Router()
routes.use(embrapaRoutes)