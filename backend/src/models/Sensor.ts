import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Weather } from "./Weather";
import { DataSensor } from "./DataSensor";
import { Crop } from "./Crop";

@Entity("sensores")
export class Sensor {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    type: "enum",
    enum: ["umidade", "temperatura", "vento"],
    nullable: false,
  })
  tipo: "umidade" | "temperatura" | "vento";
  // @Column({ length: 100, nullable: false })
  // funcao: string;

  // @Column({ length: 300, nullable: false })
  // dados: string;

  // @ManyToOne(() => Weather, (clima) => clima.sensores)
  // clima: Weather;
  @ManyToOne(() => Crop, (territorio) => territorio.sensores)
  territorio: Crop
  @OneToMany(() => DataSensor, (data) => data.sensor)
  dados: DataSensor[];
}