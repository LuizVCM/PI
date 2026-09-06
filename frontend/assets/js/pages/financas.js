// Mostra um conteúdo e esconde os demais
function mostrarConteudo(id) {
  document.querySelectorAll('.content').forEach(el => {
    el.classList.add('hidden');
  });
  document.getElementById(id).classList.remove('hidden');
}

// Carrega registros do localStorage
function carregarRegistros() {
  const dados = localStorage.getItem('financas');
  return dados ? JSON.parse(dados) : [];
}

// Salva registros no localStorage
function salvarRegistros(registros) {
  localStorage.setItem('financas', JSON.stringify(registros));
}

// Formata data para exibição
function formatarData(dataISO) {
  const d = new Date(dataISO);
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

// ===== EXIBIR REGISTROS =====
function exibirRegistros() {
  const container = document.getElementById('lista-registros');
  const registros = carregarRegistros();

  if (registros.length === 0) {
    container.innerHTML = '<p class="no-content">Nenhum registro encontrado.</p>';
    return;
  }

  // Ordena do mais recente para o mais antigo
  registros.sort((a, b) => new Date(b.data) - new Date(a.data));

  let html = `
    <table class="tabela-registros">
      <thead>
        <tr>
          <th>Data</th>
          <th>Tipo</th>
          <th>Valor (R$)</th>
          <th>Observação</th>
          <th>Detalhe</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
  `;

  registros.forEach((registro, index) => {
    const tipoClasse = registro.tipo === 'ganho' ? 'tipo-ganho' : 'tipo-despesa';
    const valorFormatado = registro.valor.toFixed(2).replace('.', ',');
    html += `
      <tr>
        <td>${formatarData(registro.data)}</td>
        <td class="${tipoClasse}">${registro.tipo === 'ganho' ? '💰 Ganho' : '💸 Despesa'}</td>
        <td>R$ ${valorFormatado}</td>
        <td>${registro.observacao || '-'}</td>
        <td>${registro.detalhe || '-'}</td>
        <td>
          <button class="btn-excluir" data-index="${index}">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </td>
      </tr>
    `;
  });

  html += `</tbody></table>`;
  container.innerHTML = html;

  // Adiciona evento de exclusão para cada botão
  document.querySelectorAll('.btn-excluir').forEach(btn => {
    btn.addEventListener('click', function() {
      const index = parseInt(this.dataset.index);
      excluirRegistro(index);
    });
  });
}

// ===== EXCLUIR REGISTRO =====
function excluirRegistro(index) {
  const registros = carregarRegistros();
  if (index >= 0 && index < registros.length) {
    if (confirm('Tem certeza que deseja excluir este registro?')) {
      registros.splice(index, 1);
      salvarRegistros(registros);
      exibirRegistros(); // recarrega a lista
    }
  }
}

// ===== SALVAR NOVO REGISTRO =====
function salvarNovoRegistro(e) {
  e.preventDefault();

  const tipo = document.getElementById('tipo-registro-financas').value;
  const valor = parseFloat(document.getElementById('valor-registro-financas').value);
  const observacao = document.getElementById('observacao-registro-financas').value.trim();
  const detalhe = document.getElementById('detalhe-registro-financas').value.trim();

  if (!tipo || isNaN(valor) || valor <= 0) {
    alert('Preencha o tipo e o valor corretamente (valor deve ser maior que zero).');
    return;
  }

  const novoRegistro = {
    tipo: tipo,
    valor: valor,
    observacao: observacao,
    detalhe: detalhe,
    data: new Date().toISOString()
  };

  const registros = carregarRegistros();
  registros.push(novoRegistro);
  salvarRegistros(registros);

  // Limpa o formulário e dá feedback
  document.getElementById('form-novo-registro').reset();
  alert('Registro salvo com sucesso!');
}

// ===== CONFIGURAR EVENTOS =====
document.addEventListener('DOMContentLoaded', function() {
  // Botões principais
  document.getElementById('novo-registro-btn').addEventListener('click', () => {
    mostrarConteudo('novo-registro-content');
  });

  document.getElementById('despesas-ganhos-mes-btn').addEventListener('click', () => {
    mostrarConteudo('despesas-ganhos-mes-content');
  });

  document.getElementById('despesas-ganhos-ano-btn').addEventListener('click', () => {
    mostrarConteudo('despesas-ganhos-ano-content');
  });

  // Botão "Meus registros"
  document.getElementById('meus-registros-btn').addEventListener('click', () => {
    mostrarConteudo('meus-registros-content');
    exibirRegistros(); // carrega os registros ao abrir
  });

  // Botões Voltar
  document.querySelectorAll('.btn-voltar').forEach(btn => {
    btn.addEventListener('click', function() {
      const targetId = this.dataset.target;
      if (targetId) mostrarConteudo(targetId);
    });
  });

  // Formulário de novo registro
  document.getElementById('form-novo-registro').addEventListener('submit', salvarNovoRegistro);

  // (Opcional) Carregar registros ao iniciar se quiser pré-carregar
  // exibirRegistros(); // Se quiser que já apareça na tela inicial, mas melhor deixar para quando clicar no botão
});