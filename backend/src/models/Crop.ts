import { Entity, Column, ManyToOne, Index } from "typeorm";
import { BaseModel } from "./BaseModel";
import { Territory } from "./Territory";
import { AreaUnit } from "../utils/area-converter";
import { Plant } from "./Plant";

export enum CropStatus {
  PLANEJADA = "planejada",
  EM_ANDAMENTO = "em_andamento",
  CONCLUIDA = "concluida",
  CANCELADA = "cancelada",
}

@Index(["status", "dataPlantio"]) 
@Entity("plantacoes")
export class Crop extends BaseModel {
  @Column({ length: 100 })
  nome: string;
  @ManyToOne(() => Plant, (planta) => planta.plantacoes)
  cultura: Plant;
  @Column({ type: "varchar", length: 100, nullable: true })
  variedade: string | null;
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
  @Index()
  @Column({ type: "date", nullable: true })
  dataPlantio: Date | null;
  @Column({ type: "date", nullable: true })
  dataColheitaReal: Date | null;
  @Column({ type: "date", nullable: true })
  dataColheitaPrevista: Date | null;
  @Column({ type: "varchar", length: 100, nullable: true })
  responsavel: string | null;
  @Index()
  @Column({
    type: "enum",
    enum: CropStatus,
    default: CropStatus.PLANEJADA,
  })
  status: CropStatus;
  @Column({ type: "text", nullable: true })
  observacoes: string | null;
  @ManyToOne(() => Territory, (territorio) => territorio.plantacoes)
  territorio: Territory;
}