export function apenasNumeros(v) {
  return String(v ?? "").replace(/\D/g, "");
}
// remove o +55 do telefone (nacional)
export function removerDDI(valor) {
  const digitos = apenasNumeros(valor);
  if (digitos.length > 11 && digitos.startsWith("55")) {
    return digitos.slice(2);
  }
  return digitos;
}
export function formatarTelefone(valor) {
  const v = removerDDI(valor).substring(0, 11);
  if (!v) return "";
  if (v.length <= 2) return `(${v}`;
  if (v.length <= 6) return `(${v.slice(0, 2)}) ${v.slice(2)}`;
  if (v.length <= 10)
    return `(${v.slice(0, 2)}) ${v.slice(2, 6)}-${v.slice(6)}`;
  return `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
}
export function formatarCpf(valor) {
  const v = apenasNumeros(valor).substring(0, 11);
  if (v.length <= 3) return v;
  if (v.length <= 6) return `${v.slice(0, 3)}.${v.slice(3)}`;
  if (v.length <= 9) return `${v.slice(0, 3)}.${v.slice(3, 6)}.${v.slice(6)}`;
  return `${v.slice(0, 3)}.${v.slice(3, 6)}.${v.slice(6, 9)}-${v.slice(9)}`;
}
export function formatarCep(valor) {
  const v = apenasNumeros(valor).substring(0, 8);
  if (v.length <= 5) return v;
  return `${v.slice(0, 5)}-${v.slice(5)}`;
}
export function aplicarMascaraTelefone(input) {
  input.addEventListener("input", () => {
    input.value = formatarTelefone(input.value);
  });
}
export function aplicarMascaraCpf(input) {
  input.addEventListener("input", () => {
    input.value = formatarCpf(input.value);
  });
}
export function aplicarMascaraCep(input) {
  input.addEventListener("input", () => {
    input.value = formatarCep(input.value);
  });
}
export function aplicarCapitalizacao(input) {
  input.addEventListener("input", () => {
    input.value = input.value.replace(/(^|\s)\S/g, (l) => l.toUpperCase());
  });
}