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