import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Plant } from "./Plant";

@Entity("sementes")
export class Seed {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "date", nullable: false })
  dataCompra: Date;

  @Column({ length: 100, nullable: false })
  nomePlanta: string;

  @Column({ type: "date", nullable: false })
  dataPlantio: Date;

  @Column({ type: "int", nullable: false })
  quantidade: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.semente)
  user: User;

  @OneToMany(() => Plant, (planta) => planta.sementes)
  planta: Plant;
}