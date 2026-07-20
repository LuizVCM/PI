import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./Usuario";

@Entity("financas")

export class Financas {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'decimal',scale: 2, precision:10, nullable: false})
    renda: number;

    @Column({ type: 'decimal',scale: 2, precision:10, nullable: false})
    quantidadeAdubo: number;

    @Column({type: 'timestamp', nullable: false})
    dataGanho: Date;

    @Column({type: 'timestamp', nullable: false})
    dataPerda: Date;

    @Column({ type: 'decimal',scale: 2, precision:6, nullable: false})
    quantidadeGanho: number;

    @Column({ type: 'decimal',scale: 2, precision:6, nullable: false})
    quantidadePerda: number

    @ManyToOne(() => User, user => user.financas)
    user:User
}