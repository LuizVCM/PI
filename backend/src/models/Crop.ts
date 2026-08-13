import { Entity, Column, ManyToOne } from "typeorm";
import { BaseModel } from "./BaseModel";
import { Territory } from "./Territory";
import { AreaUnit } from "../utils/area-converter";

export enum CropStatus {
  PLANEJADA = "planejada",
  EM_ANDAMENTO = "em_andamento",
  CONCLUIDA = "concluida",
  CANCELADA = "cancelada",
}
export enum CropCulture {
  MILHO = "milho",
  SOJA = "soja",
  TRIGO = "trigo",
  ARROZ = "arroz",
  FEIJAO = "feijao",
}

@Entity("plantacoes")
export class Crop extends BaseModel {
  @Column({ length: 100 })
  nome: string;
  @Column({
    type: "enum",
    enum: CropCulture,
  })
  cultura: CropCulture;
  @Column({ length: 100 })
  variedade: string;
  @Column("decimal", {
    precision: 12,
    scale: 2,
  })
  areaM2: number;
  @Column({
    type: "enum",
    enum: AreaUnit,
  })
  unidadeArea: AreaUnit;
  @Column({ type: "date" })
  dataPlantio: Date;
  @Column({ type: "date", nullable: true })
  colheitaPrevista: Date | null;
  @Column({ length: 100 })
  responsavel: string;
  @Column({
    type: "enum",
    enum: CropStatus,
  })
  status: CropStatus;
  @Column({ type: "text", nullable: true })
  observacoes: string | null;
  @ManyToOne(() => Territory, (territorio) => territorio.plantacoes)
  territorio: Territory;
}