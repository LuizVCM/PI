import { carregarUsuario } from "../utils/load-user-data.js";
const btnEditar = document.querySelector(".btn-editar2");
const btnExcluirPerfil = document.querySelector(".btn-excluir2")
const overflow = document.querySelector(".content .modal-overlay2");
const cancelar = document.querySelector(".cancellaarr");
const cancelarExclusao = document.querySelector(".cancelarExclusao");
const confirmarExclusao = document.querySelector(".confirmarExclusao")

// aq pega cada valor nos campos de edição
const campoNome = document.querySelector(".nome-cad");
const campoEmail = document.querySelector(".email-cad");
const campoSobrenome = document.querySelector(".sobrenome-cad");
const campoCpf = document.querySelector(".cpf-cad");
const campoFone = document.querySelector(".fone-cad");

const exclusaoPerfil = document.querySelector(".exclusao-perfil")
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


async function excluirPerfil() {
  const api = `http://localhost:3000/users/me`;
  try {
    const resposta = await fetch(api, {
      credentials: 'include',
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!resposta.ok) {
      throw new Error('Não foi possível excluir o usuário.');
    }

    // Ações após excluir com sucesso:
    alert('Perfil excluído com sucesso!');
    
    // Exemplo 1: Esconder o modal de exclusão
    exclusaoPerfil.classList.add("esconderrr");
    

     window.location.href = 'formulario.html';

  } catch (error) {
    console.log("deu erro ao excluir perfil: " + error);
    alert("Erro ao tentar excluir o perfil.");
  }
}


usuario(); 
btnEditar.addEventListener("click", () => {
  overflow.classList.toggle("esconderrr")});
  cancelar.addEventListener("click", () => {
    overflow.classList.toggle("esconderrr")
  });

  btnExcluirPerfil.addEventListener("click", () => {
    exclusaoPerfil.classList.toggle("esconderrr")
  })
  cancelarExclusao.addEventListener("click", () => {
    exclusaoPerfil.classList.toggle("esconderrr")
  })

  confirmarExclusao.addEventListener("click", excluirPerfil);
