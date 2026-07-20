import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Seed } from "./Seed";

@Entity("plantas")
export class Plant {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100, nullable: false})
    nome: string;
    
    @Column({type: 'datetime', nullable: false})
    dataGerminacao: Date;

    @Column({ type: 'decimal', scale: 2, precision:5, nullable: false})
    iluminacao: number;

    @Column({type: "varchar", nullable: false})
    regiao: string;

    @Column({ type: 'decimal', scale: 2, precision:5, nullable: false})
    enxofre: number;

    @Column({ type: 'decimal',scale: 2, precision:5, nullable: false})
    nitrogenio: number;

    @Column({ type: 'decimal',scale: 2, precision:5, nullable: false})
    potassio: number;

    @ManyToOne(() => Seed, semente => semente.planta)
    semente: Seed;
}