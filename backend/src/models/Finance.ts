import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity("financas")
export class Finance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "double", nullable: false })
  valor: number;

  @Column({ type: "varchar", nullable: false })
  tipo: string;

  @Column({ type: "double", nullable: false })
  quantidade: number;
  @Column({ type: "text", nullable: false })
  descricao: string;

  @Column({ type: "timestamp", nullable: false })
  data: Date;

  @ManyToOne(() => User, (user) => user.financas)
  user: User;
}
// const enum TipoFinanca {
//   GANHO = "Ganho",
//   GASTO = "Gasto",
// }