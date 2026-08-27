import { Column, Entity, OneToMany } from "typeorm";
import { Seed } from "./Seed";
import { Territory } from "./Territory";
import { Finance } from "./Finance";
import { Stock } from "./Stock";
import { BaseModel } from "./BaseModel";

@Entity("usuarios")
export class User extends BaseModel {
  @Column({ length: 100, nullable: false })
  nome: string;
  @Column({ length: 100, nullable: false })
  sobrenome: string;
  @Column({ length: 100, nullable: false, unique: true })
  email: string;
  @Column({ length: 20, type: "varchar", nullable: false, unique: true })
  telefone: string;
  @Column({ length: 11, type: "char", nullable: false, unique: true })
  cpf: string;
  @Column({ select: false })
  senha: string;
  @OneToMany(() => Seed, (semente) => semente.usuario)
  sementes: Seed[];
  @OneToMany(() => Territory, (territorio) => territorio.usuario, {onDelete: "CASCADE"})
  territorios: Territory[];
  @OneToMany(() => Finance, (financas) => financas.usuario)
  financas: Finance[];
  @OneToMany(() => Stock, (insumos) => insumos.usuario)
  insumos: Stock[];
}