import { carregarUsuario } from "../utils/load-user-data.js";
const btnEditar = document.querySelector(".btn-editar2");
const overflow = document.querySelector(".content .modal-overlay2");
const cancelar = document.querySelector(".cancellaarr");

// aq pega cada valor nos campos de edição
const campoNome = document.querySelector(".nome-cad");
const campoEmail = document.querySelector(".email-cad");
const campoSobrenome = document.querySelector(".sobrenome-cad");
const campoCpf = document.querySelector(".cpf-cad");
const campoFone = document.querySelector(".fone-cad")

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


    campoNome.value = `${user.nome}`;
    campoCpf.value = `${user.cpf}`;
    campoEmail.value = `${user.email}`;
    campoFone.value = `${user.telefone}`;
    campoSobrenome.value = `${user.sobrenome}`
  } catch (error) {
    console.log("Deu erro ao puxar os dados: ", error);
  }
}

usuario(); 
btnEditar.addEventListener("click", () => {
  overflow.classList.toggle("esconderrr")});
  cancelar.addEventListener("click", () => {
    overflow.classList.toggle("esconderrr")
  })
