import { abrirModalErro } from "../utils/modals.js";
/** url base do backend (por enquanto é localhost) */
export const API_URL = "http://localhost:3000";
/** função base para fazer requisições para o backend */
export async function apiFetch(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    if (response.status === 401) {
      abrirModalErro(
        "Faça login novamente. Redirecionando...",
        "Sua sessão expirou",
      );
      setTimeout(() => {
        window.location.href = "./formulario.html";
      }, 3000);
      return;
    }
    if (response.status === 403) {
      abrirModalErro(
        result.info,
        "Negado",
      );
      return;
    }
    if (result.message) {
      abrirModalErro(result.message);
    }
    return;
  }
  return result;
}
