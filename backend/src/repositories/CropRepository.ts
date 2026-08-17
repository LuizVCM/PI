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
  async findByTerritoryId(territoryId: number) {
    return this.base.getRepository().find({
      where: { territorio: { id: territoryId } },
      relations: { territorio: true },
    });
  }
  async findByUserId(userId: number) {
    return this.base
      .getRepository()
      .find({ where: { territorio: { usuario: { id: userId } } } });
  }
  async create(data: CropData, territory: Territory) {
    const crop = this.base.create({ ...data, territorio: territory });
    return this.base.save(crop);
  }
}