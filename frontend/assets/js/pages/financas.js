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

let registroEditandoId = null;

const estado = {
  registros: [],
  filtroData: "mes", 
  dataInicio: null,
  dataFim: null,
};

// evento de modal de erro

document
  .getElementById("modal-erro-close")
  .addEventListener("click", fecharModalErro);

document
  .getElementById("modal-erro-fechar")
  .addEventListener("click", fecharModalErro);

document
  .getElementById("modal-erro-overlay")
  .addEventListener("click", fecharModalErro);

async function carregarRegistros() {
  try {
    return await apiFetch("/finances/me", { method: "GET" });
  } catch (error) {
    console.error(error);
    abrirModalErro("Erro ao carregar registros.");
    return [];
  }
}

async function exibirRegistros() {
  const container = document.getElementById("lista-registros");
  if (!container) return;

  container.classList.add("no-content");
  container.replaceChildren(criarMensagem("Carregando registros..."));

  try {
    estado.registros = await carregarRegistros();
  } catch (err) {
    console.error("Falha ao carregar registros:", err);
    container.replaceChildren(criarMensagem("Erro ao carregar registros."));
    return;
  }

  aplicarFiltro();
}

function aplicarFiltro() {
  const filtrados = filtrarPorData(estado.registros);
  renderRegistros(filtrados);
}

function filtrarPorData(registros) {
  const { filtroData, dataInicio, dataFim } = estado;
  if (filtroData === "tudo") return registros;

  const agora = new Date();
  let inicio;
  let fim;

  switch (filtroData) {
    case "hoje":
      inicio = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate());
      fim = new Date(
        agora.getFullYear(),
        agora.getMonth(),
        agora.getDate() + 1,
      );
      break;

    case "semana": {
      const dia = agora.getDay(); // 0 = domingo
      const diffParaSegunda = (dia + 6) % 7;
      inicio = new Date(
        agora.getFullYear(),
        agora.getMonth(),
        agora.getDate() - diffParaSegunda,
      );
      fim = new Date(inicio);
      fim.setDate(fim.getDate() + 7);
      break;
    }

    case "mes":
      inicio = new Date(agora.getFullYear(), agora.getMonth(), 1);
      fim = new Date(agora.getFullYear(), agora.getMonth() + 1, 1);
      break;

    case "mes-passado":
      inicio = new Date(agora.getFullYear(), agora.getMonth() - 1, 1);
      fim = new Date(agora.getFullYear(), agora.getMonth(), 1);
      break;

    case "ano":
      inicio = new Date(agora.getFullYear(), 0, 1);
      fim = new Date(agora.getFullYear() + 1, 0, 1);
      break;

    case "custom": {
      if (!dataInicio || !dataFim) return registros;
      inicio = new Date(dataInicio + "T00:00:00");
      fim = new Date(dataFim + "T00:00:00");
      fim.setDate(fim.getDate() + 1); // inclui o dia final
      break;
    }

    default:
      return registros;
  }

  return registros.filter((r) => {
    const d = new Date(r.data);
    return d >= inicio && d < fim;
  });
}

function renderRegistros(registros) {
  const container = document.getElementById("lista-registros");
  if (!container) return;

  if (!Array.isArray(registros) || registros.length === 0) {
    container.classList.add("no-content");
    container.replaceChildren(
      criarMensagem("Nenhum registro no período selecionado.", "no-content"),
    );
    return;
  }

  container.classList.remove("no-content");

  const ordenados = [...registros].sort(
    (a, b) => new Date(b.data) - new Date(a.data),
  );

  const fragment = document.createDocumentFragment();
  for (const registro of ordenados) {
    fragment.appendChild(criarCard(registro));
  }
  container.replaceChildren(fragment);

  container.querySelectorAll(".btn-editar").forEach((btn) => {
    btn.addEventListener("click", () => editarRegistro(btn.dataset.id));
  });

  container.querySelectorAll(".btn-excluir").forEach((btn) => {
    btn.addEventListener("click", () => excluirRegistro(btn.dataset.id));
  });
}

function criarMensagem(texto, classe = "") {
  const p = document.createElement("p");
  if (classe) p.className = classe;
  p.textContent = texto;
  return p;
}

function criarCard(registro) {
  const id = String(registro.id ?? "");
  const ehGanho = registro.tipo === "ganho";
  const tipoClasse = ehGanho ? "ganho" : "despesa";
  const tipoTexto = ehGanho ? "Ganho" : "Despesa";

  const valorNum = Number(registro.valor);
  const valorFormatado = Number.isFinite(valorNum)
    ? valorNum.toFixed(2).replace(".", ",")
    : "0,00";

  const card = document.createElement("div");
  card.className = `finance-card ${tipoClasse}`;
  card.dataset.id = id;

  // tooltip
  const tooltip = document.createElement("div");
  tooltip.className = "tooltip";
  const tooltipText = document.createElement("span");
  tooltipText.className = "tooltiptext";
  tooltipText.textContent = "Clique para ver os detalhes e observações";
  tooltip.appendChild(tooltipText);

  // topo
  const top = document.createElement("div");
  top.className = "finance-card__top";

  const tag = document.createElement("span");
  tag.className = `finance-tag ${tipoClasse}`;
  tag.textContent = tipoTexto;

  const data = document.createElement("span");
  data.className = "finance-date";
  data.textContent = formatarData(registro.data);

  top.append(tag, data);

  // valor
  const valor = document.createElement("div");
  valor.className = "finance-card__value";
  valor.textContent = `R$ ${valorFormatado}`;

  // ações
  const actions = document.createElement("div");
  actions.className = "finance-card__actions";

  const btnEditar = document.createElement("button");
  btnEditar.className = "btn-editar";
  btnEditar.dataset.id = id;
  btnEditar.type = "button";
  btnEditar.setAttribute("aria-label", "Editar registro");
  btnEditar.innerHTML = '<i class="fa-solid fa-pen"></i>';

  const btnExcluir = document.createElement("button");
  btnExcluir.className = "btn-excluir";
  btnExcluir.dataset.id = id;
  btnExcluir.type = "button";
  btnExcluir.setAttribute("aria-label", "Excluir registro");
  btnExcluir.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

  actions.append(btnEditar, btnExcluir);

  card.append(tooltip, top, valor, actions);
  return card;
}

// editar

function editarRegistro(id) {
  const registro = estado.registros.find(
    (item) => String(item.id) === String(id),
  );

  if (!registro) {
    abrirModalErro("Registro não encontrado.");
    return;
  }

  registroEditandoId = registro.id;

  document.getElementById("tipo-registro-financas").value = registro.tipo;
  document.getElementById("valor-registro-financas").value = registro.valor;
  document.getElementById("data-financa").value = registro.data.substring(0, 10);
  document.getElementById("observacao-registro-financas").value =
    registro.observacoes || "";
  document.getElementById("detalhe-registro-financas").value =
    registro.detalhes || "";

  document.getElementById("titulo-form-financa").textContent =
    "Editar registro";
  document.querySelector(".btn-salvar").innerHTML = `Salvar alterações`;
  document.getElementById("cancelar-edicao-btn").classList.remove("hidden");

  mostrarConteudo("novo-registro-content");
}

// salvar

async function salvarNovoRegistro(event) {
  event.preventDefault();

  const form = document.getElementById("form-novo-registro");

  removeMessage(form);

  const tipo = document.getElementById("tipo-registro-financas").value;

  const valor = Number(
    document.getElementById("valor-registro-financas").value,
  );

  const data = document.getElementById("data-financa").value;

  const observacoes = document
    .getElementById("observacao-registro-financas")
    .value.trim();

  const detalhes = document
    .getElementById("detalhe-registro-financas")
    .value.trim();

  if (!tipo || !valor || Number.isNaN(valor) || valor <= 0 || !data) {
    showErrorMessage("Preencha o tipo, valor e data corretamente.", form);

    return;
  }

  const body = {
    tipo,
    valor,
    observacoes: observacoes || null,
    detalhes: detalhes || null,
    data,
  };

  const botao = form.querySelector(".btn-salvar");
  const editando = Boolean(registroEditandoId);

  botao.disabled = true;
  botao.textContent = "Salvando...";

  try {
    const path = editando ? `/finances/${registroEditandoId}` : `/finances`;

    await apiFetch(path, {
      method: editando ? "PUT" : "POST",
      body: JSON.stringify(body),
    });

    form.reset();

    resetarFormulario();

    mostrarConteudo("meus-registros-content");

    await exibirRegistros();
  } catch (error) {
    console.error(error);

    if (error.message) {
      showErrorMessage(error.message, form);
    }

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

    botao.innerHTML = editando ? `Salvar alterações` : `Salvar registro`;
  }
}

// cancela edição

function resetarFormulario() {
  registroEditandoId = null;

  document.getElementById("form-novo-registro").reset();

  document.getElementById("titulo-form-financa").textContent = "Novo registro";

  document.querySelector(".btn-salvar").innerHTML = `
    Salvar registro
  `;

  document.getElementById("cancelar-edicao-btn").classList.add("hidden");

  removeMessage(document.getElementById("form-novo-registro"));
}

// deletar

async function excluirRegistro(id) {
  abrirModalConfirmacao(
    "Tem certeza que deseja excluir este registro?",
    async () => {
      try {
        await apiFetch(`/finances/${id}`, {
          method: "DELETE",
        });

        await exibirRegistros();
      } catch (error) {
        console.error(error);

        abrirModalErro(
          error.message || "Não foi possível excluir o registro.",
          "Erro ao excluir",
        );
      }
    },
    "Excluir registro",
  );
}

// eventos

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("novo-registro-btn").addEventListener("click", () => {
    resetarFormulario();
    mostrarConteudo("novo-registro-content");
  });

  document
    .getElementById("meus-registros-btn")
    .addEventListener("click", () => {
      mostrarConteudo("meus-registros-content");
      exibirRegistros();
    });

  document
    .getElementById("despesas-ganhos-mes-btn")
    .addEventListener("click", async () => {
      mostrarConteudo("despesas-ganhos-mes-content");

      await criarGraficoMes();
    });

  document
    .getElementById("despesas-ganhos-ano-btn")
    .addEventListener("click", async () => {
      mostrarConteudo("despesas-ganhos-ano-content");

      await criarGraficoAno();
    });

  document
    .getElementById("form-novo-registro")
    .addEventListener("submit", salvarNovoRegistro);

  document
    .getElementById("cancelar-edicao-btn")
    .addEventListener("click", () => {
      resetarFormulario();
    });

  document.querySelectorAll(".btn-voltar").forEach((btn) => {
    btn.addEventListener("click", () => {
      resetarFormulario();

      const targetId = btn.dataset.target;

      if (targetId) {
        mostrarConteudo(targetId);
      }
    });
  });
  const selectFiltro = document.getElementById("filtro-data-financas");
  const blocoCustom = document.getElementById("filtro-custom");
  const inputInicio = document.getElementById("filtro-data-inicio");
  const inputFim = document.getElementById("filtro-data-fim");

  selectFiltro?.addEventListener("change", () => {
    estado.filtroData = selectFiltro.value;

    if (estado.filtroData === "custom") {
      blocoCustom?.classList.remove("hidden");
    } else {
      blocoCustom?.classList.add("hidden");
      estado.dataInicio = null;
      estado.dataFim = null;
      if (inputInicio) inputInicio.value = "";
      if (inputFim) inputFim.value = "";
    }

    aplicarFiltro();
  });

  inputInicio?.addEventListener("change", () => {
    estado.dataInicio = inputInicio.value;
    aplicarFiltro();
  });

  inputFim?.addEventListener("change", () => {
    estado.dataFim = inputFim.value;
    aplicarFiltro();
  });
});

// modal de visualizar

async function abrirModalVisualizacao(id) {
  try {
    const registros = await carregarRegistros();
    const registro = registros.find((r) => String(r.id) === String(id));
    if (!registro) {
      alert("Registro não encontrado.");
      return;
    }

    // preencher os campos
    document.getElementById("modal-visualizar-tipo").textContent =
      registro.tipo === "ganho" ? "Ganho" : "Despesa";
    document.getElementById("modal-visualizar-valor").textContent =
      `R$ ${Number(registro.valor).toFixed(2).replace(".", ",")}`;
    document.getElementById("modal-visualizar-data").textContent = formatarData(
      registro.data,
    );
    document.getElementById("modal-visualizar-obs").textContent =
      capitalizar(escapeHtml(registro.observacoes)) || "—";
    document.getElementById("modal-visualizar-detalhes").textContent =
      capitalizar(escapeHtml(registro.detalhes)) || "—";

    // mostrar modal
    document.getElementById("modal-visualizar").classList.remove("hidden");
    document.body.style.overflow = "hidden";
  } catch (error) {
    console.error(error);
    alert("Erro ao carregar detalhes do registro.");
  }
}

function fecharModalVisualizacao() {
  document.getElementById("modal-visualizar").classList.add("hidden");
  document.body.style.overflow = "";
}

// abrir modal ao clicar no card (exceto se clicar nos botões de ação)
document.getElementById("lista-registros").addEventListener("click", (e) => {
  const card = e.target.closest(".finance-card");
  if (!card) return;
  if (e.target.closest(".btn-editar") || e.target.closest(".btn-excluir"))
    return;
  const id = card.dataset.id;
  abrirModalVisualizacao(id);
});

// fechar modal
document
  .getElementById("modal-visualizar-close")
  .addEventListener("click", fecharModalVisualizacao);
document
  .getElementById("modal-visualizar-overlay")
  .addEventListener("click", fecharModalVisualizacao);
document
  .getElementById("modal-visualizar-fechar")
  .addEventListener("click", fecharModalVisualizacao);

document
  .getElementById("modal-confirmacao-close")
  .addEventListener("click", fecharModalConfirmacao);

document
  .getElementById("modal-confirmacao-cancelar")
  .addEventListener("click", fecharModalConfirmacao);

document
  .getElementById("modal-confirmacao-overlay")
  .addEventListener("click", fecharModalConfirmacao);

// fechar com tecla esc (todos modais)
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    fecharModalVisualizacao();
    fecharModalErro();
    fecharModalConfirmacao();
  }
});

document
  .getElementById("modal-confirmacao-confirmar")
  .addEventListener("click", async () => {
    if (acaoConfirmada) {
      await acaoConfirmada();
    }

    fecharModalConfirmacao();
  });

// graficos

let graficoMes = null;

async function criarGraficoMes() {
  const registros = await carregarRegistros();

  const canvas = document.getElementById("graf-despesas-ganhos-mes");

  if (!canvas) return;

  if (graficoMes) {
    graficoMes.destroy();
  }

  const hoje = new Date();

  const mesAtual = hoje.getMonth();
  const anoAtual = hoje.getFullYear();

  let ganhos = 0;
  let despesas = 0;

  registros.forEach((registro) => {
    const data = new Date(registro.data);

    if (data.getMonth() === mesAtual && data.getFullYear() === anoAtual) {
      const valor = Number(registro.valor);

      if (registro.tipo === "ganho") {
        ganhos += valor;
      }

      if (registro.tipo === "despesa") {
        despesas += valor;
      }
    }
  });

  const lucro = ganhos - despesas;

  graficoMes = new Chart(canvas, {
    type: "bar",

    data: {
      labels: ["Ganhos", "Despesas", "Lucro"],

      datasets: [
        {
          label: "Valor",
          data: [ganhos, despesas, lucro],
          backgroundColor: [
            "rgba(76, 175, 80, 0.6)", // ganho
            "rgba(244, 67, 54, 0.6)", // despesa
            "rgba(33, 150, 243, 0.6)", // lucro
          ],

          borderColor: ["#388E3C", "#D32F2F", "#1976D2"],
          borderWidth: 1,
        },
      ],
    },

    options: {
      responsive: true,

      plugins: {
        legend: {
          display: false,
        },

        tooltip: {
          callbacks: {
            label: function (context) {
              return `R$ ${context.raw.toFixed(2).replace(".", ",")}`;
            },
          },
        },
      },

      scales: {
        y: {
          beginAtZero: true,

          ticks: {
            callback: function (value) {
              return `R$ ${value}`;
            },
          },
        },
      },
    },
  });
}

let graficoAno = null;

async function criarGraficoAno() {
  const registros = await carregarRegistros();

  const canvas = document.getElementById("graf-despesas-ganhos-ano");

  if (!canvas) return;

  if (graficoAno) {
    graficoAno.destroy();
  }

  const anoAtual = new Date().getFullYear();

  const ganhosPorMes = Array(12).fill(0);
  const despesasPorMes = Array(12).fill(0);

  registros.forEach((registro) => {
    const data = new Date(registro.data);

    if (data.getFullYear() !== anoAtual) {
      return;
    }

    const mes = data.getMonth();
    const valor = Number(registro.valor);

    if (registro.tipo === "ganho") {
      ganhosPorMes[mes] += valor;
    }

    if (registro.tipo === "despesa") {
      despesasPorMes[mes] += valor;
    }
  });

  const lucroPorMes = ganhosPorMes.map(
    (ganho, mes) => ganho - despesasPorMes[mes],
  );

  const meses = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];

  graficoAno = new Chart(canvas, {
    type: "line",

    data: {
      labels: meses,

      datasets: [
        {
          label: "Lucro",
          data: lucroPorMes,

          backgroundColor: "#61b792",
          borderColor: "#61aa8a",
        },
      ],
    },

    options: {
      responsive: true,

      plugins: {
        tooltip: {
          callbacks: {
            label: function (context) {
              return `Lucro: R$ ${context.raw.toFixed(2).replace(".", ",")}`;
            },
          },
        },
      },

      scales: {
        y: {
          ticks: {
            callback: function (value) {
              return `R$ ${value}`;
            },
          },
        },
      },
    },
  });
}
