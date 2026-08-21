import { Column, Entity, ManyToOne } from "typeorm";
import { User } from "./User";
import { BaseModel } from "./BaseModel";

export enum WeightUnit {
  L = "l",
  KG = "kg"
}

@Entity("estoque_insumos")
export class Stock extends BaseModel {
  @Column({ length: 100 })
  nome: string;
  @Column({ type: "decimal", scale: 2, precision: 5, nullable: false })
  quantidade: number;
  @Column({ type: "enum", enum: WeightUnit, nullable: false })
  unidade: WeightUnit;
  @Column({ name: "data_validade", type: "date" })
  dataValidade: Date;
  @ManyToOne(() => User, (usuario) => usuario.insumos)
  usuario: User;
}