import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Plantas } from "./Plantas";

@Entity("sementes")
export class Seed {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'date', nullable: false})
    dataCompra: Date;

    @Column({length: 100, nullable:false})
    nomePlanta: string;

    @Column({type: 'timestamp', nullable:false})
    dataPlantio: Date;

    @Column({type: 'int', nullable: false})
    quantidade: number;

    @ManyToOne(() => User, user => user.semente)
    user: User;

    @OneToMany(() => Plantas, planta => planta.semente)
    planta: Plantas
}