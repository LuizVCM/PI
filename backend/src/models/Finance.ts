import { Column, Entity, ManyToOne } from "typeorm";
import { User } from "./User";
import { BaseModel } from "./BaseModel";

export enum FinanceType {
  DESPESA = "despesa",
  LUCRO = "lucro"
}

@Entity("financas")
export class Finance extends BaseModel {
  @Column({ type: "enum", enum: FinanceType, nullable: false })
  tipo: FinanceType;
  @Column({ type: "double", nullable: false })
  valor: number;
  @Column({ type: "text", nullable: true })
  observacoes: string | null;
  @Column({ type: "text", nullable: true })
  detalhes: string | null;
  @Column({ name: "data_criacao", type: "date", nullable: false })
  data: Date;
  @ManyToOne(() => User, (usuario) => usuario.financas)
  usuario: User;
}