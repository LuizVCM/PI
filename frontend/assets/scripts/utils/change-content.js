export function mostrarConteudo(id) {
  document.querySelectorAll(".content").forEach((el) => el.classList.add("hidden"));
  document.getElementById(id)?.classList.remove("hidden");
}