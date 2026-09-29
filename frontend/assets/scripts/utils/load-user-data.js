import { abrirModalErro } from "../utils/modals.js";
import { apiFetch } from "../config/api.js";

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
export async function carregarPlantas() {
  try {
    return await apiFetch("/plants/all", { method: "GET" });
  } catch (error) {
    console.error(error);
    abrirModalErro("Erro ao carregar plantas.");
    return [];
  }
}
export async function carregarSementes() {
  try {
    return await apiFetch("/seeds/me", { method: "GET" });
  } catch (error) {
    console.error(error);
    abrirModalErro("Erro ao carregar sementes.");
    return [];
  }
}