import { Router } from 'express';
import { getEstacoes } from '../controllers/EmbrapaController'

const embrapaRoutes = Router();

// Define a rota específica (o prefixo '/api/embrapa' definiremos no servidor)
embrapaRoutes.get('/estacoes', getEstacoes);

export default embrapaRoutes;