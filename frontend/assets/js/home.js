import { carregarUsuario } from "./utils/load-user-data.js"

const rotas = {
  clima: "Clima.html",
  gestao: "gestao.html",
  segurancas: "Seguranca.html",
  sementes: "sementes.html",
  financas: "Financas.html",
  suporte: "Suporte.html",
  relatorio: "Relatorio.html",
  perfil: "Perfil.html",
};

Object.entries(rotas).forEach(([classe, pagina]) => {
  document.querySelector(`.${classe}`)?.addEventListener("click", () => {
    window.location.href = `./${pagina}`;
  });
});

// menu

const menuToggle = document.querySelector(".menu-toggle");
const aside = document.querySelector(".aside");

menuToggle.addEventListener("click", () => {
  aside.classList.toggle("aside-encolhido");
});

await carregarUsuario();

// menu mobile

const menuBtn = document.querySelector(".menu-mobile");
const sidebar = document.querySelector(".aside");
const overlay = document.querySelector(".overlay");

menuBtn.addEventListener("click", () => {
  sidebar.classList.toggle("aberto");
  overlay.classList.toggle("ativo");
});

overlay.addEventListener("click", () => {
  sidebar.classList.remove("aberto");
  overlay.classList.remove("ativo");
});
