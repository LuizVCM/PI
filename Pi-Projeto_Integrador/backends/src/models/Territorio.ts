import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./Usuario";

@Entity("territorios")
 export class Territorio {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 8, type: 'char', nullable:false, unique:true})
    cep: string;

    @Column({type: 'int', nullable: false})
    tamanho: number;

    @ManyToOne(() => User, user => user.territorio)
    user:User

 }