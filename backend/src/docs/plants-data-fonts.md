# Fontes dos Dados

Documento de referência para os coeficientes de cultura (Kc) e dados agronômicos
utilizados em `plantsData`

---

## 1. Fontes primárias (globais)

| Fonte | Tipo | Uso no projeto | URL |
|---|---|---|---|
| **FAO-56: Tabela 12** (Allen et al., 1998) | Coeficientes Kc | Kc ini, Kc mid e Kc end de todas as culturas | https://www.fao.org/4/X0490E/x0490e0b.htm |
| **FAO-56: Tabela 11** (Allen et al., 1998) | Duração das fases | `iniDays`, `devDays`, `midDays`, `lateDays` | mesma publicação anterior |
| **FAO EcoCrop** (FAO, 1999) | Dados agronômicos | pH, temperatura, precipitação, textura, luz, água | https://www.fao.org/geospatial/data-and-tools/data-portals/ecocrop/en |

### Observações

- Os valores de Kc foram extraídos diretamente da **Tabela 12** da FAO-56
  (Allen et al., 1998).
- A duração das fases (em dias) foi extraída da **Tabela 11** da mesma
  publicação (Allen et al., 1998).
- Quando a Tabela 12 apresenta intervalos (ex.: `0.25–0.40`), o limite superior
  é armazenado em campos `kcIniMax`, `kcMidMax` ou `kcEndMax`.
- Quando a Tabela 11 apresenta múltiplos valores, adotou-se o **maior valor**
  por fase, para cálculo conservador.

---

## 2. Culturas brasileiras

Coeficientes obtidos de literatura nacional, complementados com dados
agronômicos do EcoCrop (FAO, 1999).

| Cultura | Kc (ini / mid / end) | Fonte | Ano |
|---|---|---|---|
| Maracujá | 0.42 / 1.12 / 0.80 | Silva & Klar | 2002 |
| Caju | 0.20 / 0.91 / 0.65 | Embrapa | 2021 |
| Goiaba | 0.75 / 0.93 / 0.84 | Teixeira et al. | 2003 |
| Pimenta-do-reino | 0.60 / 1.00 / 0.90 | Maia et al. | 2020 |
| Açaí | 0.90 / 1.08 / 1.00 | Sousa et al. | 2021 |
| Pupunha | 0.80 / 1.20 / 1.10 | Bassoi et al. | 2003 |
| Acerola | 1.20 / 1.39 / 1.20 | Silva | 2014 |
| Graviola | 0.40 / 1.00 / 0.80 | Silva | 2003 |
| Rúcula | 0.70 / 1.05 / 0.95 | Santana et al. | 2016 |
| Feijão-mungo | 0.73 / 1.24 / 1.32 | Nascimento et al. | 2024 |

---

## 3. Culturas com Kc aproximado

Estas culturas **não constam** da Tabela 12 da FAO-56 (Allen et al., 1998) ou
não têm dado específico na literatura nacional consultada. O Kc foi adaptado
por analogia a culturas próximas, conforme a coluna "Justificativa".

| Cultura | Kc | Categoria | Justificativa | Base |
|---|---|---|---|---|
| Pinhão (*Araucaria angustifolia*) | 1.00 / 1.00 / 1.00 | 3 | Kc de conífera genérica da FAO-56. Sem dado específico. | FAO-56 (Allen et al., 1998) |
| Erva-mate (*Ilex paraguariensis*) | 0.80 / 0.95 / 0.95 | 3 | Kc adaptado do cafeeiro (*Coffea arabica*). Não há Kc específico para erva-mate na literatura consultada. | Sato et al. (2007) |
| Pinhão-manso (*Jatropha curcas*) | 0.30 / 0.85 / 0.50 | 3 | Oleaginosas arbustivas similares. | — |
| Braquiária (*Urochloa spp.*) | 0.50 / 0.95 / 0.80 | 3 | Adaptado de *Brachiaria* / *Panicum* da FAO-56. | FAO-56 (Allen et al., 1998) |
| Capim-marandu (*Urochloa brizantha* cv. Marandu) | 0.50 / 0.95 / 0.80 | 3 | Adaptado de *Brachiaria* / *Panicum* da FAO-56. Sem dado específico. | FAO-56 (Allen et al., 1998) |
| Mombaça (*Megathyrsus maximus*) | 0.55 / 1.00 / 0.85 | 3 | Forrageiras tropicais. | — |
| Capim-elefante (*Pennisetum purpureum*) | 0.60 / 1.10 / 0.90 | 3 | Forrageiras tropicais. | — |
| Estilosantes (*Stylosanthes spp.*) | 0.40 / 0.90 / 0.85 | 3 | Adaptado de leguminosas forrageiras da FAO-56. Sem dado específico. | FAO-56 (Allen et al., 1998) |
| Cupuaçu (*Theobroma grandiflorum*) | 0.60 / 0.90 / 0.85 | 3 | Estimado a partir do Kc do cacau (*Theobroma cacao*), cultura do mesmo gênero. | FAO-56 (Allen et al., 1998) |
| Agrião (*Nasturtium officinale*) | 0.80 / 1.10 / 1.00 | 3 | Adaptado de hortaliças folhosas da FAO-56. Sem dado específico. | FAO-56 (Allen et al., 1998) |
| Mostarda (*Brassica juncea*) | 0.70 / 1.00 / 0.95 | 3 | Adaptado de *small vegetables* da FAO-56. | FAO-56 (Allen et al., 1998) |

> **Nota**: as entradas marcadas com `—` na coluna "Base" não têm fonte direta
> e são estimativas do próprio projeto, devendo ser validadas experimentalmente
> antes de uso em produção.
> Recomenda-se revisar estes valores com dados locais antes de uso em produção.

---

## 4. Sobre o Trigo

A FAO-56 (Allen et al., 1998) separa **primavera** e **inverno**, mas a
diferença é pequena:

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

A FAO-56 (Allen et al., 1998) tabela o Kc de citros em três faixas, conforme a
**porcentagem de cobertura do solo pela copa**:

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
| `kcIni` / `kcMid` / `kcEnd` | Kc padrão da FAO-56 (Allen et al., 1998) |
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
- **Fonte dos dados agronômicos**: EcoCrop (FAO, 1999), salvo indicação em
  contrário.
- **Fonte dos Kc**: FAO-56 Tabela 12 (Allen et al., 1998), salvo indicação em
  contrário.

---

## 9. Referências

ALLEN, R. G.; PEREIRA, L. S.; RAES, D.; SMITH, M. **Crop evapotranspiration: guidelines for computing crop water requirements**. Rome: Food and Agriculture Organization of the United Nations, 1998. (FAO Irrigation and Drainage Paper, 56). ISBN 92-5-104219-5. Disponível em: https://www.fao.org/4/X0490E/x0490e00.htm. Acesso em: 05 out. 2026.

BASSOI, L. H.; FLORI, J. E.; SILVA, E. E. G.; SILVA, J. A. M. Guidelines for irrigation scheduling of peach palm for heart-of-palm production in the São Francisco Valley, Brazil. **Horticultura Brasileira**, Brasília, DF, v. 21, n. 4, p. 681–683, 2003. DOI: 10.1590/S0102-05362003000400022.

EMBRAPA AGROINDÚSTRIA TROPICAL. **Duração das fases fenológicas, evapotranspiração da cultura (ETc), evapotranspiração de referência (ETo) e coeficientes de cultivo (Kc) do cajueiro-anão irrigado**. 2021. Disponível em: https://www.infoteca.cnptia.embrapa.br. Acesso em: 29 set. 2026.

FAO. **ECOCROP Database of Crop Constraints and Characteristics**. Rome: Food and Agriculture Organization of the United Nations, 1999. Disponível em: https://www.fao.org/geospatial/data-and-tools/data-portals/ecocrop/en. Acesso em: 05 out. 2026.

MAIA, G. S.; ALMEIDA, F. A.; FREITAS, J. M.; SANTOS, J. É. O.; RAMOS, C. R. G. Coeficiente de cultura de pimenta-do-reino estimado por Sentinel 2A e FAO 56 para cálculo de ETc em região amazônica. In: CONGRESSO BRASILEIRO DE ENGENHARIA AGRÍCOLA – CONBEA, 49., 2020, Congresso On-line. **Anais...** 2020.

NASCIMENTO, V. F.; QUEIROZ, T. M.; MATOS, R. M.; SANTOS, B. D. B.; DIPPLE, F. L. Coeficiente de cultura (Kc) do feijão mungo cultivado nas condições edafoclimáticas de Mato Grosso. **Observatório de la Economía Latinoamericana**, v. 22, n. 7, p. e5624, 2024.

SANTANA, M. J.; RIBEIRO, A. A.; MANCIN, C. A. Evapotranspiração e coeficientes de cultura para a alface e rúcula cultivadas em Uberaba, MG. **Revista Inova Ciência & Tecnologia**, Uberaba, v. 2, n. 2, p. 7–13, 2016. DOI: 10.46921/rict. ISSN 2447-598X.

SATO, F. A.; SILVA, A. M.; COELHO, G.; SILVA, A. C.; CARVALHO, L. G. Coeficiente de cultura (Kc) do cafeeiro (*Coffea arabica* L.) no período de outono-inverno na região de Lavras – MG. **Engenharia Agrícola**, v. 27, n. 2, p. 371–379, 2007. DOI: 10.1590/S0100-69162007000300002.

SILVA, A. A. G.; KLAR, A. E. Demanda hídrica do maracujazeiro amarelo (*Passiflora edulis* Sims f. *flavicarpa* Deg.). **Irriga**, Botucatu, v. 7, n. 3, p. 185–190, 2002. DOI: 10.15809/irriga.2002v7n3p185-190.

SILVA, L. F. **Manejo de irrigação com base na evapotranspiração de algumas culturas perenes para as condições dos tabuleiros litorâneos do Piauí**. 2014. Monografia (Graduação em Engenharia Agronômica) – Universidade Estadual do Piauí, Parnaíba, 2014.

SILVA, V. P. R. **Coeficientes de cultura para a gravioleira**. 2003. Citado em: Coeficiente de cultivo (Kc) das culturas com suas respectivas fontes. INOVAGRI, 2017. Acesso em: 29 set. 2026.

SOUSA, D. P.; FERNANDES, T. F. S.; TAVARES, L. B.; FARIAS, V. D. S.; LIMA, M. J. A.; NUNES, H. G. G. C.; COSTA, D. L. P.; ORTEGA-FARIAS, S.; SOUZA, P. J. O. P. Estimation of evapotranspiration and single and dual crop coefficients of açaí palm in the Eastern Amazon (Brazil) using the Bowen ratio system. **Irrigation Science**, v. 39, n. 1, p. 5–22, 2021. DOI: 10.1007/s00271-020-00710-2.

TEIXEIRA, A. H. C.; BASSOI, L. H.; REIS, V. C. S.; SILVA, T. G. F.; FERREIRA, M. N. L.; MAIA, J. L. T. Estimativa do consumo hídrico da goiabeira, utilizando estações agrometeorológicas automática e convencional. **Revista Brasileira de Fruticultura**, v. 25, n. 3, p. 457–460, 2003.

---

*Última revisão: 05/10/2026*