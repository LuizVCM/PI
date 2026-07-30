import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./Usuario";
import { Plantas } from "./Plantas";

@Entity("seeds")
export class Semente {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'date', nullable: false})
    dataCompra: Date;

    @Column({length: 100, nullable:false})
    nomePlanta: string;

    @Column({type: 'timestamp', nullable:false})
    dataPlantio: Date;

    @Column({ nullable: false})
    quantidade: number;

    @ManyToOne(() => User, user => user.semente)
    user: User;

    @OneToMany(() => Plantas, planta => planta.semente)
    plantas: Plantas[]
}