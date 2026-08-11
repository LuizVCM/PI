import { Entity, Column, ManyToOne } from "typeorm";
import { BaseModel } from "./BaseModel";
import { Territory } from "./Territory"

export enum CropStatus {
  PLANEJADA = "planejada",
  EM_ANDAMENTO = "em_andamento",
  CONCLUIDA = "concluida",
  CANCELADA = "cancelada",
}

@Entity("plantacoes")
export class Crop extends BaseModel {
  @Column({ length: 100 })
  nome: string;

  @Column({ length: 100 })
  cultura: string;

  @Column({ length: 100 })
  variedade: string;

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