import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Weather } from "./Weather";
import { DataSensor } from "./DataSensor";
import { Crop } from "./Territory";
import { BaseModel } from "./BaseModel";

@Entity("sensores")
export class Sensor extends BaseModel {
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
  territorio: Crop;
  @OneToMany(() => DataSensor, (data) => data.sensor)
  dados: DataSensor[];
}