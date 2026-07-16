import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Seed } from "./Seed";

@Entity("plants")
export class Plantas {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100, nullable: false})
    nome: string;
    
    @Column({type: 'date', nullable: false})
    dataGerminacao: Date;

    @Column({type: 'double', nullable: false})
    iluminacao: number;

    @Column({length: 100, nullable: false})
    regiao: number;

    @Column({type: 'double', nullable: false})
    enxofre: number;

    @Column({type: 'double', nullable: false})
    nitrogenio: number;

    @Column({type: 'double', nullable: false})
    potassio: number;

    @ManyToOne(() => Seed, semente => semente.planta)
    semente: Seed;
}