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


const gestao = document.querySelector(".gestao");

gestao.addEventListener("click", () => {
    window.location.href = "gestao.html";
});