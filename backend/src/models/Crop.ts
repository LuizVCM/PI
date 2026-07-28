import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
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

  @ManyToOne(() => User, (user) => user.territorio)
  user: User;

  @OneToMany(() => Weather, (clima) => clima.territorio)
  clima: Weather[];

  @OneToMany(() => Sensor, (sensor) => sensor.territorio)
  sensores: Sensor[]
}