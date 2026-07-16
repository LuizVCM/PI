import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Crop } from "./Crop";
import { Sensor } from "./Sensores";

@Entity("weather")
export class Clima {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type: 'timestamp', nullable:false})
    data: Date;

    @Column({type: 'double',  nullable: false })
    chuva: number;

    @Column({ type: 'double', nullable: false})
    temperatura: number;

    @Column({ type: 'double', nullable: false})
    vento: number;

    @Column({type: 'int', nullable: false})
    umidade: number;
     
    @ManyToOne(() => Crop, territorio => territorio.clima)
    territorio: Crop;

    @OneToMany(() => Sensor, sensores => sensores.clima)
    sensores: Sensor
}