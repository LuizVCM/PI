import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Crop } from "./Crop";
import { Sensor } from "./Sensor";

@Entity("dados_clima")
export class Weather {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "timestamp", nullable: false })
  data: Date;

  @Column({ type: "decimal", scale: 2, precision: 5, nullable: false })
  precipitacao: number;

  @Column({ type: "decimal", scale: 2, precision: 5, nullable: false })
  temperatura: number;

  @Column({ type: "decimal", scale: 2, precision: 5, nullable: false })
  vento: number;

  @Column({ type: "decimal", scale: 2, precision: 5, nullable: false })
  umidade: number;

  @ManyToOne(() => Crop, (territorio) => territorio.clima)
  territorio: Crop;

  // @OneToMany(() => Sensor, (sensores) => sensores.clima)
  // sensores: Sensor;
}