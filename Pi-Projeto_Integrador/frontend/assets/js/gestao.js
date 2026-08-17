// =============================
// TELAS
// =============================

const telaGestao = document.getElementById("tela-gestao");
const telaCadastro = document.getElementById("tela-cadastro");
const telaAgenda = document.getElementById("tela-agenda");
const telaInsumos = document.getElementById("tela-insumos");
const telaEstoque = document.getElementById("tela-estoque");


// =============================
// BOTÕES
// =============================

const btnCadastro = document.getElementById("btnCadastro");
const btnVoltar = document.getElementById("btnVoltar");

const btnAgenda = document.getElementById("btnAgenda");
const btnVoltarAgenda = document.getElementById("btnVoltarAgenda");

const btnInsumos = document.getElementById("btnInsumos");
const btnVoltarInsumos = document.getElementById("btnVoltarInsumos");

const btnEstoque = document.getElementById("btnEstoque");
const btnVoltarEstoque = document.getElementById("btnVoltarEstoque");


// =============================
// CADASTRO
// =============================

btnCadastro.addEventListener("click", () => {

    telaGestao.classList.remove("ativa");
    telaGestao.classList.add("hidden");

    telaCadastro.classList.remove("hidden");
    telaCadastro.classList.add("ativa");

});


// VOLTAR DO CADASTRO

btnVoltar.addEventListener("click", () => {

    telaCadastro.classList.remove("ativa");
    telaCadastro.classList.add("hidden");

    telaGestao.classList.remove("hidden");
    telaGestao.classList.add("ativa");

});


// =============================
// AGENDA
// =============================

btnAgenda.addEventListener("click", () => {

    telaGestao.classList.remove("ativa");
    telaGestao.classList.add("hidden");

    telaAgenda.classList.remove("hidden");
    telaAgenda.classList.add("ativa");

});


// VOLTAR DA AGENDA

btnVoltarAgenda.addEventListener("click", () => {

    telaAgenda.classList.remove("ativa");
    telaAgenda.classList.add("hidden");

    telaGestao.classList.remove("hidden");
    telaGestao.classList.add("ativa");

});


// =============================
// INSUMOS
// =============================

btnInsumos.addEventListener("click", () => {

    telaGestao.classList.remove("ativa");
    telaGestao.classList.add("hidden");

    telaInsumos.classList.remove("hidden");
    telaInsumos.classList.add("ativa");

});


// VOLTAR DOS INSUMOS

btnVoltarInsumos.addEventListener("click", () => {

    telaInsumos.classList.remove("ativa");
    telaInsumos.classList.add("hidden");

    telaGestao.classList.remove("hidden");
    telaGestao.classList.add("ativa");

});


// =============================
// ESTOQUE
// =============================

btnEstoque.addEventListener("click", () => {

    telaGestao.classList.remove("ativa");
    telaGestao.classList.add("hidden");

    telaEstoque.classList.remove("hidden");
    telaEstoque.classList.add("ativa");

});


// VOLTAR DO ESTOQUE

btnVoltarEstoque.addEventListener("click", () => {

    telaEstoque.classList.remove("ativa");
    telaEstoque.classList.add("hidden");

    telaGestao.classList.remove("hidden");
    telaGestao.classList.add("ativa");

});