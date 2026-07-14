import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Semente } from "./Sementes";
import { Territorio } from "./Territorio";
import { Financas } from "./Finanças";

@Entity("users") 
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100, nullable:false})
    nome:string;

    @Column({length: 100, nullable:false})
    sobrenome:string;

    @Column({length: 100, nullable:false, unique:true})
    email:string;

    @Column({length: 20, type: "char", nullable:false, unique:true})
    fone:string;

    @Column({length: 11, type: "char", nullable:false, unique: true})
    cpf:string;

    @Column({select: false})
    senha: string;

    @OneToMany(() => Semente, semente => semente.user)
    semente: Semente[];

    @OneToMany(() => Territorio, territorio => territorio.user)
    territorio: Territorio[];

    @OneToMany(() => Financas, financas => financas.user)
    financas: Financas[]
}