import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { Weather } from "./Weather";
import { Sensor } from "./Sensor";
import { BaseModel } from "./BaseModel";

@Entity("territorios")
export class Crop extends BaseModel {
  @Column({ length: 8, type: "char", nullable: false, unique: true })
  cep: string;

  @Column({ type: "int", nullable: false })
  tamanho: number;

  @ManyToOne(() => User, (usuario) => usuario.territorios)
  usuario: User;

  @OneToMany(() => Weather, (clima) => clima.territorio)
  clima: Weather[];

  @OneToMany(() => Sensor, (sensor) => sensor.territorio)
  sensores: Sensor[];
}