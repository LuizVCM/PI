const confirmarSemente = document.querySelector(".acessando")
const content = document.querySelector(".content")
const paginaInfos = document.querySelector(".informations")
confirmarSemente.addEventListener("click", () => {
    content.classList.toggle("toggle1")
    paginaInfos.classList.toggle("valMovimento")
})

const solo = {
  nitrogenio: { valor: 38, unidade: "mg/kg", status: "baixo" },
  fosforo:    { valor: 61, unidade: "mg/kg", status: "ideal" },
  potassio:   { valor: 88, unidade: "mg/kg", status: "alto"  }
};
 
function renderizarNPK(solo) {
  const container = document.getElementById("gradeNpk");
  container.innerHTML = "";
 
  // Cada nutriente vira uma "coluna de solo": cor fixa + altura variável.
  const nutrientes = [
    { nome: "Nitrogênio", cor: "var(--amarelo-600)", ...solo.nitrogenio },
    { nome: "Fósforo",    cor: "var(--verde-700)",   ...solo.fosforo    },
    { nome: "Potássio",   cor: "var(--marrom-600)",  ...solo.potassio   }
  ];
 
  nutrientes.forEach(({ nome, cor, valor, unidade, status }) => {
    // assume escala de referência 0–100 mg/kg pra desenhar a altura do tubo
    const alturaPercentual = Math.min(valor, 100);
 
    const coluna = document.createElement("div");
    coluna.className = "coluna-solo";
    coluna.innerHTML = `
      <div class="tubo-solo">
        <div class="tubo-solo-fill" style="height:${alturaPercentual}%; background:${cor};"></div>
      </div>
      <span class="nutriente-nome">${nome}</span>
      <span class="nutriente-valor">${valor} ${unidade}</span>
      <span class="nutriente-status status-${status}">${status}</span>
    `;
    container.appendChild(coluna);
  });
}
 
renderizarNPK(solo);


// medida NPK
 