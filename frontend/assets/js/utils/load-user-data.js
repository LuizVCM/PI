import { abrirModalErro } from "../utils/modals.js";
import { apiFetch } from "../config/api.js";
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