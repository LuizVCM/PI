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
import { carregarUsuario } from "../utils/load-user-data.js";

const PLANTACAO_INDISPONIVEL = "plantação indisponível";

let cropEditandoId = null;
let insumoEditandoId = null;
let cropColheitaId = null;
let insumoConsumoId = null;

const estado = {
  crops: [],
  sementes: [],
  stocks: [],
  territorioId: null,
};

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

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    fecharModalErro();
    fecharModalConfirmacao();
    fecharModalInsumo();
    fecharModalColheita();
    fecharModalConsumo();
  }
});

const modalNovoInsumo = document.getElementById("modalNovoInsumo");
const formNovoInsumo = document.getElementById("formNovoInsumo");

function abrirModalInsumo(insumo = null) {
  insumoEditandoId = insumo?.id ?? null;

  document.getElementById("titulo-modal-insumo").textContent = insumo
    ? "Editar Insumo"
    : "Novo Insumo";

  formNovoInsumo.reset();

  if (insumo) {
    document.getElementById("nomeInsumo").value = insumo.nome ?? "";
    document.getElementById("categoriaInsumo").value = insumo.categoria ?? "";
    document.getElementById("quantidadeInsumo").value = insumo.quantidade ?? "";
    document.getElementById("unidadeInsumo").value = insumo.unidade ?? "";
    document.getElementById("validadeInsumo").value =
      insumo.dataValidade?.substring(0, 10) ?? "";
    document.getElementById("limiteMinimoInsumo").value =
      insumo.limiteMinimo ?? "";
  }

  modalNovoInsumo.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function fecharModalInsumo() {
  modalNovoInsumo?.classList.add("hidden");
  document.body.style.overflow = "";
  insumoEditandoId = null;
  formNovoInsumo?.reset();
}

const modalColheita = document.getElementById("modalColheita");

function abrirModalColheita(crop) {
  cropColheitaId = crop.id;

  const culturaNome = crop.sementes?.planta?.nome ?? "—";
  document.getElementById("colheita-info").textContent = `${
    crop.nome
  } · ${culturaNome} · prevista para ${formatarData(
    crop.dataColheitaPrevista,
  )}`;

  // default = hoje
  document.getElementById("dataColheitaReal").value = new Date()
    .toISOString()
    .substring(0, 10);

  modalColheita.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function fecharModalColheita() {
  modalColheita?.classList.add("hidden");
  document.body.style.overflow = "";
  cropColheitaId = null;
  document.getElementById("formColheita")?.reset();
}

const modalConsumo = document.getElementById("modalConsumo");
const formConsumo = document.getElementById("formConsumo");

function abrirModalConsumo(insumo) {
  insumoConsumoId = insumo.id;

  document.getElementById("consumo-info").textContent =
    `${insumo.nome} · saldo atual: ${insumo.quantidade} ${
      insumo.unidade ?? ""
    }`;

  formConsumo.reset();
  document.getElementById("quantidadeConsumo").value = "";

  modalConsumo.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function fecharModalConsumo() {
  modalConsumo?.classList.add("hidden");
  document.body.style.overflow = "";
  insumoConsumoId = null;
  formConsumo?.reset();
}

async function registrarConsumo(event) {
  event.preventDefault();

  if (!insumoConsumoId) return;

  const insumo = estado.stocks.find(
    (s) => String(s.id) === String(insumoConsumoId),
  );
  if (!insumo) return;

  const consumido = Number(document.getElementById("quantidadeConsumo").value);

  if (!consumido || consumido <= 0) return;

  const saldoAtual = Number(insumo.quantidade ?? 0);
  const novoSaldo = Math.max(0, saldoAtual - consumido);

  const btn = event.target.querySelector("button[type='submit']");
  btn.disabled = true;
  btn.textContent = "Salvando...";

  try {
    await apiFetch(`/stocks/${insumoConsumoId}`, {
      method: "PUT",
      body: JSON.stringify({ quantidade: novoSaldo }),
    });

    fecharModalConsumo();
    await exibirStocks();
  } catch (error) {
    console.error(error);
    abrirModalErro(
      error.message || "Não foi possível registrar o consumo.",
      "Erro",
    );
  } finally {
    btn.disabled = false;
    btn.textContent = "Confirmar consumo";
  }
}

async function zerarInsumo(id) {
  const insumo = estado.stocks.find((s) => String(s.id) === String(id));
  if (!insumo) return;

  abrirModalConfirmacao(
    `Zerar o estoque de "${insumo.nome}"? Isso define a quantidade para 0.`,
    async () => {
      try {
        await apiFetch(`/stocks/${id}`, {
          method: "PUT",
          body: JSON.stringify({ quantidade: 0 }),
        });
        await exibirStocks();
      } catch (error) {
        console.error(error);
        abrirModalErro(
          error.message || "Não foi possível zerar o insumo.",
          "Erro",
        );
      }
    },
    "Zerar estoque",
  );
}

async function preencherSelectSementes() {
  try {
    const sementes = await carregarSementes();
    const disponiveis = sementes.filter(
      (s) => s.plantacao === PLANTACAO_INDISPONIVEL,
    );
    estado.sementes = disponiveis;

    const select = document.getElementById("cultura");
    if (!select) return;

    select.innerHTML = '<option value="">Selecione...</option>';
    disponiveis.forEach((s) => {
      select.insertAdjacentHTML(
        "beforeend",
        `<option value="${s.id}">${escapeHtml(
          s.planta?.nome ?? "Sem nome",
        )}</option>`,
      );
    });
  } catch (err) {
    console.error(err);
  }
}

async function exibirCrops() {
  try {
    estado.crops = (await apiFetch("/crops/me")) ?? [];
    renderCrops(estado.crops);
  } catch (err) {
    console.error(err);
    abrirModalErro("Não foi possível carregar as plantações.", "Erro");
  }
}

function renderCrops(crops) {
  const container = document.getElementById("lista-plantacoes");
  if (!container) return;

  if (!crops.length) {
    container.innerHTML = "<p>Nenhuma plantação cadastrada.</p>";
    return;
  }

  let html = "";

  crops.forEach((c) => {
    const culturaNome = c.cultura?.planta?.nome ?? "—";
    const inicial = (culturaNome[0] ?? "?").toUpperCase();
    const categoria = c.cultura?.planta?.categoria ?? "";
    let areaFormatada = c.unidadeArea ?? "";
    let unidadeArea;
    switch (areaFormatada) {
      case "m2":
        unidadeArea = "m²";
        break;
      case "km2":
        unidadeArea = "km²";
        break;
      default:
        unidadeArea = "ha";
        break;
    }

    html += `
      <div class="plantacao-cadastrada" data-id="${c.id}">
        <div class="plantacao-icon" data-categoria="${categoria}">${inicial}</div>
        <span class="opcao-plantacao">Área: ${escapeHtml(c.nome ?? "")}</span>
        <span class="opcao-plantacao">Cultura: ${escapeHtml(culturaNome)}</span>
        <span class="opcao-plantacao">Extensão: ${
          c.area ?? "—"
        } ${unidadeArea}</span>
        <span class="opcao-plantacao">Plantio: ${formatarData(
          c.dataPlantio,
        )}</span>
        <span class="opcao-plantacao">Prevista: ${formatarData(
          c.dataColheitaPrevista,
        )}</span>
        <span class="opcao-plantacao">Status: ${capitalizar(
          c.status ?? "",
        )}</span>

        <div class="acoes">
          <span class="opcao-plantacao btn-editar" data-id="${c.id}">
            <i class="fa-solid fa-pen"></i>
          </span>
          <span class="opcao-plantacao btn-excluir" data-id="${c.id}">
            <i class="fa-solid fa-trash-can"></i>
          </span>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;

  container.querySelectorAll(".btn-editar").forEach((btn) => {
    btn.addEventListener("click", () => {
      const c = crops.find((x) => String(x.id) === String(btn.dataset.id));
      if (c) editarCrop(c);
    });
  });

  container.querySelectorAll(".btn-excluir").forEach((btn) => {
    btn.addEventListener("click", () => excluirCrop(btn.dataset.id));
  });
}

function editarCrop(c) {
  cropEditandoId = c.id;

  const select = document.getElementById("cultura");
  const jaExiste = [...select.options].some(
    (o) => o.value === String(c.cultura.planta.id),
  );
  if (!jaExiste) {
    select.insertAdjacentHTML(
      "beforeend",
      `<option value="${c.cultura.planta.id}">${c.cultura.planta.nome}</option>`,
    );
  }
  select.value = c.cultura.planta.id;

  document.getElementById("nome-plantacao").value = c.nome ?? "";
  document.getElementById("cultura").value = c.cultura.planta.id ?? "";
  document.getElementById("area").value = c.area ?? "";
  document.getElementById("unidade").value = c.unidadeArea ?? "m2";
  document.getElementById("variedade").value = c.variedade ?? "";
  document.getElementById("responsavel").value = c.responsavel ?? "";
  document.getElementById("plantio").value =
    c.dataPlantio?.substring(0, 10) ?? "";
  document.getElementById("status").value = c.status ?? "planejada";
  document.getElementById("observacoes").value = c.observacoes ?? "";

  document.getElementById("nova-plantacao").textContent = "Atualizar";
  document.getElementById("titulo-form-plantacao").textContent =
    "Atualizar plantação";
  document.getElementById("novo-lote").textContent = "Atualizar";

  const form = document.getElementById("form-registro-plantacao");
  form.querySelector(".salvar").textContent = "Salvar alterações";
  form.classList.remove("hidden");
}

async function salvarCrop(event) {
  event.preventDefault();

  const form = document.getElementById("form-registro-plantacao");
  removeMessage(form);

  const nome = document.getElementById("nome-plantacao").value.trim();
  const sementeId = Number(document.getElementById("cultura").value);
  const area = Number(document.getElementById("area").value);
  const unidadeArea = document.getElementById("unidade").value;
  const variedade = document.getElementById("variedade").value.trim();
  const responsavel = document.getElementById("responsavel").value.trim();
  const dataPlantio = document.getElementById("plantio").value;
  const status = document.getElementById("status").value;
  const observacoes = document.getElementById("observacoes").value.trim();

  if (!nome || !sementeId || !area || area <= 0 || !dataPlantio) {
    showErrorMessage("Preencha todos os campos obrigatórios.", form);
    return;
  }

  const body = {
    nome,
    sementeId,
    area,
    unidadeArea,
    variedade,
    responsavel,
    dataPlantio,
    status,
    observacoes,
  };

  const botao = form.querySelector(".salvar");
  const editando = Boolean(cropEditandoId);

  botao.disabled = true;
  botao.textContent = "Salvando...";

  try {
    // POST usa territorioId na URL; PUT usa cropId
    const path = editando
      ? `/crops/${cropEditandoId}`
      : `/crops/${estado.territorioId}`;

    await apiFetch(path, {
      method: editando ? "PUT" : "POST",
      body: JSON.stringify(body),
    });

    resetarFormulario();
    await exibirCrops();
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
    botao.textContent = editando ? "Salvar alterações" : "Salvar";
  }
}

function resetarFormulario() {
  cropEditandoId = null;

  const form = document.getElementById("form-registro-plantacao");
  if (!form) return;

  form.reset();
  form.classList.add("hidden");
  preencherSelectSementes();
  form.querySelector(".salvar").textContent = "Salvar";
  document.getElementById("nova-plantacao").textContent = "Nova plantação";
  document.getElementById("titulo-form-plantacao").textContent =
    "Registrar nova plantação";
  document.getElementById("novo-lote").textContent = "Nova plantação";

  removeMessage(form);
}

async function excluirCrop(id) {
  abrirModalConfirmacao(
    "Tem certeza que deseja excluir esta plantação?",
    async () => {
      try {
        await apiFetch(`/crops/${id}`, { method: "DELETE" });
        await exibirCrops();
      } catch (error) {
        console.error(error);
        abrirModalErro(
          error.message || "Não foi possível excluir a plantação.",
          "Erro ao excluir",
        );
      }
    },
    "Excluir plantação",
  );
}

function hojeISO() {
  return new Date().toISOString().substring(0, 10);
}

async function exibirAgenda() {
  try {
    estado.crops = (await apiFetch("/crops/me")) ?? [];
    renderAgenda(estado.crops);
  } catch (err) {
    console.error(err);
    abrirModalErro("Não foi possível carregar a agenda.", "Erro");
  }
}

function renderAgenda(crops) {
  const tbody = document.getElementById("tbody-agenda");
  if (!tbody) return;

  // Ordena por data prevista
  const ordenados = [...crops].sort((a, b) => {
    const da = a.dataColheitaPrevista ?? "9999-12-31";
    const db = b.dataColheitaPrevista ?? "9999-12-31";
    return da.localeCompare(db);
  });

  if (!ordenados.length) {
    tbody.innerHTML =
      '<tr><td colspan="6" style="text-align:center;padding:2rem;">Nenhuma colheita cadastrada.</td></tr>';
    atualizarCardsAgenda(ordenados);
    return;
  }

  let html = "";

  ordenados.forEach((c) => {
    const culturaNome = c.cultura?.planta?.nome ?? "—";
    const concluida = Boolean(
      c.dataColheitaReal === "indisponível" ? false : true,
    );
    const vencida =
      !concluida &&
      c.dataColheitaPrevista &&
      c.dataColheitaPrevista < hojeISO();

    let statusLabel = "Pendente";
    let statusClass = "pendente";
    if (concluida) {
      statusLabel = "Concluída";
      statusClass = "concluido";
    } else if (vencida) {
      statusLabel = "Atrasada";
      statusClass = "falta";
    } else if (c.dataColheitaPrevista === hojeISO()) {
      statusLabel = "Hoje";
      statusClass = "andamento";
    }

    html += `
      <tr>
        <td>${escapeHtml(c.nome ?? "")}</td>
        <td>${escapeHtml(culturaNome)}</td>
        <td>${formatarData(c.dataColheitaPrevista)}</td>
        <td>${concluida ? formatarData(c.dataColheitaReal) : "—"}</td>
        <td><span class="status ${statusClass}">${statusLabel}</span></td>
        <td class="acoes">
          ${
            concluida
              ? `<button class="btn-editar" type="button" disabled title="Já colhida">
                   <i class="fa-solid fa-check"></i>
                 </button>`
              : `<button type="button" class="btn-registrar-colheita btn-editar" data-id="${c.id}" title="Registrar colheita">
                   <i class="fa-solid fa-wheat-awn"></i>
                 </button>`
          }
          <button type="button" class="btn-editar-crop btn-editar" data-id="${
            c.id
          }" title="Editar plantação">
            <i class="fa-solid fa-pen"></i>
          </button>
        </td>
      </tr>
    `;
  });

  tbody.innerHTML = html;
  atualizarCardsAgenda(ordenados);

  tbody.querySelectorAll(".btn-registrar-colheita").forEach((btn) => {
    btn.addEventListener("click", () => {
      const c = crops.find((x) => String(x.id) === String(btn.dataset.id));
      if (c) abrirModalColheita(c);
    });
  });

  tbody.querySelectorAll(".btn-editar-crop").forEach((btn) => {
    btn.addEventListener("click", () => {
      const c = crops.find((x) => String(x.id) === String(btn.dataset.id));
      if (!c) return;
      mostrarConteudo("tela-cadastro");
      editarCrop(c);
    });
  });
}

function atualizarCardsAgenda(crops) {
  const hoje = hojeISO();
  const comPrevisao = crops.filter((c) => c.dataColheitaPrevista);

  document.getElementById("agenda-total").textContent = comPrevisao.length;
  document.getElementById("agenda-hoje").textContent = comPrevisao.filter(
    (c) => c.dataColheitaPrevista === hoje && !c.dataColheitaReal,
  ).length;
  document.getElementById("agenda-pendentes").textContent = comPrevisao.filter(
    (c) => c.dataColheitaPrevista > hoje && !c.dataColheitaReal,
  ).length;
  document.getElementById("agenda-concluidas").textContent = crops.filter(
    (c) => c.dataColheitaReal,
  ).length;
}

async function registrarColheita(event) {
  event.preventDefault();

  if (!cropColheitaId) return;

  const dataColheitaReal = document.getElementById("dataColheitaReal").value;

  if (!dataColheitaReal) return;

  const btn = event.target.querySelector("button[type='submit']");
  btn.disabled = true;
  btn.textContent = "Salvando...";

  try {
    await apiFetch(`/crops/${cropColheitaId}`, {
      method: "PUT",
      body: JSON.stringify({
        dataColheitaReal,
      }),
    });

    fecharModalColheita();
    await exibirAgenda();
  } catch (error) {
    console.error(error);
    abrirModalErro(
      error.message || "Não foi possível registrar a colheita.",
      "Erro",
    );
  } finally {
    btn.disabled = false;
    btn.textContent = "Confirmar colheita";
  }
}

async function exibirStocks() {
  try {
    estado.stocks = (await apiFetch("/stocks/me")) ?? [];
    renderStocks(estado.stocks);
  } catch (err) {
    console.error(err);
    abrirModalErro("Não foi possível carregar os insumos.", "Erro");
  }
}

function classificarStatusInsumo(insumo) {
  const q = Number(insumo.quantidade ?? 0);
  const limite =
    insumo.limiteMinimo != null ? Number(insumo.limiteMinimo) : null;

  if (q === 0) return { label: "Em falta", classe: "falta" };
  if (limite != null && q <= limite) {
    return { label: "Baixo", classe: "baixo" };
  }
  return { label: "Disponível", classe: "disponivel" };
}

function renderStocks(stocks) {
  const tbody = document.getElementById("tbody-insumos");
  if (!tbody) return;

  // cards
  document.getElementById("total-insumos").textContent = stocks.length;
  document.getElementById("estoque-baixo").textContent = stocks.filter((s) => {
    const q = Number(s.quantidade ?? 0);
    const limite = s.limiteMinimo != null ? Number(s.limiteMinimo) : null;
    return q > 0 && limite != null && q <= limite;
  }).length;
  document.getElementById("em-falta").textContent = stocks.filter(
    (s) => Number(s.quantidade) === 0,
  ).length;

  if (!stocks.length) {
    tbody.innerHTML =
      '<tr><td colspan="7" style="text-align:center;padding:2rem;">Nenhum insumo cadastrado.</td></tr>';
    return;
  }

  let html = "";

  stocks.forEach((s) => {
    const { label, classe } = classificarStatusInsumo(s);
    html += `
      <tr>
        <td>${escapeHtml(s.nome ?? "")}</td>
        <td>${capitalizar(s.categoria ?? "")}</td>
        <td>${s.quantidade ?? 0}</td>
        <td>${s.unidade ?? ""}</td>
        <td>${s.dataValidade ? formatarData(s.dataValidade) : "—"}</td>
        <td><span class="status ${classe}">${label}</span></td>
        <td class="acoes">
          <button type="button" class="btn-editar-insumo btn-editar" data-id="${
            s.id
          }">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button type="button" class="btn-excluir-insumo btn-excluir" data-id="${
            s.id
          }">
            <i class="fa-solid fa-trash"></i>
          </button>
          <button type="button" class="btn-consumir-insumo btn-editar" data-id="${s.id}" title="Registrar consumo">
          <i class="fa-solid fa-minus"></i>
          </button>
          <button type="button" class="btn-zerar-insumo btn-excluir" data-id="${s.id}" title="Zerar estoque">
          <i class="fa-solid fa-0"></i>
          </button>
        </td>
      </tr>
    `;
  });

  tbody.innerHTML = html;

  tbody.querySelectorAll(".btn-editar-insumo").forEach((btn) => {
    btn.addEventListener("click", () => {
      const s = stocks.find((x) => String(x.id) === String(btn.dataset.id));
      if (s) abrirModalInsumo(s);
    });
  });

  tbody.querySelectorAll(".btn-excluir-insumo").forEach((btn) => {
    btn.addEventListener("click", () => excluirInsumo(btn.dataset.id));
  });

  tbody.querySelectorAll(".btn-consumir-insumo").forEach((btn) => {
    btn.addEventListener("click", () => {
      const s = stocks.find((x) => String(x.id) === String(btn.dataset.id));
      if (s) abrirModalConsumo(s);
    });
  });

  tbody.querySelectorAll(".btn-zerar-insumo").forEach((btn) => {
    btn.addEventListener("click", () => zerarInsumo(btn.dataset.id));
  });
}

async function salvarInsumo(event) {
  event.preventDefault();

  const nome = document.getElementById("nomeInsumo").value.trim();
  const categoria = document.getElementById("categoriaInsumo").value;
  const quantidade = Number(document.getElementById("quantidadeInsumo").value);
  const unidade = document.getElementById("unidadeInsumo").value;
  const dataValidade = document.getElementById("validadeInsumo").value;
  const limite = document.getElementById("limiteMinimoInsumo").value;

  if (!nome || !categoria || !unidade) return;

  const body = {
    nome,
    categoria,
    quantidade,
    unidade,
    limiteMinimo: limite ? Number(limite) : null,
  };

  if (dataValidade) body.dataValidade = dataValidade;

  if (dataValidade) {
    body.dataValidade = dataValidade;
  }

  const btn = formNovoInsumo.querySelector("button[type='submit']");
  btn.disabled = true;
  btn.textContent = "Salvando...";

  try {
    const editando = Boolean(insumoEditandoId);
    const path = editando ? `/stocks/${insumoEditandoId}` : "/stocks/";

    await apiFetch(path, {
      method: editando ? "PUT" : "POST",
      body: JSON.stringify(body),
    });

    fecharModalInsumo();
    await exibirStocks();
  } catch (error) {
    console.error(error);
    abrirModalErro(
      error.message || "Não foi possível salvar o insumo.",
      "Erro",
    );
  } finally {
    btn.disabled = false;
    btn.textContent = "Salvar";
  }
}

async function excluirInsumo(id) {
  abrirModalConfirmacao(
    "Tem certeza que deseja excluir este insumo?",
    async () => {
      try {
        await apiFetch(`/stocks/${id}`, { method: "DELETE" });
        await exibirStocks();
      } catch (error) {
        console.error(error);
        abrirModalErro(
          error.message || "Não foi possível excluir o insumo.",
          "Erro ao excluir",
        );
      }
    },
    "Excluir insumo",
  );
}

function configurarBusca(inputId, dadosArray, renderizar, extrator) {
  const input = document.getElementById(inputId);
  if (!input) return;

  input.addEventListener("input", () => {
    const termo = input.value.toLowerCase().trim();
    const dados = dadosArray();

    if (!termo) {
      renderizar(dados);
      return;
    }

    const filtrados = dados.filter((item) =>
      extrator(item).some((v) =>
        String(v ?? "")
          .toLowerCase()
          .includes(termo),
      ),
    );

    renderizar(filtrados);
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  // ---------- usuário + território ----------
  try {
    const usuario = await carregarUsuario();
    estado.territorioId = usuario?.territorios?.[0]?.id ?? null;
  } catch (err) {
    console.error("Não foi possível carregar o usuário:", err);
  }

  // ---------- select de culturas ----------
  await preencherSelectSementes();

  // ---------- form de plantação ----------
  const formPlantacao = document.getElementById("form-registro-plantacao");
  formPlantacao?.addEventListener("submit", salvarCrop);
  formPlantacao
    ?.querySelector(".cancelar")
    ?.addEventListener("click", resetarFormulario);

  document
    .getElementById("nova-plantacao-btn")
    ?.addEventListener("click", () => {
      resetarFormulario();
      formPlantacao.classList.remove("hidden");
    });

  // ---------- form de colheita ----------
  document
    .getElementById("formColheita")
    ?.addEventListener("submit", registrarColheita);

  document
    .getElementById("btnFecharColheita")
    ?.addEventListener("click", fecharModalColheita);
  document
    .getElementById("btnCancelarColheita")
    ?.addEventListener("click", fecharModalColheita);
  document
    .getElementById("modalColheita-overlay")
    ?.addEventListener("click", fecharModalColheita);

  // ---------- form de insumo ----------
  formNovoInsumo?.addEventListener("submit", salvarInsumo);
  document
    .getElementById("btnFecharModal")
    ?.addEventListener("click", fecharModalInsumo);
  document
    .getElementById("btnCancelarModal")
    ?.addEventListener("click", fecharModalInsumo);
  document
    .getElementById("modalNovoInsumo-overlay")
    ?.addEventListener("click", fecharModalInsumo);
  document
    .getElementById("btnNovoInsumo")
    ?.addEventListener("click", () => abrirModalInsumo());
  document
    .getElementById("formConsumo")
    ?.addEventListener("submit", registrarConsumo);
  document
    .getElementById("btnFecharConsumo")
    ?.addEventListener("click", fecharModalConsumo);
  document
    .getElementById("btnCancelarConsumo")
    ?.addEventListener("click", fecharModalConsumo);
  document
    .getElementById("modalConsumo-overlay")
    ?.addEventListener("click", fecharModalConsumo);

  // ---------- navegação ----------
  document
    .getElementById("minhas-plantacoes-btn")
    ?.addEventListener("click", async () => {
      mostrarConteudo("tela-cadastro");
      await exibirCrops();
    });

  document
    .getElementById("insumos-btn")
    ?.addEventListener("click", async () => {
      mostrarConteudo("tela-insumos");
      await exibirStocks();
    });

  document.getElementById("agenda-btn")?.addEventListener("click", async () => {
    mostrarConteudo("tela-agenda");
    await exibirAgenda();
  });

  document
    .getElementById("alertas-btn")
    ?.addEventListener("click", async () => {
      mostrarConteudo("tela-alertas");
      await exibirAlertas();
    });

  // ---------- botões voltar ----------
  document.querySelectorAll(".btn-voltar").forEach((btn) => {
    btn.addEventListener("click", () => {
      resetarFormulario();
      const targetId = btn.dataset.target;
      if (targetId) mostrarConteudo(targetId);
    });
  });

  // ---------- buscas ----------
  configurarBusca(
    "buscar-plantacao",
    () => estado.crops,
    renderCrops,
    (c) => [c.nome, c.responsavel, c.sementes?.planta?.nome, c.variedade],
  );

  configurarBusca(
    "buscar-agenda",
    () => estado.crops,
    renderAgenda,
    (c) => [c.nome, c.sementes?.planta?.nome, c.responsavel],
  );

  configurarBusca(
    "buscar-insumo",
    () => estado.stocks,
    renderStocks,
    (s) => [s.nome, s.categoria],
  );

  // ---------- filtro de categoria em insumos ----------
  document
    .getElementById("filtro-categoria")
    ?.addEventListener("change", (e) => {
      const cat = e.target.value;
      const filtrados = cat
        ? estado.stocks.filter((s) => s.categoria === cat)
        : estado.stocks;
      renderStocks(filtrados);
    });
});

const DIAS_COLHEITA_PROXIMA = 7;
const DIAS_VALIDADE_PROXIMA = 30;

function diasEntre(dataISO, referencia = new Date()) {
  const d = new Date(dataISO);
  const r = new Date(referencia);
  d.setHours(0, 0, 0, 0);
  r.setHours(0, 0, 0, 0);
  return Math.round((d - r) / (1000 * 60 * 60 * 24));
}

async function exibirAlertas() {
  try {
    const [crops, stocks] = await Promise.all([
      apiFetch("/crops/me"),
      apiFetch("/stocks/me"),
    ]);

    estado.crops = crops ?? [];
    estado.stocks = stocks ?? [];

    const alertas = montarAlertas(estado.crops, estado.stocks);
    renderAlertas(alertas);
  } catch (err) {
    console.error(err);
    abrirModalErro("Não foi possível carregar os alertas.", "Erro");
  }
}

function montarAlertas(crops, stocks) {
  const alertas = [];
  const hoje = new Date();

  // ---------- colheitas ----------
  crops.forEach((c) => {
    const culturaNome = c.sementes?.planta?.nome ?? "—";
    const prevista = c.dataColheitaPrevista;

    if (prevista && !c.dataColheitaReal) {
      const dias = diasEntre(prevista, hoje);

      if (dias < 0) {
        alertas.push({
          tipo: "critico",
          icone: "fa-triangle-exclamation",
          tag: "Atrasada",
          titulo: `Colheita atrasada: ${c.nome}`,
          descricao: `${culturaNome} · prevista para ${formatarData(
            prevista,
          )} (${Math.abs(dias)} dia${Math.abs(dias) === 1 ? "" : "s"} atrás)`,
          cropId: c.id,
        });
      } else if (dias <= DIAS_COLHEITA_PROXIMA) {
        alertas.push({
          tipo: "atencao",
          icone: "fa-clock",
          tag: dias === 0 ? "Hoje" : `Em ${dias}d`,
          titulo: `Colheita próxima: ${c.nome}`,
          descricao: `${culturaNome} · prevista para ${formatarData(prevista)}`,
          cropId: c.id,
        });
      }
    }
  });

  // ---------- insumos ----------
  stocks.forEach((s) => {
    const q = Number(s.quantidade ?? 0);
    const unidade = s.unidade ?? "";
    const limite = s.limiteMinimo != null ? Number(s.limiteMinimo) : null;

    if (q === 0) {
      alertas.push({
        tipo: "critico",
        icone: "fa-circle-xmark",
        tag: "Em falta",
        titulo: `Insumo em falta: ${s.nome}`,
        descricao: `Categoria: ${capitalizar(s.categoria ?? "")} · reponha o estoque`,
      });
    } else if (limite != null && q <= limite) {
      alertas.push({
        tipo: "atencao",
        icone: "fa-arrow-down",
        tag: "Baixo",
        titulo: `Estoque baixo: ${s.nome}`,
        descricao: `Restam ${q} ${unidade} · limite de alerta: ${limite}`,
      });
    }

    // validade
    if (s.dataValidade) {
      const dias = diasEntre(s.dataValidade, hoje);

      if (dias < 0) {
        alertas.push({
          tipo: "critico",
          icone: "fa-calendar-xmark",
          tag: "Vencido",
          titulo: `Insumo vencido: ${s.nome}`,
          descricao: `Venceu em ${formatarData(s.dataValidade)} (${Math.abs(
            dias,
          )} dia${Math.abs(dias) === 1 ? "" : "s"} atrás)`,
        });
      } else if (dias <= DIAS_VALIDADE_PROXIMA) {
        alertas.push({
          tipo: "info",
          icone: "fa-calendar-day",
          tag: dias === 0 ? "Hoje" : `${dias}d`,
          titulo: `Validade próxima: ${s.nome}`,
          descricao: `Vence em ${formatarData(s.dataValidade)}`,
        });
      }
    }
  });

  // ordena: críticos primeiro, depois atenção, depois info
  const ordem = { critico: 0, atencao: 1, info: 2 };
  alertas.sort((a, b) => ordem[a.tipo] - ordem[b.tipo]);

  return alertas;
}

function renderAlertas(alertas) {
  const container = document.getElementById("lista-alertas");
  if (!container) return;

  const criticos = alertas.filter((a) => a.tipo === "critico").length;
  const atencao = alertas.filter((a) => a.tipo === "atencao").length;

  document.getElementById("alertas-criticos").textContent = criticos;
  document.getElementById("alertas-atencao").textContent = atencao;
  document.getElementById("alertas-total").textContent = alertas.length;

  if (!alertas.length) {
    container.innerHTML = `
      <div class="alerta-vazio">
        <i class="fa-solid fa-circle-check"></i>
        <h3>Tudo em ordem</h3>
        <p>Nenhum alerta no momento.</p>
      </div>
    `;
    return;
  }

  let html = "";

  alertas.forEach((a) => {
    const btnAcao = a.cropId
      ? `data-crop="${a.cropId}" class="alerta-link"`
      : "";

    html += `
      <div class="alerta ${a.tipo}" ${btnAcao}>
        <div class="alerta-icon">
          <i class="fa-solid ${a.icone}"></i>
        </div>
        <div class="alerta-conteudo">
          <h4>${escapeHtml(a.titulo)}</h4>
          <p>${escapeHtml(a.descricao)}</p>
        </div>
        <span class="alerta-tag">${a.tag}</span>
      </div>
    `;
  });

  container.innerHTML = html;

  // clicar num alerta de colheita leva para a agenda
  container.querySelectorAll(".alerta-link").forEach((el) => {
    el.style.cursor = "pointer";
    el.addEventListener("click", async () => {
      mostrarConteudo("tela-agenda");
      await exibirAgenda();
    });
  });
}
