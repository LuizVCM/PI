const formulario = document.querySelectorAll(".fundo");
const click = document.getElementById("paragrafoLink");
const click2 = document.getElementById("entra2")

click.addEventListener("click", () => {
    formulario.forEach(element => {
        element.classList.toggle("cadastro");
    });
})
click2.addEventListener("click", () => {
    formulario.forEach(element => {
        element.classList.toggle("cadastro");
    });
})
