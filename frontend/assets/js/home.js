import { apiFetch } from "./config/api.js";

const rotas = {
  clima: "Clima.html",
  gestao: "Gestao.html",
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

export async function carregarUsuario() {
  try {
    const usuario = await apiFetch("/users/me", { method: "GET" });
    document.getElementById(
      "welcome-message"
    ).textContent = `Olá, ${usuario.nome}!`;
    document.getElementById(
      "user-abbrev"
    ).textContent = `${usuario.nome.substring(0, 2)}`;
    return usuario;
  } catch (error) {
    console.error(error);
  }
}

carregarUsuario();

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
