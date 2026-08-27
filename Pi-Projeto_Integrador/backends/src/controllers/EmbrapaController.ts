import { Request, Response } from 'express';
import { buscarDadosEmbrapa } from '../services/EmbrapaService';

export async function getEstacoes(req: Request, res: Response) {
  try {
    const dados = await buscarDadosEmbrapa();
    console.log(dados)
    res.json(dados); // Retorna os dados com sucesso
  } catch (erro) {
    console.error("Erro na API da Embrapa:", erro);
    res.status(500).json({ erro: "Falha ao buscar os dados no servidor." });
  }
}