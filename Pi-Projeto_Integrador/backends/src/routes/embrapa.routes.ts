import { Router } from 'express';
import { getEstacoes } from '../controllers/EmbrapaController'

const embrapaRoutes = Router();

// Define a rota específica (o prefixo '/api/embrapa' definiremos no servidor)
embrapaRoutes.get('/plantas-daninhas-nomes-comuns', getEstacoes);

export default embrapaRoutes;