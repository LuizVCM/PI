// const formulario = document.querySelectorAll(".fundo");
// const click = document.getElementById("paragrafoLink");
// const click2 = document.getElementById("entra2");
// const click3 = document.getElementById("entra3");
// const click4 = document.getElementById("entra4")
// const entrar = document.getElementById("find");
// const home = document.querySelector('.entrar')

// const cadastroPag = document.querySelector("cadastro")
// const cadastroUserBtn = document.getElementById("cadastrar")
// const territorio = document.querySelector(".territorio")
// const sensor = document.querySelector(".sensor")
// const territorioBtn = document.getElementById("territorio");
// const sensorBtn = document.getElementById('sensor')

// click.addEventListener("click", () => {
//     formulario.forEach(element => {
//         element.classList.toggle("cadastro");
//     });
// })
// click2.addEventListener("click", () => {
//     formulario.forEach(element => {
//         element.classList.toggle("cadastro");
//     });
// });



// cadastroUserBtn.addEventListener("click", () => {
//        territorio.classList.toggle("territorio")
//        cadastroPag.classList.toggle("cadastro")

// })

const irCadastrar = document.getElementById('paragrafoLink')
const cadastrarUser = document.querySelector(".cadastro");
const loginTela = document.querySelector(".login")

const voltarLogin = document.getElementById("voltarLogin1")

irCadastrar.addEventListener("click", () => {
    cadastrarUser.classList.toggle("sumir")
    loginTela.classList.toggle("sumir")
})

voltarLogin.addEventListener("click", () => {
    cadastrarUser.classList.toggle("sumir")
    loginTela.classList.toggle("sumir")
})

// fazer a função para ir para cadastro de territorio (após implementar sistema de verificação de dados)

const btnCadastrarUser = document.getElementById("cadastrarUsuario")
const territorioPag = document.querySelector(".territorio")

btnCadastrarUser.addEventListener("click", () => {
    territorioPag.classList.toggle("sumir")
    cadastrarUser.classList.toggle("sumir")
})

// fzr a função para ir de territorio para sensor

const btnCadastrarTerrotorio = document.getElementById("cadastrarTerritorio")

const sensorPag = document.querySelector(".sensor")

btnCadastrarTerrotorio.addEventListener("click", () => {
    sensorPag.classList.toggle("sumir")
    territorioPag.classList.toggle("sumir")
})

// fzr a função para ir na pergunta final de sensor
const cadastrarSensor = document.getElementById("btnCadastrarSensor")

const pergunta = document.querySelector(".pergunta")

cadastrarSensor.addEventListener("click", () => {
    sensorPag.classList.toggle("sumir")
    pergunta.classList.toggle("sumir")
})

// análise dos botões finais

const concluir = document.querySelector(".entrarLogin");
const cadastrarMaisSensores = document.querySelector(".cadastrarMaisSensores")

cadastrarMaisSensores.addEventListener("click", () => {
    sensorPag.classList.toggle("sumir");
    pergunta.classList.toggle("sumir")
})

concluir.addEventListener("click", () => {
    pergunta.classList.toggle("sumir");
    loginTela.classList.toggle("sumir")
})






