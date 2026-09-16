
const apiUser = `http://localhost:3000/users/me`;

const localizacao = document.querySelector(".localizacao");
const telefone = document.querySelector(".telefone");
const email = document.querySelector(".email");

const nome = document.querySelector(".nome-usuario")

async function usuario() {
    try{
const dados = await fetch(apiUser, {credentials: 'include'});
const user = await dados.json();

console.log(user);

localizacao.textContent = `${user.territorios[0].logradouro}, ${user.territorios[0].cidade}`

email.textContent = `${user.email}`;

telefone.textContent = `${user.telefone}`;

nome.textContent = `${user.nome} ${user.sobrenome}`

    }catch(error){
        console.log("Deu erro ao puxar os dados: ", error)
    }
}

usuario()