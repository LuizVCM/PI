const mainContent = document.getElementById("main-content")

const novoRegistroBtn = document.getElementById("novo-registro-btn");
const novoRegistroContent = document.getElementById("novo-registro-content");
const despesasMesBtn = document.getElementById("despesas-ganhos-mes-btn");
const despesasMesContent = document.getElementById("despesas-ganhos-mes-content")
const despesasAnoBtn = document.getElementById("despesas-ganhos-ano-btn");
const despesasAnoContent = document.getElementById("despesas-ganhos-ano-content");
const graficoLucroBtn = document.getElementById("grafico-lucro-btn");
const graficoLucroContent = document.getElementById("graf-lucro-content");

const botoes = [];

novoRegistroBtn.addEventListener("click", () => {
    mainContent.classList.add("hidden")
    novoRegistroContent.classList.remove("hidden")
});