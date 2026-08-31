const formulario = document.querySelectorAll(".fundo");
const click = document.getElementById("paragrafoLink");
const click2 = document.getElementById("entra2");
const entrar = document.getElementById("find");
const messageDiv = document.getElementById("signup-message");

const API_URL = "http://localhost:3000";

click.addEventListener("click", () => {
  formulario.forEach((element) => {
    element.classList.toggle("cadastro");
  });
});
click2.addEventListener("click", () => {
  formulario.forEach((element) => {
    element.classList.toggle("cadastro");
  });
});

// formata esses campos
const telefone = document.getElementById("telefone-cad");
const cpf = document.getElementById("cpf-cad");

telefone.addEventListener("input", () => {
  // remove o que não for dígito e limita pra 11 caracteres
  let valor = telefone.value.replace(/\D/g, "").substring(0, 11);

  if (valor.length <= 2) {
    telefone.value = `(${valor}`;
  } else if (valor.length <= 6) {
    telefone.value = `(${valor.substring(0, 2)}) ${valor.substring(2)}`;
  } else if (valor.length <= 10) {
    // se tiver 10 dígitos, formata como fixo (4 dígitos antes do traço)
    telefone.value = `(${valor.substring(0, 2)}) ${valor.substring(2, 6)}-${valor.substring(6)}`;
  } else {
    // se tiver 11 dígitos, formata como celular (5 dígitos antes do traço)
    telefone.value = `(${valor.substring(0, 2)}) ${valor.substring(2, 7)}-${valor.substring(7)}`;
  }
});

cpf.addEventListener("input", () => {
  let valor = cpf.value.replace(/\D/g, "");

  // limita a 11 números
  valor = valor.substring(0, 11);
    
  if (valor.length <= 3) {
    cpf.value = valor;
  } else if (valor.length <= 6) {
    cpf.value = `${valor.substring(0, 3)}.` + `${valor.substring(3)}`;
  } else if (valor.length <= 9) {
    cpf.value =
      `${valor.substring(0, 3)}.` +
      `${valor.substring(3, 6)}.` +
      `${valor.substring(6)}`;
  } else {
    cpf.value =
      `${valor.substring(0, 3)}.` +
      `${valor.substring(3, 6)}.` +
      `${valor.substring(6, 9)}-` +
      `${valor.substring(9)}`;
  }
});

const cadastroForm = document.getElementById("cadastro");

cadastroForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const body = {
    nome: document.getElementById("nome-cad").value.trim(),
    sobrenome: document.getElementById("sobrenome-cad").value.trim(),
    email: document.getElementById("email-cad").value.trim(),
    telefone: telefone.value,
    cpf: cpf.value,
    senha: document.getElementById("senha-cad").value,
  };

  try {
    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const result = await response.json();

    if (!response.ok) {
      alert(result.message || "Erro ao cadastrar usuário");
      return;
    }

    alert("Cadastro realizado com sucesso");

    cadastroForm.reset();

    document.getElementById("entra2").click();
  } catch (error) {
    console.error(error);
    alert("Erro ao conectar com o servidor");
  }
});

const loginForm = document.getElementById("login");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email-login").value.trim();
  const senha = document.getElementById("senha-login").value;

  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        senha,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      alert(result.message || "Erro ao realizar login");
      return;
    }

    window.location.href = "home.html";
  } catch (error) {
    console.error(error);
    alert("Erro ao conectar com o servidor");
  }
});

function showErrorMessage(message) {
  removeErrorMessage();
  const errorEl = document.createElement("p");
  errorEl.className = "form-error";
  errorEl.textContent = message;
  form.appendChild(errorEl);
}

function removeErrorMessage() {
  form
    .querySelectorAll(".form-error, .form-error-list")
    .forEach((el) => el.remove());
}
function showErrors(errors) {
  removeErrorMessage();
  const ul = document.createElement("ul");
  ul.className = "form-error-list";
  errors.forEach((error) => {
    const li = document.createElement("li");
    li.textContent = error;
    ul.appendChild(li);
  });
  form.appendChild(ul);
}
