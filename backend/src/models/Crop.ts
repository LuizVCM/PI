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
import { Weather } from "./Weather";
import { Sensor } from "./Sensor";

@Entity("territorios")
export class Crop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 8, type: "char", nullable: false, unique: true })
  cep: string;

  @Column({ type: "int", nullable: false })
  tamanho: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.territorio)
  user: User;

  @OneToMany(() => Weather, (clima) => clima.territorio)
  clima: Weather[];

  @OneToMany(() => Sensor, (sensor) => sensor.territorio)
  sensores: Sensor[]
}