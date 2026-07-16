import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Clima } from "./Clima";

@Entity("sensors")

export class Sensor {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100, nullable: false})
    funcao: string;

    @Column({length:300, nullable: false})
    dados: string;

    @ManyToOne(() => Clima, clima => clima.sensores)
    clima: Clima
}