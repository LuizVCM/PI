import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Semente } from "./Sementes";

@Entity("plants")
export class Plantas {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100, nullable: false})
    nome: string;
    
    @Column({type: 'date', nullable: false})
    dataGerminacao: Date;

    @Column({scale: 2, precision:5, nullable: false})
    iluminacao: number;

    @Column({ nullable: false})
    regiao: number;

    @Column({scale: 2, precision:5, nullable: false})
    enxofre: number;

    @Column({type: 'double', nullable: false})
    nitrogenio: number;

    @Column({type: 'double', nullable: false})
    potassio: number;

    @ManyToOne(() => Semente, semente => semente.planta)
    semente: Semente;
}