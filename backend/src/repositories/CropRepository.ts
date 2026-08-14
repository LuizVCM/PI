import { Crop, CropCulture, CropStatus } from "../models/Crop";
import { Territory } from "../models/Territory";
import { CreateCropDTO } from "../schemas/crop.schema";
import { AreaUnit } from "../utils/area-converter";
import { createBaseRepository } from "./BaseRepository";

const base = createBaseRepository(Crop);

interface CropData {
  nome: string;
  cultura: CropCulture,
  variedade: string | null | undefined,
  areaM2: number;
  unidadeArea: AreaUnit;
  dataPlantio: Date  | null | undefined,
  colheitaPrevista: Date  | null | undefined,
  responsavel: string  | null | undefined,
  status: CropStatus,
  observacoes: string  | null | undefined
}

export const CropRepository = {
  ...base,
  async findAllWithTerritory() {
    return base.findAll({ relations: { territorio: true } });
  },
  async findByTerritoryId(territoryId: number) {
    return base.getRepository().find({
      where: { territorio: { id: territoryId } },
      relations: { territorio: true },
    });
  },
  async findByUserId(userId: number) {
    return base
      .getRepository()
      .find({ where: { territorio: { usuario: { id: userId } } } });
  },
  async create(data: CropData, territory: Territory) {
    const crop = base.create({ ...data, territorio: territory });
    return base.save(crop);
  },
};