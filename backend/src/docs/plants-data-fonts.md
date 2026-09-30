# Fontes dos Dados

Documento de referência para os coeficientes de cultura (Kc) e dados agronômicos
utilizados em `plantsData`

---

## 1. Fontes primárias (globais)

| Fonte | Tipo | Uso no projeto | URL |
|---|---|---|---|
| **FAO-56 — Tabela 12** | Coeficientes Kc | Kc ini, Kc mid e Kc end de todas as culturas | https://www.fao.org/4/X0490E/x0490e0b.htm |
| **FAO-56 — Tabela 11** | Duração das fases | `iniDays`, `devDays`, `midDays`, `lateDays` | mesma publicação |
| **FAO EcoCrop** | Dados agronômicos | pH, temperatura, precipitação, textura, luz, água | https://www.fao.org/geospatial/data-and-tools/data-portals/ecocrop |

### Observações

- Os valores de Kc foram extraídos diretamente da **Tabela 12** da FAO-56.
- A duração das fases (em dias) foi extraída da **Tabela 11** da mesma publicação.
- Quando a Tabela 12 apresenta intervalos (ex.: `0.25–0.40`), o limite superior
  é armazenado em campos `kcIniMax`, `kcMidMax` ou `kcEndMax`.
- Quando a Tabela 11 apresenta múltiplos valores, adotou-se o **maior valor**
  por fase, para cálculo conservador.

---

## 2. Culturas brasileiras

Coeficientes obtidos de literatura nacional, complementados com dados
agronômicos do EcoCrop.

| Cultura | Kc (ini / mid / end) | Chave .bib | Fonte | Ano |
|---|---|---|---|---|
| Maracujá | 0.42 / 1.12 / 0.80 | `silva_klar_2002` | Silva & Klar | 2002 |
| Caju | 0.20 / 0.91 / 0.65 | `embrapa_caju_2021` | Embrapa | 2021 |
| Goiaba | 0.75 / 0.93 / 0.84 | `teixeira_goiaba_2003` | Teixeira et al. | 2003 |
| Pimenta-do-reino | 0.60 / 1.00 / 0.90 | `embrapa_pimenta` | Embrapa | — |
| Açaí | 0.90 / 1.08 / 1.00 | `sousa_acai_2023` | Sousa et al. | 2023 |
| Pupunha | 0.80 / 1.20 / 1.10 | `embrapa_pupunha_2003` | Embrapa | 2003 |
| Acerola | 1.20 / 1.39 / 1.20 | `silva_acerola_2014` | Silva | 2014 |
| Graviola | 0.40 / 1.00 / 0.80 | `silva_graviola_2003` | Silva | 2003 |
| Rúcula | 0.70 / 1.05 / 0.95 | `santana_rucula_2016` | Santana et al. | 2016 |
| Feijão-mungo | 0.73 / 1.24 / 1.32 | `nascimento_dipple_2024` | Nascimento & Dipple | 2024 |

---

## 3. Culturas com Kc aproximado

Estas culturas **não constam** da Tabela 12 da FAO-56 ou não têm dado
específico na literatura nacional consultada. O Kc foi adaptado por analogia
a culturas próximas, conforme a coluna "Justificativa".

| Cultura | Kc | Categoria | Justificativa | Base |
|---|---|---|---|---|
| Pinhão (*Araucaria angustifolia*) | 1.00 / 1.00 / 1.00 | 3 | Kc de conífera genérica da FAO-56. Sem dado específico. | FAO-56 |
| Erva-mate (*Ilex paraguariensis*) | 0.80 / 0.95 / 0.95 | 3 | Kc adaptado do cafeeiro (*Coffea arabica*). Não há Kc específico para erva-mate na literatura consultada. | Sato et al. (2007) |
| Pinhão-manso (*Jatropha curcas*) | 0.30 / 0.85 / 0.50 | 3 | Oleaginosas arbustivas similares. | — |
| Braquiária (*Urochloa spp.*) | 0.50 / 0.95 / 0.80 | 3 | Adaptado de *Brachiaria* / *Panicum* da FAO-56. | FAO-56 |
| Capim-marandu (*Urochloa brizantha* cv. Marandu) | 0.50 / 0.95 / 0.80 | 3 | Adaptado de *Brachiaria* / *Panicum* da FAO-56. Sem dado específico. | FAO-56 |
| Mombaça (*Megathyrsus maximus*) | 0.55 / 1.00 / 0.85 | 3 | Forrageiras tropicais. | — |
| Capim-elefante (*Pennisetum purpureum*) | 0.60 / 1.10 / 0.90 | 3 | Forrageiras tropicais. | — |
| Estilosantes (*Stylosanthes spp.*) | 0.40 / 0.90 / 0.85 | 3 | Adaptado de leguminosas forrageiras da FAO-56. Sem dado específico. | FAO-56 |
| Cupuaçu (*Theobroma grandiflorum*) | 0.60 / 0.90 / 0.85 | 3 | Estimado a partir do Kc do cacau (*Theobroma cacao*), cultura do mesmo gênero. | FAO-56 |
| Agrião (*Nasturtium officinale*) | 0.80 / 1.10 / 1.00 | 3 | Adaptado de hortaliças folhosas da FAO-56. Sem dado específico. | FAO-56 |
| Mostarda (*Brassica juncea*) | 0.70 / 1.00 / 0.95 | 3 | Adaptado de *small vegetables* da FAO-56. | FAO-56 |

> **Nota**: as entradas marcadas com `—` na coluna "Base" não têm fonte direta
> e são estimativas do próprio projeto, devendo ser validadas experimentalmente
> antes de uso em produção.
> Recomenda-se revisar estes valores com dados locais antes de uso em produção.

---

## 4. Sobre o Trigo

A FAO-56 separa **primavera** e **inverno**, mas a diferença é pequena:

| Estação | Kc ini | Kc mid | Kc end |
|---|---|---|---|
| Primavera | 0.30 | 1.15 | 0.25–0.40 |
| Inverno | 0.40 | 1.15 | 0.25–0.40 |

No código, as duas foram unificadas em uma única entrada `Trigo` com
`kcIni = 0.30` e `kcIniMax = 0.40`. Se for necessário distinguir novamente,
basta reintroduzir `variedade: "primavera" | "inverno"` e ajustar `iniDays`
e `devDays` (primavera: 20/50; inverno: 30/140).

---

## 5. Sobre Citros

A FAO-56 tabela o Kc de citros em três faixas, conforme a **porcentagem de
cobertura do solo pela copa**:

| Categoria | Kc ini | Kc mid | Kc end | Interpretação |
|---|---|---|---|---|
| 70% copa | 0.70 | 0.65 | 0.70 | Pomar adulto |
| 50% copa | 0.65 | 0.60 | 0.65 | Pomar em formação |
| 20% copa | 0.50 | 0.45 | 0.55 | Pomar jovem |

Escolha a faixa de acordo com a idade e o diâmetro da copa do pomar.

---

## 6. Estrutura do schema

| Campo | Descrição |
|---|---|
| `kcIni` / `kcMid` / `kcEnd` | Kc padrão da FAO-56 |
| `kcIniMax` / `kcMidMax` / `kcEndMax` | Limite superior quando há intervalo |
| `iniDays` / `devDays` / `midDays` / `lateDays` | Duração das fases (dias) |
| `cicloMinimoDias` / `cicloMaximoDias` | Faixa de ciclo total |
| `phMinimo` / `phMaximo` | Faixa de pH do solo |
| `temperaturaMinima` / `temperaturaMaxima` | Faixa de temperatura (°C) |
| `precipitacaoMinima` / `precipitacaoMaxima` | Faixa de precipitação (mm) |
| `necessidadeLuz` | Baixa / moderada / alta / muito alta |
| `necessidadeAgua` | Baixa / moderada / alta / muito alta |
| `texturaSolo` | Descrição textual da textura ideal |

Campos `nitrogenio`, `fosforo`, `potassio` e `unidadeNpk` estão reservados
para uso futuro e permanecem `null` por ora.

---

## 7. Convenções

- **Nomes científicos** seguem a nomenclatura binomial padrão.
- **Cultivares e variedades** (ex.: Citros 70%, Mandioca ano 1/ano 2) são
  tratados como entradas separadas quando a FAO-56 as separa.
- **Unidades**:
  - Temperatura: °C
  - Precipitação: mm
  - Ciclo e fases: dias
- **Fonte dos dados agronômicos**: EcoCrop, salvo indicação em contrário.
- **Fonte dos Kc**: FAO-56 Tabela 12, salvo indicação em contrário.

---

## 8. Como citar

Ao utilizar esta base em publicações ou sistemas, cite:

```
FAO. 1998. Crop evapotranspiration - Guidelines for computing crop water
requirements - FAO Irrigation and drainage paper 56. Rome.

FAO EcoCrop. https://www.fao.org/geospatial/data-and-tools/data-portals/ecocrop
```

---

*Última revisão: 14/09/2026*