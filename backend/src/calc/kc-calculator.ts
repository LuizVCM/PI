interface CropCoefficients {
  kcIni: number;
  kcIniMax?: number;
  kcMid: number;
  kcMidMax?: number;
  kcEnd: number;
  kcEndMax?: number;
}

/** extrai a média de um intervalo de coeficientes */
export function getKcRangeAverage(single: number, max?: number): number {
  if (max !== undefined && max !== null) {
    return (single + max) / 2;
  }
  return single;
}

/** calcula a média final dos 3 coeficientes (inicial, médio e final) */
export function calculateKcAverage(
  ini: number,
  mid: number,
  end: number
): number {
  return (ini + mid + end) / 3;
}

/** função que recebe os dados brutos e devolve o kcMedio pronto */
export function computeKcMedio(input: CropCoefficients): number {
  const effectiveIni = getKcRangeAverage(input.kcIni, input.kcIniMax);
  const effectiveMid = getKcRangeAverage(input.kcMid, input.kcMidMax);
  const effectiveEnd = getKcRangeAverage(input.kcEnd, input.kcEndMax);
  return calculateKcAverage(effectiveIni, effectiveMid, effectiveEnd);
}