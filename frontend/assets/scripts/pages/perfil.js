import {
  abrirModalErro,
  fecharModalErro,
  abrirModalConfirmacao,
  fecharModalConfirmacao,
  acaoConfirmada,
} from "../utils/modals.js";
import { showErrorMessage, removeMessage } from "../utils/show-message.js";
import { apiFetch } from "../config/api.js";
import { carregarUsuario } from "../utils/load-user-data.js";
import {
  aplicarMascaraTelefone,
  aplicarMascaraCpf,
  aplicarMascaraCep,
  aplicarCapitalizacao,
  formatarTelefone,
  formatarCpf,
  formatarCep
} from "../utils/masks.js";

let usuarioAtual = null;

const el = {
  // tela
  foto: document.getElementById("foto-usuario"),
  nome: document.getElementById("nome-usuario"),
  infoEmail: document.getElementById("info-email"),
  infoFone: document.getElementById("info-telefone"),
  infoCpf: document.getElementById("info-cpf"),
  infoLocal: document.getElementById("info-localizacao"),

  // botões da tela
  btnEditarPerfil: document.getElementById("btn-editar-perfil"),
  btnExcluirPerfil: document.getElementById("btn-excluir-perfil"),
  btnEditarTerr: document.getElementById("btn-editar-territorio"),
  btnExcluirTerr: document.getElementById("btn-excluir-territorio"),

  // modal editar perfil
  modalEditar: document.getElementById("modal-editar-perfil"),
  formEditar: document.getElementById("form-editar-perfil"),
  campoNome: document.getElementById("edit-nome"),
  campoSobrenome: document.getElementById("edit-sobrenome"),
  campoEmail: document.getElementById("edit-email"),
  campoCpf: document.getElementById("edit-cpf"),
  campoFone: document.getElementById("edit-telefone"),

  // modal editar território
  modalEditarTerr: document.getElementById("modal-editar-territorio"),
  formEditarTerr: document.getElementById("form-editar-territorio"),
  campoCep: document.getElementById("edit-cep"),
  campoArea: document.getElementById("edit-area"),
  campoUnidade: document.getElementById("edit-unidade"),
};

function preencherTela(user) {
  const territorio = user.territorios?.[0];

  el.foto.textContent = (user.nome ?? "?").substring(0, 2);
  el.nome.textContent = `${user.nome ?? ""} ${user.sobrenome ?? ""}`.trim();
  el.infoEmail.textContent = user.email || "—";
  el.infoFone.textContent = user.telefone
    ? formatarTelefone(user.telefone)
    : "—";
  el.infoCpf.textContent = user.cpf || "—";
  el.infoLocal.textContent = territorio
    ? [territorio.logradouro, territorio.cidade].filter(Boolean).join(", ")
    : "Nenhum território cadastrado";
}

function preencherFormPerfil(user) {
  el.campoNome.value = user.nome ?? "";
  el.campoSobrenome.value = user.sobrenome ?? "";
  el.campoEmail.value = user.email ?? "";
  el.campoCpf.value = user.cpf ? formatarCpf(user.cpf) : "";
  el.campoFone.value = user.telefone ? formatarTelefone(user.telefone) : "";
}

function preencherFormTerritorio(t) {
  el.campoCep.value = t?.cep ? formatarCep(t.cep) : "";
  el.campoArea.value = t?.area ?? "";
  el.campoUnidade.value = t?.unidadeArea ?? "m2";
}

async function carregarDadosPerfil() {
  try {
    usuarioAtual = await carregarUsuario();
    if (!usuarioAtual) return;
    preencherTela(usuarioAtual);
  } catch (error) {
    console.error(error);
    abrirModalErro("Não foi possível carregar os dados do perfil.");
  }
}

function abrirModalEditarPerfil() {
  if (!usuarioAtual) return;

  preencherFormPerfil(usuarioAtual);
  removeMessage(el.formEditar);

  el.modalEditar.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function fecharModalEditarPerfil() {
  el.modalEditar.classList.add("hidden");
  document.body.style.overflow = "";
  removeMessage(el.formEditar);
}

async function salvarPerfil(event) {
  event.preventDefault();
  removeMessage(el.formEditar);

  const body = {
    nome: el.campoNome.value.trim(),
    sobrenome: el.campoSobrenome.value.trim(),
    email: el.campoEmail.value.trim(),
    cpf: el.campoCpf.value,
    telefone: el.campoFone.value,
  };

  if (!body.nome || !body.sobrenome || !body.email) {
    showErrorMessage("Preencha nome, sobrenome e e-mail.", el.formEditar);
    return;
  }

  const btn = el.formEditar.querySelector("button[type='submit']");
  const textoOriginal = btn.textContent;
  btn.disabled = true;
  btn.textContent = "Salvando...";

  try {
    await apiFetch("/users", {
      method: "PUT",
      body: JSON.stringify(body),
    });

    fecharModalEditarPerfil();
    await carregarDadosPerfil();
  } catch (error) {
    console.error(error);
    tratarErroForm(error, el.formEditar);
  } finally {
    btn.disabled = false;
    btn.textContent = textoOriginal;
  }
}

function abrirModalEditarTerritorio() {
  const t = usuarioAtual?.territorios?.[0];

  if (!t) {
    abrirModalErro("Nenhum território cadastrado para editar.");
    return;
  }

  preencherFormTerritorio(t);
  removeMessage(el.formEditarTerr);

  el.modalEditarTerr.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function fecharModalEditarTerritorio() {
  el.modalEditarTerr.classList.add("hidden");
  document.body.style.overflow = "";
  removeMessage(el.formEditarTerr);
}

async function salvarTerritorio(event) {
  event.preventDefault();
  removeMessage(el.formEditarTerr);

  const id = usuarioAtual?.territorios?.[0]?.id;
  if (!id) {
    abrirModalErro("Nenhum território cadastrado para editar.");
    return;
  }

  const body = {
    cep: el.campoCep.value.trim(),
    area: Number(el.campoArea.value),
    unidadeArea: el.campoUnidade.value,
  };

  if (!body.cep || !body.area || body.area <= 0) {
    showErrorMessage(
      "Preencha CEP, área e unidade corretamente.",
      el.formEditarTerr,
    );
    return;
  }

  const btn = el.formEditarTerr.querySelector("button[type='submit']");
  const textoOriginal = btn.textContent;
  btn.disabled = true;
  btn.textContent = "Salvando...";

  try {
    await apiFetch(`/territories/${id}`, {
      method: "PUT",
      body: JSON.stringify(body),
    });

    fecharModalEditarTerritorio();
    await carregarDadosPerfil();
  } catch (error) {
    console.error(error);
    tratarErroForm(error, el.formEditarTerr);
  } finally {
    btn.disabled = false;
    btn.textContent = textoOriginal;
  }
}

function tratarErroForm(error, form) {
  if (error.message) {
    showErrorMessage(error.message, form);
    return;
  }

  if (error.errors) {
    const msgs = Object.values(error.errors).flat();
    showErrorMessage(msgs.map((m) => m.message || m).join(" • "), form);
    return;
  }

  showErrorMessage("Erro ao conectar com o servidor.", form);
}

function confirmarExclusaoPerfil() {
  abrirModalConfirmacao(
    "Tem certeza que deseja excluir sua conta? Essa ação, no momento, não é reversível.",
    async () => {
      try {
        await apiFetch("/users", { method: "DELETE" });
        window.location.href = "./formulario.html";
      } catch (error) {
        console.error(error);
        abrirModalErro(
          error.message || "Não foi possível excluir o perfil.",
          "Erro ao excluir",
        );
      }
    },
    "Excluir conta",
  );
}

function confirmarExclusaoTerritorio() {
  const id = usuarioAtual?.territorios?.[0]?.id;

  if (!id) {
    abrirModalErro("Nenhum território cadastrado para excluir.");
    return;
  }

  abrirModalConfirmacao(
    "Tem certeza que deseja excluir este território? Ao excluí-lo, você será direcionado para autenticar e cadastrar um novamente.",
    async () => {
      try {
        await apiFetch(`/territories/${id}`, { method: "DELETE" });
        window.location.href = "./formulario.html";
      } catch (error) {
        console.error(error);
        abrirModalErro(
          error.message || "Não foi possível excluir o território.",
          "Erro ao excluir",
        );
      }
    },
    "Excluir território",
  );
}

document
  .getElementById("modal-erro-close")
  ?.addEventListener("click", fecharModalErro);
document
  .getElementById("modal-erro-fechar")
  ?.addEventListener("click", fecharModalErro);
document
  .getElementById("modal-erro-overlay")
  ?.addEventListener("click", fecharModalErro);

document
  .getElementById("modal-confirmacao-close")
  ?.addEventListener("click", fecharModalConfirmacao);
document
  .getElementById("modal-confirmacao-cancelar")
  ?.addEventListener("click", fecharModalConfirmacao);
document
  .getElementById("modal-confirmacao-overlay")
  ?.addEventListener("click", fecharModalConfirmacao);
document
  .getElementById("modal-confirmacao-confirmar")
  ?.addEventListener("click", async () => {
    if (acaoConfirmada) await acaoConfirmada();
    fecharModalConfirmacao();
  });

document
  .getElementById("modal-editar-perfil-close")
  ?.addEventListener("click", fecharModalEditarPerfil);
document
  .getElementById("modal-editar-perfil-overlay")
  ?.addEventListener("click", fecharModalEditarPerfil);
document
  .getElementById("btn-cancelar-edicao")
  ?.addEventListener("click", fecharModalEditarPerfil);
el.formEditar?.addEventListener("submit", salvarPerfil);

document
  .getElementById("modal-editar-territorio-close")
  ?.addEventListener("click", fecharModalEditarTerritorio);
document
  .getElementById("modal-editar-territorio-overlay")
  ?.addEventListener("click", fecharModalEditarTerritorio);
document
  .getElementById("btn-cancelar-territorio")
  ?.addEventListener("click", fecharModalEditarTerritorio);
el.formEditarTerr?.addEventListener("submit", salvarTerritorio);

el.btnEditarPerfil?.addEventListener("click", abrirModalEditarPerfil);
el.btnEditarTerr?.addEventListener("click", abrirModalEditarTerritorio);
el.btnExcluirPerfil?.addEventListener("click", confirmarExclusaoPerfil);
el.btnExcluirTerr?.addEventListener("click", confirmarExclusaoTerritorio);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    fecharModalErro();
    fecharModalConfirmacao();
    fecharModalEditarPerfil();
    fecharModalEditarTerritorio();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  aplicarMascaraTelefone(el.campoFone);
  aplicarMascaraCpf(el.campoCpf);
  aplicarMascaraCep(el.campoCep);
  aplicarCapitalizacao(el.campoNome);
  aplicarCapitalizacao(el.campoSobrenome);
  carregarDadosPerfil();
});
