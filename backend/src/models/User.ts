import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Seed } from "./Seed";
import { Crop } from "./Crop";
import { Finance } from "./Finance";
import { Stock } from "./Stock";

@Entity("usuarios")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false })
  nome: string;

  @Column({ length: 100, nullable: false })
  sobrenome: string;

  @Column({ length: 100, nullable: false, unique: true })
  email: string;

  @Column({ length: 20, type: "char", nullable: false, unique: true })
  telefone: string;

  @Column({ length: 11, type: "char", nullable: false, unique: true })
  cpf: string;

  @Column({ select: false })
  senha: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt: Date;

  @OneToMany(() => Seed, (semente) => semente.user)
  semente: Seed[];

  @OneToMany(() => Crop, (territorio) => territorio.user)
  territorio: Crop[];

  @OneToMany(() => Finance, (financas) => financas.user)
  financas: Finance[];

  @OneToMany(() => Stock, (insumos) => insumos.usuario)
  insumos: Stock[];
}
