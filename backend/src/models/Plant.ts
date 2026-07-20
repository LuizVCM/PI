import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Seed } from "./Seed";

@Entity("plantas")
export class Plant {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100, nullable: false})
    nome: string;
    
    @Column({type: 'date', nullable: false})
    dataGerminacao: Date;

    @Column({type: 'double', nullable: false})
    iluminacao: number;

    @Column({type: "varchar", nullable: false})
    regiao: string;

    @Column({type: 'double', nullable: false})
    enxofre: number;

    @Column({type: 'double', nullable: false})
    nitrogenio: number;

    @Column({type: 'double', nullable: false})
    potassio: number;

    @ManyToOne(() => Seed, semente => semente.planta)
    semente: Seed;
}