import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Clima } from "./Clima";

@Entity("territorios")
 export class Crop {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 8, type: 'char', nullable:false, unique:true})
    cep: string;

    @Column({type: 'int', nullable: false})
    tamanho: number;

    @ManyToOne(() => User, user => user.territorio)
    user:User
    
   @OneToMany(() => Clima, clima => clima.territorio)
   clima: Clima[]
 }