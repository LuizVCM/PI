// modal erro
export function abrirModalErro(
  mensagem = "Não foi possível realizar esta operação.",
  titulo = "Ocorreu um erro",
) {
  const modal = document.getElementById("modal-erro");
  const title = document.getElementById("modal-erro-title");
  const message = document.getElementById("modal-erro-message");

  title.textContent = titulo;
  message.textContent = mensagem;

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}
export function fecharModalErro() {
  const modal = document.getElementById("modal-erro");

  modal.classList.add("hidden");
  document.body.style.overflow = "";
}
// modal confirmar
let acaoConfirmada = null;
export function abrirModalConfirmacao(
  mensagem,
  callback,
  titulo = "Confirmar ação",
) {
  document.getElementById(
    "modal-confirmacao-title",
  ).textContent = titulo;

  document.getElementById(
    "modal-confirmacao-message",
  ).textContent = mensagem;

  acaoConfirmada = callback;

  document
    .getElementById("modal-confirmacao")
    .classList.remove("hidden");

  document.body.style.overflow = "hidden";
}
export function fecharModalConfirmacao() {
  document
    .getElementById("modal-confirmacao")
    .classList.add("hidden");

  document.body.style.overflow = "";

  acaoConfirmada = null;
}