"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKcRangeAverage = getKcRangeAverage;
exports.calculateKcAverage = calculateKcAverage;
exports.computeKcMedio = computeKcMedio;
/** extrai a média de um intervalo de coeficientes */
function getKcRangeAverage(value, max) {
    if (max !== undefined) {
        return (value + max) / 2;
    }
    return value;
}
/** calcula a média ponderada dos coeficientes. os pesos são baseados nos valores de dias de cada fase da planta
 *  @param days os coeficientes de kcIni e kcMid variam na fase de desenvolvimento (consultar figura 34 da fonte de dados). o mesmo acontece na fase final, o coeficiente começa decair do kcMid ao kcEnd. média simples para assumir um valor de coeficiente entre essas fases */
function calculateKcAverage(kcIni, kcMid, kcEnd, iniDays, devDays, midDays, lateDays) {
    const kcDesenvolvimento = (kcIni + kcMid) / 2;
    const kcFinal = (kcMid + kcEnd) / 2;
    const totalDias = iniDays + devDays + midDays + lateDays;
    return ((kcIni * iniDays +
        kcDesenvolvimento * devDays +
        kcMid * midDays +
        kcFinal * lateDays) /
        totalDias);
}
/** função que recebe os dados brutos e devolve o kcMedio pronto */
function computeKcMedio(input) {
    const effectiveIni = getKcRangeAverage(input.kcIni, input.kcIniMax);
    const effectiveMid = getKcRangeAverage(input.kcMid, input.kcMidMax);
    const effectiveEnd = getKcRangeAverage(input.kcEnd, input.kcEndMax);
    return calculateKcAverage(effectiveIni, effectiveMid, effectiveEnd, input.iniDays, input.devDays, input.midDays, input.lateDays);
}
