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
/** formatar valor */
