import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ManyToOne } from "typeorm/browser";
import { User } from "./Usuario";

@Entity("financas")

export class Financas {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'double', nullable: false})
    renda: number;

    @Column({type: 'double', nullable: false})
    quantidadeAdubo: number;

    @Column({type: 'timestamp', nullable: false})
    dataGanho: Date;

    @Column({type: 'timestamp', nullable: false})
    dataPerda: Date;

    @Column({type: 'double', nullable: false})
    quantidadeGanho: number;

    @Column({type: 'double', nullable: false})
    quantidadePerda: number

    @ManyToOne(() => User, user => user.financas)
    user:User
}