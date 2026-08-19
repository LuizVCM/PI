import { Crop, CropCulture, CropStatus } from "../models/Crop";
import { Territory } from "../models/Territory";
import { AreaUnit } from "../utils/area-converter";
import { createBaseRepository } from "./BaseRepository";

interface CropData {
  nome: string;
  cultura: CropCulture;
  variedade: string | null | undefined;
  areaM2: number;
  unidadeArea: AreaUnit;
  dataPlantio: Date | null | undefined;
  colheitaPrevista: Date | null | undefined;
  responsavel: string | null | undefined;
  status: CropStatus;
  observacoes: string | null | undefined;
}

export class CropRepository {
  public base = createBaseRepository(Crop);
  async findAllWithTerritory() {
    return this.base.findAll({ relations: { territorio: true } });
  }
  /** retorna o usuário */
  async findByTerritoryId(territoryId: number) {
    return this.base.getRepository().find({
      where: { territorio: { id: territoryId } },
      relations: { territorio: true },
      select: { territorio: { usuario: true } },
    });
  }
  /** retorna o usuário */
  async findByIdWithTerritory(id: number) {
    return this.base.findById(id, {
      relations: { territorio: true },
      select: { territorio: { usuario: true } },
    });
  }
  /** retorna o usuário */
  async findAllByUserId(userId: number) {
    return this.base.findAll({
      where: { territorio: { usuario: { id: userId } } },
      relations: { territorio: true },
      select: { territorio: { usuario: true } },
    });
  }
  async create(data: CropData, territory: Territory) {
    const crop = this.base.create({ ...data, territorio: territory });
    return this.base.save(crop);
  }
}