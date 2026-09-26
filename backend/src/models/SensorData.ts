import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Sensor } from "./Sensor";

@Entity("dados_sensor")
export class SensorData {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: "json", nullable: true })
  configuracoes: Record<string, any>;
  // a unidade é definida pelo tipo de sensor
  @CreateDateColumn()
  dataLeitura: Date;
  @ManyToOne(() => Sensor, (sensor) => sensor.dados)
  sensor: Sensor;
}
