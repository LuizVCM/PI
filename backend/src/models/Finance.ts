import {
  Column,
  Entity,
  ManyToOne,
} from "typeorm";
import { User } from "./User";
import { BaseModel } from "./BaseModel";

@Entity("financas")
export class Finance extends BaseModel {
  @Column({ type: "double", nullable: false })
  valor: number;

  @Column({ type: "enum", enum: ["gasto", "ganho"], nullable: false })
  tipo: "gasto" | "ganho";

  @Column({ type: "double", nullable: false })
  quantidade: number;

  @Column({ type: "text", nullable: false })
  descricao: string;

  @Column({ name: "data_criacao", type: "date", nullable: false })
  data: Date;

  @ManyToOne(() => User, (usuario) => usuario.financas)
  usuario: User;
}