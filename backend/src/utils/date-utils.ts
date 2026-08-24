export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
export function calcularDataColheitaPrevista(
  dataPlantio: Date | null | undefined,
  cicloMedioDias: number | null | undefined
): Date | null {
  if (!dataPlantio || cicloMedioDias == null || cicloMedioDias <= 0) {
    return null;
  }
  return addDays(dataPlantio, cicloMedioDias);
}