import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
} from "typeorm";
import { User } from "./User";
import { BaseModel } from "./BaseModel";
import { Crop } from "./Crop";

@Entity("sementes")
export class Seed extends BaseModel {
  @Column({ type: "date", nullable: false })
  dataCompra: Date;
  @Column({ type: "date", nullable: false })
  dataPlantio: Date;
  @Column({ type: "int", nullable: false })
  quantidade: number;
  @ManyToOne(() => User, (usuario) => usuario.sementes)
  usuario: User;
  @OneToOne(() => Crop, (plantacao) => plantacao.sementes)
  plantacao: Crop;
}