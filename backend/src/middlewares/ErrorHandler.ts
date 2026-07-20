import { NextFunction, Request, Response } from "express";

// Esse middleware vai formatar cada resposta de erro. Ao invés de cada controller ter que pegar um erro e formatar a mensagem bonitinha, ele faz isso para todo mundo, tipo aquele seu amigo quie fez todo o trabalhp enquanto tu ficou no celular pq vcf sabia que ele ia fazer para ti msm.
export function errorHandler(error: any, req: Request, res: Response, next:NextFunction){
    // Antes de mais nada, a gent mostra o erro "na forma original" dele pra debugar
     
console.log("Erro capturado pelo erroHandler: ", error)

// Esse tal de 'ER_DUP_ENTRY' é específico do MySQL: ele acontece quando a gente tenta salvar algo que já existe e tem UNIQUE (exemplo: criar um usuário com um email que já existe)
if(error.code === 'ER_DUP_ENTRY'){
    return res.status(409).json({
        message: "Registro duplicado (email já existente)."
    })
}

// Se for quanquer outro erro que a gente não previu pq nn tem bola de cristal, ele vira um 500 genérico
return res.status(500).json({
    message: "Erro interno no servidor. Traduzindo: DEU RUIM, GURIZADA!!!!!!"
})
}