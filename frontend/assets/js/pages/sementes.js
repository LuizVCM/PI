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

const PLANTACAO_INDISPONIVEL = "plantação indisponível";

let sementeEditandoId = null;

const estado = {
  sementes: [],
  plantas: [],
};

function formatarIntervalo(min, max, unidade = "") {
  if (min === null && max === null) return "indisponível";
  if (min === null) return `${min}${unidade}`;
  if (max === null) return `${max}${unidade}`;
  return `${min} – ${max}${unidade}`;
}

// modais
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
    if (acaoConfirmada) {
      await acaoConfirmada();
    }
    fecharModalConfirmacao();
  });

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    fecharModalErro();
    fecharModalConfirmacao();
    fecharModalFontes();
  }
});

async function carregarPlantas() {
  try {
    return await apiFetch("/plants/all", { method: "GET" });
  } catch (error) {
    console.error(error);
    abrirModalErro("Erro ao carregar plantas.");
    return [];
  }
}

async function carregarSementes() {
  try {
    return await apiFetch("/seeds/me", { method: "GET" });
  } catch (error) {
    console.error(error);
    abrirModalErro("Erro ao carregar sementes.");
    return [];
  }
}

async function preencherSelectPlantas() {
  const plantas = await carregarPlantas();
  estado.plantas = plantas;
  const select = document.getElementById("especie-semente");
  if (!select) return;
  select.innerHTML = '<option value="">Selecione...</option>';
  plantas.forEach((p) => {
    select.insertAdjacentHTML(
      "beforeend",
      `<option value="${p.id}">${escapeHtml(p.nome)}</option>`
    );
  });
}

async function exibirSementes() {
  estado.sementes = await carregarSementes();
  renderSementes(estado.sementes);
}

function renderSementes(sementes) {
  const container = document.getElementById("lista-sementes");
  if (!container) return;

  if (!sementes.length) {
    container.innerHTML = "<p>Nenhuma semente cadastrada.</p>";
    return;
  }

  let html = "";

  sementes.forEach((s) => {
    const p = s.planta ?? {};
    const inicial = p.nome[0].toUpperCase();

    html += `
      <div class="semente-cadastrada" data-id="${s.id}">
        <div class="semente-icon">${inicial}</div>
        <span class="opcao-semente">Cultura: ${p.nome}</span>
        <span class="opcao-semente">Fornecedor: ${s.fornecedor}</span>
        <span class="opcao-semente">Data de compra: ${formatarData(
          s.dataCompra
        )}</span>
        <span class="opcao-semente">Quantidade: ${s.quantidade} ${
      s.unidadePeso
    }</span>
        <span class="opcao-semente">Validade: ${formatarData(
          s.dataValidade
        )}</span>

        <span class="opcao-semente editar" data-id="${s.id}">
          <i class="fa-solid fa-pen-to-square"></i>
        </span>
        <span class="opcao-semente excluir" data-id="${s.id}">
          <i class="fa-solid fa-trash"></i>
        </span>
      </div>
    `;
  });

  container.innerHTML = html;

  container.querySelectorAll(".editar").forEach((btn) => {
    btn.addEventListener("click", () => {
      const s = sementes.find((x) => String(x.id) === String(btn.dataset.id));
      if (s) editarSemente(s);
    });
  });

  container.querySelectorAll(".excluir").forEach((btn) => {
    btn.addEventListener("click", () => excluirSemente(btn.dataset.id));
  });
}

function editarSemente(s) {
  sementeEditandoId = s.id;

  document.getElementById("especie-semente").value = s.planta?.id ?? "";
  document.getElementById("data-validade").value =
    s.dataValidade?.substring(0, 10) ?? "";
  document.getElementById("quantidade").value = s.quantidade ?? "";
  document.getElementById("peso").value = s.unidadePeso ?? "kg";
  document.getElementById("data-compra").value =
    s.dataCompra?.substring(0, 10) ?? "";
  document.getElementById("nome-fornecedor").value =
    s.fornecedor === "não informado" ? "" : s.fornecedor ?? "";
  document.getElementById("observacaos").value =
    s.observacoes === "sem observações" ? "" : s.observacoes ?? "";

  document.getElementById("nova-semente").textContent = "Atualizar";
  document.getElementById("titulo-form-semente").textContent =
    "Atualizar cultura";
  document.getElementById("novo-lote").textContent = "Atualizar";
  document.querySelector(".salvar-lote").textContent = "Salvar alterações";
  document.getElementById("form-registro-semente").classList.remove("hidden");
}

async function salvarSemente(event) {
  event.preventDefault();

  const form = document.getElementById("form-registro-semente");
  removeMessage(form);

  const plantaId = Number(document.getElementById("especie-semente").value);
  const dataCompra = document.getElementById("data-compra").value;
  const dataValidade = document.getElementById("data-validade").value;
  const quantidade = Number(document.getElementById("quantidade").value);
  const unidadePeso = document.getElementById("peso").value;
  const fornecedor = document.getElementById("nome-fornecedor").value.trim();
  const observacoes = document.getElementById("observacaos").value.trim();

  if (
    !plantaId ||
    !dataCompra ||
    !dataValidade ||
    !quantidade ||
    quantidade <= 0
  ) {
    showErrorMessage("Preencha todos os campos corretamente.", form);
    return;
  }

  const body = {
    plantaId,
    dataCompra,
    dataValidade,
    quantidade,
    unidadePeso,
    fornecedor,
    observacoes,
  };

  const botao = form.querySelector(".salvar-lote");
  const editando = Boolean(sementeEditandoId);

  botao.disabled = true;
  botao.textContent = "Salvando...";

  try {
    const path = editando ? `/seeds/${sementeEditandoId}` : "/seeds";

    await apiFetch(path, {
      method: editando ? "PUT" : "POST",
      body: JSON.stringify(body),
    });

    resetarFormulario();
    await exibirSementes();
  } catch (error) {
    console.error(error);

    if (error.message) showErrorMessage(error.message, form);

    if (error.errors) {
      const errors = Object.values(error.errors).flat();
      if (errors.length === 1) {
        showErrorMessage(errors[0].message || String(errors[0]), form);
      } else {
        showErrors(errors, form);
      }
    }

    if (!error.message && !error.errors) {
      showErrorMessage("Erro ao conectar com o servidor.", form);
    }
  } finally {
    botao.disabled = false;
    botao.textContent = editando ? "Salvar alterações" : "Salvar lote";
  }
}

function resetarFormulario() {
  sementeEditandoId = null;

  const form = document.getElementById("form-registro-semente");
  form.reset();
  form.classList.add("hidden");

  document.querySelector(".salvar-lote").textContent = "Salvar lote";
  document.getElementById("nova-semente").textContent = "Nova semente";
  document.getElementById("titulo-form-semente").textContent =
    "Registrar nova cultura";
  document.getElementById("novo-lote").textContent = "Nova cultura";
  removeMessage(form);
}

async function excluirSemente(id) {
  abrirModalConfirmacao(
    "Tem certeza que deseja excluir esta semente?",
    async () => {
      try {
        await apiFetch(`/seeds/${id}`, { method: "DELETE" });
        await exibirSementes();
      } catch (error) {
        console.error(error);
        abrirModalErro(
          error.message || "Não foi possível excluir a semente.",
          "Erro ao excluir"
        );
      }
    },
    "Excluir semente"
  );
}

function renderRecomendacoes(sementes) {
  const container = document.getElementById("lista-recomendacoes");
  if (!container) return;

  if (!sementes.length) {
    container.innerHTML = "<p>Nenhuma semente encontrada.</p>";
    return;
  }

  let html = "";

  sementes.forEach((s) => {
    const p = s.planta ?? {};
    const temObs = s.observacoes && s.observacoes !== "sem observações";

    html += `
      <div class="recomendacao-card">
        <div class="cabecalho">
          <h3>${p.nome}</h3>
          <span class="tag">Lote #${s.id}</span>
        </div>

        <p class="nome-cientifico"><em>${p.nomeCientifico}</em></p>

        <div class="bloco">
          <h4>Semente</h4>
          <p><strong>Quantidade:</strong> ${s.quantidade} ${s.unidadePeso}</p>
          <p><strong>Validade:</strong> ${formatarData(s.dataValidade)}</p>
          <p><strong>Comprada em:</strong> ${formatarData(s.dataCompra)}</p>
          <p><strong>Fornecedor:</strong> ${s.fornecedor}</p>
        </div>

        <div class="bloco">
          <h4>Ciclo</h4>
          <p>${formatarIntervalo(
            p.cicloMinimoDias,
            p.cicloMaximoDias,
            " dias"
          )}</p>
        </div>

        <div class="bloco">
          <h4>Solo</h4>
          <p><strong>pH ideal:</strong> ${formatarIntervalo(
            p.phMinimo,
            p.phMaximo
          )}</p>
          <p><strong>Textura:</strong> ${p.texturaSolo}</p>
        </div>

        <div class="bloco">
          <h4>Clima</h4>
          <p><strong>Temperatura:</strong> ${formatarIntervalo(
            p.temperaturaMinima,
            p.temperaturaMaxima,
            " °C"
          )}</p>
          <p><strong>Precipitação:</strong> ${formatarIntervalo(
            p.precipitacaoMinima,
            p.precipitacaoMaxima,
            " mm"
          )}</p>
          <p><strong>Luz:</strong> ${p.necessidadeLuz}</p>
          <p><strong>Água:</strong> ${p.necessidadeAgua}</p>
        </div>

        <div class="bloco">
          <h4>Nutrição</h4>
          <p><strong>Kc médio:</strong> ${p.kcMedio}</p>
          <p><strong>Nitrogênio:</strong> ${p.nitrogenio}</p>
          <p><strong>Fósforo:</strong> ${p.fosforo}</p>
          <p><strong>Potássio:</strong> ${p.potassio}</p>
          <p><strong>Unidade NPK:</strong> ${p.unidadeNpk}</p>
        </div>

        ${
          temObs
            ? `<div class="bloco"><h4>Suas observações</h4><p>${capitalizar(
                escapeHtml(s.observacoes)
              )}</p></div>`
            : ""
        }
      </div>
    `;
  });

  container.innerHTML = html;
}

function renderDisponiveis(sementes) {
  const container = document.getElementById("lista-culturas-disponiveis");
  if (!container) return;

  const disponiveis = sementes.filter(
    (s) => s.plantacao === PLANTACAO_INDISPONIVEL
  );

  if (!disponiveis.length) {
    container.innerHTML = "<p>Nenhuma cultura disponível.</p>";
    return;
  }

  let html = "";

  disponiveis.forEach((s) => {
    const p = s.planta ?? {};
    const inicial = (p.nome ?? "?")[0].toUpperCase();

    html += `
      <div class="semente-cadastrada" data-id="${s.id}">
        <div class="semente-icon">${inicial}</div>
        <span class="opcao-semente">cultura: ${p.nome}</span>
        <span class="opcao-semente">quantidade: ${s.quantidade} ${
      s.unidadePeso
    }</span>
        <span class="opcao-semente">validade: ${formatarData(
          s.dataValidade
        )}</span>
        <span class="opcao-semente">fornecedor: ${s.fornecedor}</span>
      </div>
    `;
  });

  container.innerHTML = html;
}

// plantas do banco
function renderPlantas(plantas) {
  const container = document.getElementById("lista-plantas");
  if (!container) return;

  if (!plantas.length) {
    container.innerHTML = "<p>Nenhuma planta encontrada.</p>";
    return;
  }

  let html = "";

  plantas.forEach((p) => {
    html += `
      <div class="planta-card">
        <h3>${p.nome}</h3>
        <p class="nome-cientifico"><em>${p.nomeCientifico}</em></p>
        <p><strong>Ciclo:</strong> ${formatarIntervalo(
          p.cicloMinimoDias,
          p.cicloMaximoDias,
          " dias"
        )}</p>
        <p><strong>pH:</strong> ${formatarIntervalo(p.phMinimo, p.phMaximo)}</p>
        <p><strong>Temperatura:</strong> ${formatarIntervalo(
          p.temperaturaMinima,
          p.temperaturaMaxima,
          " °C"
        )}</p>
        <p><strong>Precipitação:</strong> ${formatarIntervalo(
          p.precipitacaoMinima,
          p.precipitacaoMaxima,
          " mm"
        )}</p>
        <p><strong>Kc médio:</strong> ${p.kcMedio}</p>
      </div>
    `;
  });

  container.innerHTML = html;
}

/** configurarBusca:
 * - inputId: ID do campo de busca (string)
 * - dados: array de dados a serem filtrados
 * - renderizar: função que mostra os resultados na tela
 * - extrator: função que extrai os campos de cada item para comparação com o termo digitado */
function configurarBusca(inputId, dadosArray, renderizar, extrator) {
  // busca elemento por id
  const input = document.getElementById(inputId);
  if (!input) return; // se não existe, nem continua

  input.addEventListener("input", () => {
    // normaliza o termo digitado: minúsculo e sem espaços extras
    const termo = input.value.toLowerCase().trim();

    const dados = dadosArray();

    // se o campo estiver vazio, renderiza todos os dados
    if (!termo) {
      renderizar(dados);
      return;
    }

    // filtra os dados: para cada item, aplica o extrator
    // o extrator deve retornar uma lista de valores (ex.: nome, descrição)
    // depois verifica se algum desses valores contém o termo digitado
    const filtrados = dados.filter((item) =>
      extrator(item).some((v) =>
        String(v ?? "")
          .toLowerCase()
          .includes(termo)
      )
    );

    // renderiza apenas os itens filtrados
    renderizar(filtrados);
  });
}

// eventos
document.addEventListener("DOMContentLoaded", () => {
  preencherSelectPlantas();

  const formSemente = document.getElementById("form-registro-semente");
  formSemente?.addEventListener("submit", salvarSemente);

  document
    .querySelector(".cancelar")
    ?.addEventListener("click", resetarFormulario);

  document.getElementById("nova-semente-btn")?.addEventListener("click", () => {
    resetarFormulario();
    formSemente.classList.remove("hidden");
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
    (s) => [s.id, s.planta?.nome, s.fornecedor, s.unidadePeso]
  );

  configurarBusca(
    "buscar-recomendacao",
    () => estado.sementes,
    renderRecomendacoes,
    (s) => [s.id, s.planta?.nome, s.planta?.nomeCientifico, s.fornecedor]
  );

  configurarBusca(
    "buscar-cultura",
    () => estado.sementes,
    renderDisponiveis,
    (s) => [s.id, s.planta?.nome, s.fornecedor]
  );

  configurarBusca(
    "buscar-planta",
    () => estado.plantas,
    renderPlantas,
    (p) => [p.nome, p.nomeCientifico]
  );
});

/* modal das fontes */
function abrirModalFontes() {
  document.getElementById("modal-fontes").classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function fecharModalFontes() {
  document.getElementById("modal-fontes").classList.add("hidden");
  document.body.style.overflow = "";
}

document
  .getElementById("abrir-fontes-btn")
  ?.addEventListener("click", abrirModalFontes);
document
  .getElementById("modal-fontes-close")
  ?.addEventListener("click", fecharModalFontes);
document
  .getElementById("modal-fontes-fechar")
  ?.addEventListener("click", fecharModalFontes);
document
  .getElementById("modal-fontes-overlay")
  ?.addEventListener("click", fecharModalFontes);
