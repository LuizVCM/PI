import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./Usuario";

@Entity("seeds")
export class Semente {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'date', nullable: false})
    dataCompra: Date;

    @Column({length: 100, nullable:false})
    nomePlanta: string;

    @Column({type: 'timestamp with local time zone', nullable:false})
    dataPlantio: Date;

    @Column({type: 'int', nullable: false})
    quantidade: number;

    @ManyToOne(() => User, user => user.semente)
    user: User;
}