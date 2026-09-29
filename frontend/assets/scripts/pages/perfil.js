import { carregarUsuario } from "../utils/load-user-data.js";

async function usuario() {
  try {
    const user = await carregarUsuario();

    document.querySelector(
      ".localizacao"
    ).textContent = `${user.territorios[0].logradouro}, ${user.territorios[0].cidade}`;

    document.querySelector(
      ".foto-usuario"
    ).textContent = `${user.nome.substring(0, 2)}`;

    document.querySelector(".email").textContent = `${user.email}`;

    document.querySelector(".telefone").textContent = `${user.telefone}`;

    document.querySelector(".cpf").textContent = `${user.cpf}`;

    document.querySelector(
      ".nome-usuario"
    ).textContent = `${user.nome} ${user.sobrenome}`;
  } catch (error) {
    console.log("Deu erro ao puxar os dados: ", error);
  }
}

usuario();