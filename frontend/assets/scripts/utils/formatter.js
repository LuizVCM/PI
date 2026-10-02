/** capitalizar letra (algumas respostas do backend não vem assim) */
export function capitalizar(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}
/** formatar data */
export function formatarData(dataISO) {
  const [ano, mes, dia] = dataISO.substring(0, 10).split("-");
  return `${dia}/${mes}/${ano}`;
}
/** escapar texto vindo do usuário antes de jogar no innerHTML
 (observacoes/detalhes são texto livre, então precisam ser tratados como tal) */
export function escapeHtml(texto) {
  const div = document.createElement("div");
  div.textContent = texto ?? "";
  return div.innerHTML;
}
/** converte data */
export function converterData(valor) {
  if (!valor) return null;
  // força horário local
  if (typeof valor === "string" && /^\d{4}-\d{2}-\d{2}$/.test(valor)) {
    return new Date(`${valor}T00:00:00`);
  }
  const date = valor instanceof Date ? valor : new Date(valor);
  return Number.isNaN(date.getTime()) ? null : date;
}