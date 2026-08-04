import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Sensor } from "./Sensor";

@Entity("dados_sensor")
export class DataSensor {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: "decimal", scale: 2, precision: 5, nullable: false })
  valor: number;
  @Column({
    type: "enum",
    enum: ["porcento", "celsius", "kmh"],
  })
  unidade: "porcento" | "celsius" | "kmh";
  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;
  @ManyToOne(() => Sensor, (sensor) => sensor.dados)
  sensor: Sensor;
}