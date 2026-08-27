// =========================
// TELAS
// =========================

const telaHome = document.querySelector("#tela-inicio");
const telaCadastro = document.querySelector("#tela-cadastro");
const telaAgenda = document.querySelector("#tela-agenda");
const telaInsumos = document.querySelector("#tela-insumos");
const telaEstoque = document.querySelector("#tela-estoque");


// =========================
// BOTÕES DE ACESSO
// =========================

const btnCadastro = document.querySelector("#btnCadastro");
const btnAgenda = document.querySelector("#btnAgenda");
const btnInsumos = document.querySelector("#btnInsumos");
const btnEstoque = document.querySelector("#btnEstoque");


// =========================
// BOTÕES VOLTAR
// =========================

const btnVoltar = document.querySelector("#btnVoltar");
const btnVoltarAgenda = document.querySelector("#btnVoltarAgenda");
const btnVoltarInsumos = document.querySelector("#btnVoltarInsumos");
const btnVoltarEstoque = document.querySelector("#btnVoltarEstoque");


// =========================
// TODAS AS TELAS
// =========================

const telas = [
    telaHome,
    telaCadastro,
    telaAgenda,
    telaInsumos,
    telaEstoque
];


// =========================
// TROCAR DE TELA
// =========================

function mostrarTela(telaSelecionada) {

    telas.forEach((tela) => {

        tela.classList.remove("ativa");
        tela.classList.add("hidden");

    });

    telaSelecionada.classList.remove("hidden");
    telaSelecionada.classList.add("ativa");
}


// =========================
// ABRIR CADASTRO
// =========================

btnCadastro.addEventListener("click", () => {

    mostrarTela(telaCadastro);

});


// =========================
// ABRIR AGENDA
// =========================

btnAgenda.addEventListener("click", () => {

    mostrarTela(telaAgenda);

});


// =========================
// ABRIR INSUMOS
// =========================

btnInsumos.addEventListener("click", () => {

    mostrarTela(telaInsumos);

});


// =========================
// ABRIR ESTOQUE
// =========================

btnEstoque.addEventListener("click", () => {

    mostrarTela(telaEstoque);

});


// =========================
// VOLTAR PARA INÍCIO
// =========================

function voltarInicio() {
    mostrarTela(telaHome);
}

// =========================
// BOTÕES VOLTAR
// =========================

btnVoltar.addEventListener("click", voltarInicio);

btnVoltarAgenda.addEventListener("click", voltarInicio);

btnVoltarInsumos.addEventListener("click", voltarInicio);

btnVoltarEstoque.addEventListener("click", voltarInicio);


// =========================
// LIMPAR CADASTRO
// =========================

const btnLimpar = document.querySelector(".btn-limpar");

if (btnLimpar) {

    btnLimpar.addEventListener("click", () => {

        const campos = telaCadastro.querySelectorAll(
            "input, select, textarea"
        );

        campos.forEach((campo) => {

            if (campo.tagName === "SELECT") {

                campo.selectedIndex = 0;

            } else {

                campo.value = "";

            }

        });

    });

}