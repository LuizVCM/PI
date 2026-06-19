const content = document.querySelector(".content");
const validade = document.querySelector(".validade")
const entrarValidade = document.querySelector(".funcao1");
entrarValidade.addEventListener("click", () => {
    content.classList.toggle("toggle1");
    validade.classList.toggle("valMovimento")

});

// funções de 'nova semente'
const novaSemente = document.querySelector(".novaSemente");

const secao = document.querySelector(".secao");
const cancelar = document.querySelector(".cancelar");

cancelar.addEventListener("click", () => {
    secao.classList.toggle("toggle1")
})
novaSemente.addEventListener("click", () => {
    secao.classList.toggle("toggle1")
})

