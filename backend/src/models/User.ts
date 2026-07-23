import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Seed } from "./Seed";
import { Crop } from "./Crop";
import { Finance } from "./Finance";

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

  @OneToMany(() => Seed, (semente) => semente.user)
  semente: Seed[];

  @OneToMany(() => Crop, (territorio) => territorio.user)
  territorio: Crop[];

  @OneToMany(() => Finance, (financas) => financas.user)
  financas: Finance[];
}