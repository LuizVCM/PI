import { CropRepository } from "../repositories/CropRepository";
import bcrypt from "bcrypt";
import { omitPassword } from "../utils/omitPassword";
import { generateToken } from "../utils/jwt";
import { NotFoundError } from "./UserService";
import { Unauthorized } from "./UserService";

export class TerritorioService {
  async listAll() {
    return await CropRepository.findAll();
  }

  async getById(id: number) {
    return await CropRepository.findById(id);
  }
  async create(data: { cep: string; tamanho: number }) {
    // const
  }
}