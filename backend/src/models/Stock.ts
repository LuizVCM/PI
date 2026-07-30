import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";

@Entity("estoque_insumos")
export class Stock {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ name: "nome_insumo" })
  nomeInsumo: string;
  @Column({ type: "decimal", scale: 2, precision: 5, nullable: false })
  quantidade: number;
  @Column({ type: "enum", enum: ["litros", "quilogramas"], nullable: false })
  unidade: "litros" | "quilogramas";
  @Column({ name: "data_validade", type: "date" })
  dataValidade: Date;
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt: Date;
  @ManyToOne(() => User, (usuario) => usuario.insumos)
  usuario: User;
}
