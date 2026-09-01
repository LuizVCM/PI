const nome = document.getElementById("nome");
const sobrenome = document.getElementById("sobrenome");
const email = document.getElementById("email")
const cpf = document.getElementById("cpf")
const numero = document.getElementById("fone")
const senha = document.getElementById("password");

const botaoEnviar = document.getElementById("cadastrarUsuario")


async function Login() {
const apiLogin = "http://localhost:3000/login"

    const usuario = {
    nome: nome.value,
    email: email.value,
    senha: senha.value
   }
try{
const envio = await fetch(apiLogin, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)})

             if (!response.ok) {
            throw new Error(`Erro HTTP: ${envio.status}`);
        }

        const resultado = await envio.json();

        console.log('usuário criado:', resultado);

}catch(error){
    alert("deu erro aqui: ", error)
}
}

botaoEnviar.addEventListener("click", Login)