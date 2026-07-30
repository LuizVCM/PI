import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";
import { User } from "./User";

@Entity("financas")
export class Finance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "double", nullable: false })
  valor: number;

  @Column({ type: "enum", enum: ["gasto", "ganho"], nullable: false })
  tipo: "gasto" | "ganho";

  @Column({ type: "double", nullable: false })
  quantidade: number;

  @Column({ type: "text", nullable: false })
  descricao: string;

  @Column({ type: "date", nullable: false })
  data: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.financas)
  user: User;
}
// const enum TipoFinanca {
//   GANHO = "Ganho",
//   GASTO = "Gasto",
// }