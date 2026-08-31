const navbar = document.querySelector(".navbar");
const aside = document.querySelector(".aside");
const arrow = document.querySelector(".fa-arrow-right")
// IMPORTANDO MENU
const btnClima = document.querySelector(".clima")
const btnGestao = document.querySelector(".gestao")
const btnSegurancas = document.querySelector(".segurancas")
const btnSementes = document.querySelector(".sementes")
const btnfinancas = document.querySelector(".financas")
const btnSuporte = document.querySelector(".suporte")
const btnRelatorio = document.querySelector(".relatorio")
const btnPerfil = document.querySelector(".perfil")

navbar.addEventListener("click", () => {
    aside.classList.toggle("aside-encolhido");
    arrow.classList.toggle("virado")
})

// BOTEOES E QUE DIRECIONAN NAS NECESSIDADES

btnClima.addEventListener("click", () => {
    window.location.href = "./Clima.html"
})

btnGestao.addEventListener("click", () => {
    window.location.href = "./Gestao.html"
})

btnSegurancas.addEventListener("click", () => {
    window.location.href = "./Seguranca.html"
})

btnSementes.addEventListener("click", () => {
    window.location.href = "./Sementes.html"
})

btnfinancas.addEventListener("click", () => {
    window.location.href = "./Financas.html"
})

btnSuporte.addEventListener("click", () => {
    window.location.href = "./Suporte.html"
})

btnRelatorio.addEventListener("click", () => {
    window.location.href = "./Relatorio.html"
})

btnPerfil.addEventListener("click", () => {
    window.location.href = "./Perfil.html"
})

// ================= TELAS =================


// Pegando as telas pelo ID do HTML
// O JavaScript precisa encontrar essas partes para conseguir trocar entre elas

const telaHome = document.getElementById("tela-home");

const telaCadastro = document.getElementById("tela-cadastro");

const telaAgenda = document.getElementById("tela-agenda");





// ================= BOTÕES =================


// Pegando os botões pelo ID para conseguir colocar ações neles

const btnCadastro = document.getElementById("btnCadastro");

const btnVoltar = document.getElementById("btnVoltar");

const btnAgenda = document.getElementById("btnAgenda");

const btnVoltarAgenda = document.getElementById("btnVoltarAgenda");

// Quando clicar no botão cadastro
btnCadastro.addEventListener("click", () => {
    // Esconde a tela inicial
    telaHome.classList.remove("ativa")
    telaHome.classList.add("hidden");
    // Mostra a tela de cadastro
    telaCadastro.classList.remove("hidden");
    telaCadastro.classList.add("ativa");
});

// Quando clicar no botão voltar do cadastro
btnVoltar.addEventListener("click", () => {
    // Esconde a tela de cadastro
    telaCadastro.classList.remove("ativa");
    telaCadastro.classList.add("hidden");
    // Mostra novamente a tela inicial
    telaHome.classList.remove("hidden");
    telaHome.classList.add("ativa");
});

// Quando clicar no botão agenda
btnAgenda.addEventListener("click", () => {
    // Esconde a tela inicial
    telaHome.classList.remove("ativa");
    telaHome.classList.add("hidden");
    // Mostra a tela de agenda
    telaAgenda.classList.remove("hidden");
    telaAgenda.classList.add("ativa");
});

// Quando clicar no botão voltar da agenda
btnVoltarAgenda.addEventListener("click", () => {
    // Esconde a tela agenda
    telaAgenda.classList.remove("ativa");
    telaAgenda.classList.add("hidden");
    // Mostra a tela inicial novamente
    telaHome.classList.remove("hidden");
    telaHome.classList.add("ativa");
});