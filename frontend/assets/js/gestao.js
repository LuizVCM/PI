import {
  abrirModalErro,
  fecharModalErro,
  abrirModalConfirmacao,
  fecharModalConfirmacao,
  acaoConfirmada,
} from "../utils/modals.js";
import {
  showErrorMessage,
  removeMessage,
  showErrors,
} from "../utils/show-message.js";
import { apiFetch } from "../config/api.js";
import { formatarData, escapeHtml, capitalizar } from "../utils/formatter.js";
import { mostrarConteudo } from "../utils/change-content.js";
import { carregarSementes } from "../utils/load-user-data.js";

let plantacaoEditandoId = null;

const estado = {
  sementes: [],
  plantacoes: [],
  insumos: [],
};

async function preencherSelectSementes() {
  const sementes = await carregarSementes();
  estado.sementes = sementes;
  const select = document.getElementById("cultura");
  if (!select) return;
  sementes.forEach((s) => {
    select.insertAdjacentHTML(
      "beforeend",
      `<option value="${s.id}" title="${s.dataValidade}">${escapeHtml(s.planta)}</option>`
    );
  });
}

document.addEventListener("DOMContentLoaded", () => {
  preencherSelectSementes();

  const formPlantacao = document.getElementById("form-registro-plantacao");
  formPlantacao?.addEventListener("submit", salvarPlantacao);

  document
    .querySelector(".cancelar")
    ?.addEventListener("click", resetarFormulario);

  document.getElementById("nova-semente-btn")?.addEventListener("click", () => {
    resetarFormulario();
    formPlantacao.classList.remove("hidden");
  });

  document
    .getElementById("minhas-culturas-btn")
    ?.addEventListener("click", async () => {
      mostrarConteudo("minhas-culturas-content");
      await exibirSementes();
    });

  document
    .getElementById("recomendacao-btn")
    ?.addEventListener("click", async () => {
      mostrarConteudo("recomendacao-content");
      estado.sementes = await carregarSementes();
      renderRecomendacoes(estado.sementes);
    });

  document
    .getElementById("disponivel-btn")
    ?.addEventListener("click", async () => {
      mostrarConteudo("disponivel-content");
      estado.sementes = await carregarSementes();
      renderDisponiveis(estado.sementes);
    });

  document
    .getElementById("plantas-btn")
    ?.addEventListener("click", async () => {
      mostrarConteudo("plantas-content");
      estado.plantas = await carregarPlantas();
      renderPlantas(estado.plantas);
    });

  document.querySelectorAll(".btn-voltar").forEach((btn) => {
    btn.addEventListener("click", () => {
      resetarFormulario();
      const targetId = btn.dataset.target;
      if (targetId) mostrarConteudo(targetId);
    });
  });

  configurarBusca(
    "buscar-lote",
    () => estado.sementes,
    renderSementes,
    (s) => [s.planta?.nome, s.fornecedor, s.unidadePeso]
  );

  configurarBusca(
    "buscar-recomendacao",
    () => estado.sementes,
    renderRecomendacoes,
    (s) => [s.planta?.nome, s.planta?.nomeCientifico, s.fornecedor]
  );

  configurarBusca(
    "buscar-cultura",
    () => estado.sementes,
    renderDisponiveis,
    (s) => [s.planta?.nome, s.fornecedor]
  );

  configurarBusca(
    "buscar-planta",
    () => estado.plantas,
    renderPlantas,
    (p) => [p.nome, p.nomeCientifico]
  );
});

const telaHome = document.querySelector("#main-content");
const telaCadastro = document.querySelector("#tela-cadastro");
const telaAgenda = document.querySelector("#tela-agenda");
const telaInsumos = document.querySelector("#tela-insumos");
const telaEstoque = document.querySelector("#tela-estoque");

// =========================
// BOTÕES DE ACESSO
// =========================

const btnCadastro = document.querySelector("#btnCadastro");
const btnAgenda = document.querySelector("#btnAgenda");
const btnInsumos = document.querySelector("#btnInsumos");
const btnEstoque = document.querySelector("#btnEstoque");

// =========================
// BOTÕES VOLTAR
// =========================

const btnVoltar = document.querySelector("#btnVoltar");
const btnVoltarAgenda = document.querySelector("#btnVoltarAgenda");
const btnVoltarInsumos = document.querySelector("#btnVoltarInsumos");
const btnVoltarEstoque = document.querySelector("#btnVoltarEstoque");

// =========================
// TODAS AS TELAS
// =========================

const telas = [telaHome, telaCadastro, telaAgenda, telaInsumos, telaEstoque];

// =========================
// TROCAR DE TELA
// =========================

function mostrarTela(telaSelecionada) {
  telas.forEach((tela) => {
    tela.classList.remove("ativa");
    tela.classList.add("hidden");
  });

  telaSelecionada.classList.remove("hidden");
  telaSelecionada.classList.add("ativa");
}

// =========================
// ABRIR CADASTRO
// =========================

btnCadastro.addEventListener("click", () => {
  mostrarTela(telaCadastro);
});

// =========================
// ABRIR AGENDA
// =========================

btnAgenda.addEventListener("click", () => {
  mostrarTela(telaAgenda);
});

// =========================
// ABRIR INSUMOS
// =========================

btnInsumos.addEventListener("click", () => {
  mostrarTela(telaInsumos);
});

// =========================
// ABRIR ESTOQUE
// =========================

btnEstoque.addEventListener("click", () => {
  mostrarTela(telaEstoque);
});

// =========================
// VOLTAR PARA INÍCIO
// =========================

function voltarInicio() {
  mostrarTela(telaHome);
}

// =========================
// BOTÕES VOLTAR
// =========================

btnVoltar.addEventListener("click", voltarInicio);

btnVoltarAgenda.addEventListener("click", voltarInicio);

btnVoltarInsumos.addEventListener("click", voltarInicio);

btnVoltarEstoque.addEventListener("click", voltarInicio);

// =========================
// LIMPAR CADASTRO
// =========================

const btnLimpar = document.querySelector(".btn-limpar");

if (btnLimpar) {
  btnLimpar.addEventListener("click", () => {
    const campos = telaCadastro.querySelectorAll("input, select, textarea");

    campos.forEach((campo) => {
      if (campo.tagName === "SELECT") {
        campo.selectedIndex = 0;
      } else {
        campo.value = "";
      }
    });
  });
}
// =========================
// MODAL - NOVO INSUMO
// =========================

const btnNovoInsumo = document.querySelector("#btnNovoInsumo");
const modalNovoInsumo = document.querySelector("#modalNovoInsumo");
const btnFecharModal = document.querySelector("#btnFecharModal");
const btnCancelarModal = document.querySelector("#btnCancelarModal");
const formNovoInsumo = document.querySelector("#formNovoInsumo");

// Abrir modal
if (btnNovoInsumo && modalNovoInsumo) {
  btnNovoInsumo.addEventListener("click", () => {
    modalNovoInsumo.classList.remove("hidden");
  });
}

// Fechar pelo X
btnFecharModal.addEventListener("click", () => {
  modalNovoInsumo.classList.add("hidden");
});

// Fechar pelo botão Cancelar
btnCancelarModal.addEventListener("click", () => {
  modalNovoInsumo.classList.add("hidden");
});

// Cadastrar
formNovoInsumo.addEventListener("submit", (event) => {
  event.preventDefault();

  alert("Insumo cadastrado com sucesso!");

  formNovoInsumo.reset();
  modalNovoInsumo.classList.add("hidden");
});
