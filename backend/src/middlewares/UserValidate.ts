import { NextFunction, Request, Response } from "express";

export function validadeUser(req:Request, res: Response, next: NextFunction){

const {nome, sobrenome, email, fone, cpf, senha} = req.body

if(!nome || !sobrenome || !email || !fone || !cpf || !senha){
    return res.status(400).json({
        message: "Os campos nome, sobrenome, email, fone, cpf e senha são obrigatórios!"
    })
}
if (senha.length < 8){
    return res.status(400).json({
        message: "A senha deve ter pelo menos 8 caracteres"
    })
}
if(email.includes("@") === false){
    return res.status(400).json({
        message: "Email inválido. Por favor, informe um email corretamente"
    })
}

const cpfValidate = cpf.replace(/\D/g, " ") // todo algarismo não numérico é excluido
if(cpfValidate.length !== 11){
    return res.status(400).json({
        message: "CPF inválido. Por favor, informe um cpf válido"
    })
}
next()

}