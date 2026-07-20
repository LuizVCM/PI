import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Weather } from "./Weather";

@Entity("sensores")
export class Sensor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false })
  funcao: string;

  @Column({ length: 300, nullable: false })
  dados: string;

  @ManyToOne(() => Weather, (clima) => clima.sensores)
  clima: Weather;
}