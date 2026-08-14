import {
  Column,
  Entity,
  ManyToOne,
} from "typeorm";
import { User } from "./User";
import { Plant } from "./Plant";
import { BaseModel } from "./BaseModel";

@Entity("sementes")
export class Seed extends BaseModel {
  @Column({ type: "date", nullable: false })
  dataCompra: Date;

  @Column({ length: 100, nullable: false })
  nomePlanta: string;

  @Column({ type: "date", nullable: false })
  dataPlantio: Date;

  @Column({ type: "int", nullable: false })
  quantidade: number;

  @ManyToOne(() => User, (usuario) => usuario.sementes)
  usuario: User;

  @ManyToOne(() => Plant, (planta) => planta.sementes)
  planta: Plant;
}