import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("weather")
export class Clima {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type: 'timestamp with local time zone', nullable:false})
    data: Date;

    @Column({type: 'double', length: 10, nullable: false })
    chuva: number;

    @Column({ type: 'double', length: 10, nullable: false})
    temperatura: number;

    @Column({ type: 'double', length: 10, nullable: false})
    vento: number;

    @Column({type: 'int', nullable: false})
    umidade: number;
     
    @ManyToOne(() => )
}