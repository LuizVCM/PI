import { Entity, Column, OneToMany } from "typeorm";
import { Crop } from "./Crop";
import { Seed } from "./Seed";
import { BaseModel } from "./BaseModel";

export enum NpkUnit {
  MG_KG = "mg/kg",
  PPM = "ppm",
  PERCENT = "%",
}

@Entity("plantas")
export class Plant extends BaseModel {
  @Column({ length: 100, nullable: false })
  nome: string;
  @Column({ length: 150, nullable: false, unique: true })
  nomeCientifico: string;
  @Column({ type: "int", nullable: false })
  cicloMinimoDias: number;
  @Column({ type: "int", nullable: false })
  cicloMaximoDias: number;
  @Column({ type: "decimal", precision: 4, scale: 2, nullable: true })
  phMinimo: number;
  @Column({ type: "decimal", precision: 4, scale: 2, nullable: true })
  phMaximo: number;
  @Column({ type: "decimal", precision: 5, scale: 2, nullable: true })
  // em celsius
  temperaturaMinima: number;
  @Column({ type: "decimal", precision: 5, scale: 2, nullable: true })
  // em celsius
  temperaturaMaxima: number;
  @Column({ type: "decimal", precision: 6, scale: 2, nullable: true })
  // precipitação anual em milímetros (mm)
  precipitacaoMinima: number;
  @Column({ type: "decimal", precision: 6, scale: 2, nullable: true })
  // precipitação anual em milímetros (mm)
  precipitacaoMaxima: number;
  @Column({ type: "varchar", length: 50, nullable: true })
  necessidadeLuz: string | null;
  @Column({ type: "varchar", length: 50, nullable: true })
  necessidadeAgua: string | null;
  @Column({ type: "varchar", length: 100, nullable: true })
  texturaSolo: string | null;
  @Column({ type: "decimal", precision: 8, scale: 2, nullable: true })
  nitrogenio: number | null;
  @Column({ type: "decimal", precision: 8, scale: 2, nullable: true })
  fosforo: number | null;
  @Column({ type: "decimal", precision: 8, scale: 2, nullable: true })
  potassio: number | null;
  @Column({ type: "enum", enum: NpkUnit, nullable: true })
  unidadeNpk: NpkUnit | null;
  @OneToMany(() => Seed, (seed) => seed.planta)
  sementes: Seed[];
  @OneToMany(() => Crop, (crop) => crop.cultura)
  plantacoes: Crop[];
  /** retorna o ciclo médio em dias, arredondado. se algum dos valores for nulo, retorna null
   */
  getCicloMedioDias(): number | null {
    if (this.cicloMinimoDias == null || this.cicloMaximoDias == null) {
      return null;
    }
    return Math.round((this.cicloMinimoDias + this.cicloMaximoDias) / 2);
  }
}