const confirmarSemente = document.querySelector(".acessando");

const content = document.querySelector(".content");
const infos = document.querySelector(".info")

const voltar = document.querySelector(".btn-voltar")

const paginaInfos = document.querySelector(".informations")

confirmarSemente.addEventListener("click", () => {
    content.classList.toggle("toggle1")
    paginaInfos.classList.toggle("toggle1")
})

voltar.addEventListener("click", () => {
    content.classList.toggle("toggle1");
    paginaInfos.classList.toggle("toggle1")
})

