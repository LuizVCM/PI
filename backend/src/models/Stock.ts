import { Column, Entity, ManyToOne } from "typeorm";
import { User } from "./User";
import { BaseModel } from "./BaseModel";

export enum MeasurementUnit {
  L = "l",
  KG = "kg"
}

@Entity("estoque_insumos")
export class Stock extends BaseModel {
  @Column({ length: 100 })
  nome: string;
  @Column({ type: "decimal", scale: 2, precision: 5, nullable: false })
  quantidade: number;
  @Column({ type: "enum", enum: MeasurementUnit, nullable: false })
  unidade: MeasurementUnit;
  @Column({ type: "date", nullable: true })
  dataValidade: Date;
  @ManyToOne(() => User, (usuario) => usuario.insumos)
  usuario: User;
}