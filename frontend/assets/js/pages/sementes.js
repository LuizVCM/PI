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

// páginas
const content = document.querySelector(".content");
const validade = document.querySelector(".validade");
const lote = document.querySelector(".lote");
const recomendacao = document.querySelector(".recomendacao");
const agenda = document.querySelector(".agenda");

//botao de ação
const entrarValidade = document.querySelector(".funcao1");
const entrarLote = document.querySelector(".funcao2");
const recomendacaoPlantio = document.querySelector(".funcao3");
const agendarPlantio = document.querySelector(".funcao4");

entrarValidade.addEventListener("click", () => {
  content.classList.toggle("toggle1");
  validade.classList.toggle("valMovimento");
});

entrarLote.addEventListener("click", () => {
  content.classList.toggle("toggle1");
  lote.classList.toggle("valMovimento");
});

recomendacaoPlantio.addEventListener("click", () => {
  content.classList.toggle("toggle1");
  recomendacao.classList.toggle("valMovimento");
});
agendarPlantio.addEventListener("click", () => {
  content.classList.toggle("toggle1");
  agenda.classList.toggle("valMovimento");
});

// funções de 'nova semente' e outros
const novaSemente = document.querySelector(".novaSemente");

const secao = document.querySelector(".secao");
const cancelar = document.querySelector(".cancelar");

cancelar.addEventListener("click", () => {
  secao.classList.toggle("toggle1");
});
novaSemente.addEventListener("click", () => {
  secao.classList.toggle("toggle1");
});

const novoLote = document.querySelector(".lot");
const cadastroLote = document.querySelector(".lo");

novoLote.addEventListener("click", () => {
  cadastroLote.classList.toggle("toggle1");
});

const r1 = document.getElementById("retornar1");
const r2 = document.getElementById("retornar2");
const r3 = document.getElementById("retornar3");
const r4 = document.getElementById("retornar4");

const cancel = document.getElementById("cancel");

// está com erro, mas a estrutura é assim
r1.addEventListener("click", () => {
  content.classList.toggle("toggle1");
  validade.classList.toggle("valMovimento");
});
r2.addEventListener("click", () => {
  content.classList.toggle("toggle1");
  lote.classList.toggle("valMovimento");
});

r3.addEventListener("click", () => {
  content.classList.toggle("toggle1");
  recomendacao.classList.toggle("valMovimento");
});
r4.addEventListener("click", () => {
  content.classList.toggle("toggle1");
  agenda.classList.toggle("valMovimento");
});

// integração

let sementeEditandoId = null;

async function carregarPlantas() {
  try {
    return await apiFetch("/plants/all", {
      method: "GET",
    });
  } catch (error) {
    abrirModalErro("Erro ao carregar plantas.");
    return [];
  }
}

async function preencherSelectPlantas() {
  const plantas = await carregarPlantas();

  const select = document.getElementById("especie-semente");

  select.innerHTML = '<option value="">Selecione...</option>';

  plantas.forEach((planta) => {
    select.insertAdjacentHTML(
      "beforeend",
      `
      <option value="${planta.id}">
        ${planta.nome}
      </option>
      `
    );
  });
}

preencherSelectPlantas();

async function carregarSementes() {
  try {
    return await apiFetch("/seeds/me", {
      method: "GET",
    });
  } catch (error) {
    abrirModalErro("Erro ao carregar sementes.");
    return [];
  }
}

async function exibirSementes() {
  const container = document.querySelector(".verificacao");

  const sementes = await carregarSementes();

  if (!sementes.length) {
    container.innerHTML = "<p>Nenhuma semente cadastrada.</p>";

    return;
  }

  let html = "";

  sementes.forEach((semente) => {
    html += `
      <div
        class="seed-card"
        data-id="${semente.id}"
      >
        <h3>${semente.plant.nome}</h3>

        <p>
          Quantidade:
          ${semente.quantidade}
          ${semente.unidadePeso}
        </p>

        <p>
          Validade:
          ${formatarData(semente.dataValidade)}
        </p>

        <div class="actions">
          <button
            class="btn-editar"
            data-id="${semente.id}"
          >
            Editar
          </button>

          <button
            class="btn-excluir"
            data-id="${semente.id}"
          >
            Excluir
          </button>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

async function salvarSemente(event) {
  event.preventDefault();

  const plantaId = Number(document.getElementById("especie-semente").value);

  const dataCompra = document.getElementById("data-compra").value;

  const dataValidade = document.getElementById("data-validade").value;

  const quantidade = Number(document.getElementById("quantidade").value);

  const unidadePeso = document.getElementById("peso").value;

  const fornecedor = document.getElementById("nome-fornecedor").value;

  const observacoes = document.getElementById("observacaos").value;

  const body = {
    plantaId,
    dataCompra,
    dataValidade,
    quantidade,
    unidadePeso,
    fornecedor,
    observacoes,
  };

  const editando = Boolean(sementeEditandoId);

  const path = editando ? `/seeds/${sementeEditandoId}` : "/seeds";

  await apiFetch(path, {
    method: editando ? "PUT" : "POST",
    body: JSON.stringify(body),
  });

  await exibirSementes();
}

// eventos

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("form-registro-semente").addEventListener("submit", salvarSemente)
});

function editarSemente(semente) {
  sementeEditandoId = semente.id;

  document.getElementById("TS").value = semente.plant.id;

  document.getElementById("dVa").value = semente.dataValidade.substring(0, 10);

  document.getElementById("quantidade").value = semente.quantidade;

  document.getElementById("peso").value = semente.unidadePeso;

  document.getElementById("data").value = semente.dataCompra.substring(0, 10);

  document.getElementById("nome").value = semente.fornecedor ?? "";

  document.getElementById("observacao").value = semente.observacoes ?? "";
}
