import { AppDataSource } from "../data-source";
import { Plant } from "../../models/Plant";

function calculateKcMedia(ini: number, mid: number, end: number): number {
  return (ini + mid + end) / 3;
}

// fonte dos dados
// https://www.fao.org/geospatial/data-and-tools/data-portals/ecocrop
// fonte dos coeficientes
// https://www.fao.org/4/X0490E/x0490e0b.htm
/** o coeficiente pode ter intervalos */
const plantsData = [
  {
    nome: "Soja",
    nomeCientifico: "Glycine max",
    cicloMinimoDias: 100,
    cicloMaximoDias: 150,
    phMinimo: 5.5,
    phMaximo: 6.5,
    temperaturaMinima: 20,
    temperaturaMaxima: 33,
    precipitacaoMinima: 600,
    precipitacaoMaxima: 1500,
    necessidadeLuz: null,
    necessidadeAgua: null,
    texturaSolo: "médio, orgânico",
    kcMedio: calculateKcMedia(0.4, 1.15, 0.5),
    nitrogenio: null,
    fosforo: null,
    potassio: null,
    unidadeNpk: null,
  },

  {
    nome: "Milho",
    nomeCientifico: "Zea mays",
    cicloMinimoDias: 65,
    cicloMaximoDias: 365,
    phMinimo: 5.5,
    phMaximo: 7.0,
    temperaturaMinima: 18,
    temperaturaMaxima: 33,
    precipitacaoMinima: 600,
    precipitacaoMaxima: 1200,
    necessidadeLuz: null,
    necessidadeAgua: null,
    texturaSolo: null,
    kcMedio: calculateKcMedia(0.3, 1.20, ((0.35 + 0.6) / 2)),
    nitrogenio: null,
    fosforo: null,
    potassio: null,
    unidadeNpk: null,
  },

  {
    nome: "Feijão",
    nomeCientifico: "Phaseolus vulgaris",
    cicloMinimoDias: 50,
    cicloMaximoDias: 270,
    phMinimo: 5.5,
    phMaximo: 7.5,
    temperaturaMinima: 16,
    temperaturaMaxima: 25,
    precipitacaoMinima: 500,
    precipitacaoMaxima: 2000,
    necessidadeLuz: null,
    necessidadeAgua: null,
    texturaSolo: "médio, orgânico",
    kcMedio: calculateKcMedia(0.4, 1.15, 0.35),
    nitrogenio: null,
    fosforo: null,
    potassio: null,
    unidadeNpk: null,
  },
  {
    nome: "Arroz",
    nomeCientifico: "Oryza sativa",
    cicloMinimoDias: 80,
    cicloMaximoDias: 180,
    phMinimo: 5.5,
    phMaximo: 7.0,
    temperaturaMinima: 20,
    temperaturaMaxima: 30,
    precipitacaoMinima: 1500,
    precipitacaoMaxima: 2000,
    necessidadeLuz: "muito alta",
    necessidadeAgua: "muito alta",
    texturaSolo: "amplo",
    kcMedio: calculateKcMedia(1.05, 1.20, ((0.9 + 0.6) / 2)),
    nitrogenio: null,
    fosforo: null,
    potassio: null,
    unidadeNpk: null,
  },
  {
    nome: "Trigo",
    nomeCientifico: "Triticum aestivum",
    cicloMinimoDias: 120,
    cicloMaximoDias: 180,
    phMinimo: 6.0,
    phMaximo: 7.0,
    temperaturaMinima: 15,
    temperaturaMaxima: 23,
    precipitacaoMinima: 750,
    precipitacaoMaxima: 900,
    necessidadeLuz: "muito alta",
    necessidadeAgua: "moderada",
    texturaSolo: "médio, orgânico",
    kcMedio: calculateKcMedia(0.3, 1.15, ((0.25 + 0.4) / 2)),
    nitrogenio: null,
    fosforo: null,
    potassio: null,
    unidadeNpk: null,
  },
];

export async function insertPlants() {
  const repo = AppDataSource.getRepository(Plant);
  for (const data of plantsData) {
    const exists = await repo.findOne({
      where: {
        nomeCientifico: data.nomeCientifico,
      },
    });
    if (exists) {
      continue;
    }
    const plant = repo.create(data);
    await repo.save(plant);
  }
}