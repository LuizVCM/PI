import { ForbiddenError } from "../errors/ForbiddenError";
import { NotFoundError } from "../errors/NotFoundError";
import { CropRepository } from "../repositories/CropRepository";
import { UserRepository } from "../repositories/UserRepository";
import { CreateCropDTO, UpdateCropDTO } from "../schemas/crop.schema";
import { omitPassword } from "../utils/omitPassword";

export class CropService {
  async listAll() {
    return await CropRepository.findAll();
  }

  async getById(id: number) {
    const territorio = await CropRepository.findById(id);

    if (!territorio) {
      throw new NotFoundError("Território não encontrado!!");
    }
    return territorio;
  }
  async listByUserId(userId: number) {
    return await CropRepository.findById(userId);
  }
  async create(data: CreateCropDTO, loggedUserId: number) {
    const user = await UserRepository.findById(loggedUserId);
    if (!user) {
      throw new NotFoundError("Usuário não encontrado!");
    }
    const crop = await CropRepository.create(data, user);
    return { ...crop, user: omitPassword(user) };
  }
  async update(
    id: number,
    data: UpdateCropDTO,
    loggedUserId: number
  ) {
    const territorio = await CropRepository.findById(id);

    if (!territorio) {
      throw new NotFoundError("Território não encontrado");
    }
    if (territorio.usuario.id !== loggedUserId) {
      throw new ForbiddenError(
        "Você não tem permissão para acessar este território!"
      );
    }
    if (data.cep) territorio.cep = data.cep;
    if (data.tamanho) territorio.tamanho = data.tamanho;

    const territorioUpdate = await CropRepository.save(territorio);
    return territorioUpdate;
  }
  async delete(id: number) {
    const territorio = await CropRepository.delete(id);

    if (territorio.affected === 0) {
      throw new NotFoundError("não foi encontrado território");
    }
  }
}