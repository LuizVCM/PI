"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDays = addDays;
exports.setHarvestForecast = setHarvestForecast;
exports.formateDateToString = formateDateToString;
function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}
function setHarvestForecast(dataPlantio, cicloMedioDias) {
    if (!dataPlantio || cicloMedioDias == null || cicloMedioDias <= 0) {
        return null;
    }
    return addDays(dataPlantio, cicloMedioDias);
}
function formateDateToString(date) {
    if (date) {
        const dateToLocaleString = date.toLocaleDateString();
        const [day, month, year] = dateToLocaleString.substring(0, 10).split("/");
        return `${year}-${month}-${day}`;
    }
    else {
        return null;
    }
}
