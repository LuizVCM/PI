const navbar = document.querySelector(".navbar");
const aside = document.querySelector(".aside");
const arrow = document.querySelector(".fa-arrow-right");
// IMPORTANDO MENU
const btnClima = document.querySelector(".clima");
const btnGestao = document.querySelector(".gestao");
const btnSegurancas = document.querySelector(".segurancas");
const btnSementes = document.querySelector(".sementes");
const btnfinancas = document.querySelector(".financas");
const btnSuporte = document.querySelector(".suporte");
const btnRelatorio = document.querySelector(".relatorio");
const btnPerfil = document.querySelector(".perfil");

const texto1 = document.querySelector(".clima p");
const texto2 = document.querySelector(".gestao p");
const texto3 = document.querySelector(".seguranca p");
const text4 = document.querySelector(".sementes p");
const texto5 = document.querySelector(".suporte p");
const texto6 = document.querySelector(".relatorio p");
const texto7 = document.querySelector(".perfil p");
const texto8 = document.querySelector(".financas p");

navbar.addEventListener("click", () => {
  aside.classList.toggle("aside-encolhido");
  arrow.classList.toggle("virado");
  navbar.classList.toggle("outroLado")

  if (
    ((
      texto1 &&
      text4 &&
      texto2 &&
      texto3 &&
      texto5 &&
      texto6 &&
      texto7 &&
      texto8
    ).textContent = "")
  ) {
    texto1.textContent = "Clima";
    texto2.textContent = "Gestao";
    texto3.textContent = "Segurança";
    text4.textContent = "Semente";
    texto5.textContent = "Finanças";
  }
});

// BOTEOES E QUE DIRECIONAN NAS NECESSIDADES

btnClima.addEventListener("click", () => {
  window.location.href = "./Clima.html";
});

btnGestao.addEventListener("click", () => {
  window.location.href = "./Gestao.html";
});

btnSegurancas.addEventListener("click", () => {
  window.location.href = "./Seguranca.html";
});

btnSementes.addEventListener("click", () => {
  window.location.href = "./Sementes.html";
});

btnfinancas.addEventListener("click", () => {
  window.location.href = "./Financas.html";
});

btnSuporte.addEventListener("click", () => {
  window.location.href = "./Suporte.html";
});

btnRelatorio.addEventListener("click", () => {
  window.location.href = "./Relatorio.html";
});

btnPerfil.addEventListener("click", () => {
  window.location.href = "./Perfil.html";
});
