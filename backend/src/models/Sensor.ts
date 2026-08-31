import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Weather } from "./Weather";
import { DataSensor } from "./DataSensor";
import { Territory } from "./Territory";
import { BaseModel } from "./BaseModel";

@Entity("sensores")
export class Sensor extends BaseModel {
  @Column({ type: "varchar" })
  modelo: string;
  @Column({
    type: "enum",
    enum: ["umidade", "temperatura", "vento"],
    nullable: false,
  })
  tipo: "umidade" | "temperatura" | "vento";
  @ManyToOne(() => Territory, (territorio) => territorio.sensores)
  territorio: Territory;
  @OneToMany(() => DataSensor, (data) => data.sensor)
  dados: DataSensor[];
}