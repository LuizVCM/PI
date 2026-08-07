

// Pegando as telas pelo ID do HTML
// O JavaScript precisa encontrar essas partes para conseguir trocar entre elas

const telaHome = document.getElementById("tela-home");

const telaCadastro = document.getElementById("tela-cadastro");

const telaAgenda = document.getElementById("tela-agenda");

const telaInsumos = document.getElementById("tela-insumos");

const telaEstoque = document.getElementById("tela-estoque");


// ================= BOTÕES =================

// Pegando os botões pelo ID para conseguir colocar ações neles

const btnCadastro = document.getElementById("btnCadastro");

const btnVoltar = document.getElementById("btnVoltar");

const btnAgenda = document.getElementById("btnAgenda");

const btnVoltarAgenda = document.getElementById("btnVoltarAgenda");

const btnInsumos = document.getElementById("btnInsumos");

const btnVoltarInsumos = document.getElementById("btnVoltarInsumos");

const btnEstoque = document.getElementById("btnEstoque");

const btnVoltarEstoque = document.getElementById("btnVoltarEstoque");

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



// Abrir tela de insumos
btnInsumos.addEventListener("click", () => {
    telaHome.classList.remove("ativa");
    telaHome.classList.add("hidden");

    telaInsumos.classList.remove("hidden");
    telaInsumos.classList.add("ativa");
});

// Voltar para a tela inicial
btnVoltarInsumos.addEventListener("click", () => {
    telaInsumos.classList.remove("ativa");
    telaInsumos.classList.add("hidden");

    telaHome.classList.remove("hidden");
    telaHome.classList.add("ativa");
});

// Abrir tela
btnEstoque.addEventListener("click", () => {

    telaHome.classList.remove("ativa");
    telaHome.classList.add("hidden");

    telaEstoque.classList.remove("hidden");
    telaEstoque.classList.add("ativa");

});

// Voltar
btnVoltarEstoque.addEventListener("click", () => {

    telaEstoque.classList.remove("ativa");
    telaEstoque.classList.add("hidden");

    telaHome.classList.remove("hidden");
    telaHome.classList.add("ativa");

});