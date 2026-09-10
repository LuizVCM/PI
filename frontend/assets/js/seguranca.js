const confirmarSemente = document.querySelector(".acessando")
const content = document.querySelector(".content")



const paginaInfos = document.querySelector(".informations")



confirmarSemente.addEventListener("click", () => {
    content.classList.toggle("toggle1")
    paginaInfos.classList.toggle("valMovimento")
})