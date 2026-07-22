import { UserRepository } from "../repositories/UserRepository";
import bcrypt from 'bcrypt';
import { omitPassword } from "../utils/omitPassword";
import { generateToken } from "../utils/jwt";
import { User } from "../models/User";



export class NotFoundError extends Error { }
export class Unauthorized extends Error { }

export class UserService {

    async listAll() {
        return await UserRepository.findAll()
    }

    async listAllBy(field: string) {
        if (!field || (field !== "territorio" && field !== "seeds" && field !== "finances")) {
            throw new NotFoundError("Informaçõs não encontradas")
        }
        return await UserRepository.findBy(field)
    }
    async listByEmail(email: string) {
        if (!email){
            throw new NotFoundError("Informações não encontradas")
        }
        return await UserRepository.findByEmail(email);
    }
    async getById(id: number) {
         if (!id){
            throw new NotFoundError("Usuario não foi encontrado")
        }
        return await UserRepository.findById(id);
    }

    async listByIdWith(field: string, id: number) {
        if (!field || (field !== "territorio" && field !== "seeds" && field !== "finances")) {
            throw new NotFoundError("Informaçõs não encontradas")
        }
        return await UserRepository.findByIdWith(field, id);
    }

    // criar
    async create(data: { nome: string, sobrenome: string, email: string, fone: string, cpf: string, senha: string }) {
        const senhaHash = await bcrypt.hash(data.senha, 10)


        const user = await UserRepository.create({
            nome: data.nome,
            sobrenome: data.sobrenome,
            email: data.email,
            fone: data.fone,
            cpf: data.cpf,
            senha: senhaHash
        })
        return omitPassword(user)

    }

    async update(id: number, data: { nome?: string, sobrenome?: string, email?: string, fone?: string, cpf?: string, senha?: string }) {
        const user = await UserRepository.findById(id)

        if (!user) {
            throw new NotFoundError("Usuário não encontrado!!!!!")
        }
        // Só vamos alterar/atualizar os campos que vieram
        // Assim, podemos atualizar só o nome, ou só o email, ou só o nome e senha, etc

        if (data.nome) user.nome = data.nome
        if (data.sobrenome) user.sobrenome = data.sobrenome
        if (data.email) user.email = data.email
        if (data.fone) user.fone = data.fone
        if (data.cpf) user.cpf = data.cpf

        if (data.senha) user.senha = await bcrypt.hash(data.senha, 10)

        const updateUser = await UserRepository.save(user)

        return omitPassword(updateUser)
    }

    async delete(id: number) {
        const user = await UserRepository.delete(id)
        if (user.affected === 0) {
            throw new NotFoundError("Erro ao encontrar usuário")
        }
    }

    async login(data: { email: string, senha: string, cpf: string, fone: string }) {
        const user = await UserRepository.findByEmail(data.email)
        const isValid1 = await bcrypt.compare(data.senha, user!.senha)
        const isValid2 = await bcrypt.compare(data.cpf, user!.cpf)
        const isValid3 = await bcrypt.compare(data.fone, user!.fone)

        if (!user || !isValid1 || !isValid2 || !isValid3) {
            throw new NotFoundError("informações incorretas")
        }

        const token = generateToken({ id: user.id, email: user.email, fone: user.fone, cpf: user.cpf })
        console.log(token)

        return {
            user: omitPassword(user),
            token
        }
    }

}
