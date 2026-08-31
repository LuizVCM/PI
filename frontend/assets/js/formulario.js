const fundo = document.querySelectorAll(".fundo");
const click = document.getElementById("paragrafoLink");
const click2 = document.getElementById("entra2");
const entrar = document.getElementById("find");

const API_URL = "http://localhost:3000";

click.addEventListener("click", () => {
  fundo.forEach((element) => {
    element.classList.toggle("cadastro");
  });
});
click2.addEventListener("click", () => {
  fundo.forEach((element) => {
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
    telefone.value = `(${valor.substring(0, 2)}) ${valor.substring(
      2,
      6
    )}-${valor.substring(6)}`;
  } else {
    // se tiver 11 dígitos, formata como celular (5 dígitos antes do traço)
    telefone.value = `(${valor.substring(0, 2)}) ${valor.substring(
      2,
      7
    )}-${valor.substring(7)}`;
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
const btnCadastro = document.getElementById("btn-cadastro");
const messageDiv = document.getElementById("signup-message");

cadastroForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  removeErrorMessage(cadastroForm);

  const confirmarSenha = document.getElementById("confirmar-senha-cad").value;
  const senha = document.getElementById("senha-cad").value;

  if (senha !== confirmarSenha) {
    showErrorMessage("As senhas não correspondem", cadastroForm);
    return;
  }

  btnCadastro.disabled = true;
  btnCadastro.textContent = "Cadastrando...";

  const body = {
    nome: document.getElementById("nome-cad").value.trim(),
    sobrenome: document.getElementById("sobrenome-cad").value.trim(),
    email: document.getElementById("email-cad").value.trim(),
    telefone: telefone.value,
    cpf: cpf.value,
    senha: senha,
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
      if (result.message) {
        showErrorMessage(result.message, cadastroForm);
      }
      if (result.errors) {
        const errors = result.errors ? Object.values(result.errors).flat() : {};
        if (errors.length === 1) {
          showErrorMessage(errors[0], cadastroForm);
        } else {
          showErrors(errors, cadastroForm);
        }
      }
      return;
    }

    messageDiv.classList.remove("hidden");
    messageDiv.classList.add("form-success");
    messageDiv.textContent = "Cadastrado com sucesso! Redirecionando...";

    const territorioPainel = document.getElementById("territorio-painel");
    const cadastroPainel = document.getElementById("cadastro-painel");

    setTimeout(() => {
      cadastroPainel.classList.add("hidden");

      territorioPainel.classList.remove("hidden");
    }, 2000);
  } catch (error) {
    console.error(error);
    showErrorMessage("Erro ao conectar com o servidor", cadastroForm);
  } finally {
    btnCadastro.disabled = false;
    btnCadastro.textContent = "Cadastrar";
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

function showErrorMessage(message, form) {
  removeErrorMessage(form);
  const errorEl = document.createElement("p");
  errorEl.className = "form-error";
  errorEl.textContent = message;
  form.appendChild(errorEl);
}

function removeErrorMessage(form) {
  form
    .querySelectorAll(".form-error, .form-error-list")
    .forEach((el) => el.remove());
}
function showErrors(errors, form) {
  removeErrorMessage(form);
  const ul = document.createElement("ul");
  ul.className = "form-error-list";
  errors.forEach((error) => {
    const li = document.createElement("li");
    li.textContent = error.message;
    ul.appendChild(li);
  });
  form.appendChild(ul);
}
