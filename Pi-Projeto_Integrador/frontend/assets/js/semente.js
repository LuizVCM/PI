


// páginas
const content = document.querySelector(".content");
const validade = document.querySelector(".validade");
const lote = document.querySelector(".lote");
const recomendacao = document.querySelector(".recomendacao")

//botao de ação
const entrarValidade = document.querySelector(".funcao1");
const entrarLote = document.querySelector(".funcao2");
const recomendacaoPlantio = document.querySelector(".funcao3");
const agendarPlantio = document.querySelector(".funcao4")


entrarValidade.addEventListener("click", () => {
    content.classList.toggle("toggle1");
    validade.classList.toggle("valMovimento")
});

entrarLote.addEventListener("click", () => {
    content.classList.toggle("toggle1");
    lote.classList.toggle("valMovimento");
});

recomendacaoPlantio.addEventListener("click", () => {
    content.classList.toggle("toggle1");
    recomendacao.classList.toggle("valMovimento");

})

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


const r1 = document.getElementById("retornar1");
const r2 = document.getElementById("retornar2");
const r3 = document.getElementById("retornar3");
const r4 = document.getElementById("retornar4");


// está com erro, mas a estrutura é assim 
r1.addEventListener("click", ()=>{
 content.classList.toggle("toggle1");
    validade.classList.toggle("valMovimento")
});
// r2.addEventListener("click", ()=>{
//  content.classList.toggle("toggle1");
//  lote.classList.togg
//     recomendacao.classList.toggle("valMovimento")
// })




