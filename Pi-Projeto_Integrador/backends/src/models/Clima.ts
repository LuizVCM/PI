import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Territorio } from "./Territorio";
import { Sensor } from "./Sensores";

@Entity("weather")
export class Clima {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type: 'timestamp', nullable:false})
    data: Date;

    @Column({  type: 'decimal',scale: 2, precision: 5, nullable: false })
    chuva: number;

    @Column({  type: 'decimal',scale: 2, precision: 5, nullable: false})
    temperatura: number;

    @Column({  type: 'decimal',scale: 2, precision: 5, nullable: false})
    vento: number;

    @Column({ type: 'decimal', scale: 2, precision: 5, nullable: false})
    umidade: number;
     
    @ManyToOne(() => Territorio, territorio => territorio.clima)
    territorio: Territorio;

    @OneToMany(() => Sensor, sensores => sensores.clima)
    sensores: Sensor

}