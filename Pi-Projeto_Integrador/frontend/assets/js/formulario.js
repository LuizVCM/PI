const formulario = document.querySelectorAll(".fundo");
const click = document.getElementById("paragrafoLink");
const click2 = document.getElementById("entra2");
const click3 = document.getElementById("entra3");
const click4 = document.getElementById("entra4")
const entrar = document.getElementById("find");
const home = document.querySelector('.entrar')

const cadastroPag = document.querySelector("cadastro")
const cadastroUserBtn = document.getElementById("cadastrar")
const territorio = document.querySelector(".territorio")
const sensor = document.querySelector(".sensor")
const territorioBtn = document.getElementById("territorio");
const sensorBtn = document.getElementById('sensor')

click.addEventListener("click", () => {
    formulario.forEach(element => {
        element.classList.toggle("cadastro");
    });
})
click2.addEventListener("click", () => {
    formulario.forEach(element => {
        element.classList.toggle("cadastro");
    });
});



cadastroUserBtn.addEventListener("click", () => {
       territorio.classList.toggle("territorio")
       cadastroPag.classList.toggle("cadastro")

})




