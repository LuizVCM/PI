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

  const recolhido = aside.classList.contains("aside-encolhido");

  texto1.textContent = recolhido ? "" : "Clima";
  texto2.textContent = recolhido ? "" : "Gestão";
  texto3.textContent = recolhido ? "" : "Segurança";
  text4.textContent = recolhido ? "" : "Sementes";
  texto5.textContent = recolhido ? "" : "Suporte";
  texto6.textContent = recolhido ? "" : "Relatório";
  texto7.textContent = recolhido ? "" : "Perfil";
  texto8.textContent = recolhido ? "" : "Finanças";
});

// BOTEOES E QUE DIRECIONAN NAS NECESSIDADES

const base = window.location.pathname.includes("/pages/") ? "" : "pages/";

btnClima.addEventListener("click", () => {
  window.location.href = `${base}clima.html`;
});

btnGestao.addEventListener("click", () => {
  window.location.href = `${base}gestao.html`;
});

btnSegurancas.addEventListener("click", () => {
  window.location.href = `${base}seguranca.html`;
});

btnSementes.addEventListener("click", () => {
  window.location.href = `${base}sementes.html`;
});

btnfinancas.addEventListener("click", () => {
  window.location.href = `${base}financas.html`;
});

btnSuporte.addEventListener("click", () => {
  window.location.href = `${base}suporte.html`;
});

btnRelatorio.addEventListener("click", () => {
  window.location.href = `${base}relatorio.html`;
});

btnPerfil.addEventListener("click", () => {
  window.location.href = `${base}perfil.html`;
});