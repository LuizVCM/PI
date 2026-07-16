import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ManyToOne } from "typeorm/browser";
import { User } from "./User";

@Entity("financas")
export class Finance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "double", nullable: false })
  valor: number;

  @Column({ type: "enum", enum: "TipoFinança", nullable: false })
  tipo: TipoFinanca;

  @Column({ type: "double", nullable: false })
  quantidade: number;
  @Column({ type: "text", default: "Sem descrição" })
  descricao: string;

  @Column({ type: "timestamp", nullable: false })
  data: Date;

  @ManyToOne(() => User, (user) => user.financas)
  user: User;
}
const enum TipoFinanca {
  ganho = "Ganho",
  gasto = "Gasto",
}