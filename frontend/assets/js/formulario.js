// todos os painéis
const fundo = document.querySelectorAll(".fundo");

// botões de criar novo usuário, ou direcionar para login
const novoUsuario = document.getElementById("novo-usuario");
const entrar = document.getElementById("entrar");

// painéis especificos pra controlar quem aparece
const cadastroPainel = document.getElementById("cadastro-painel");
const loginPainel = document.getElementById("login-painel");
const territorioPainel = document.getElementById("territorio-painel");

// url do backend
const API_URL = "http://localhost:3000";

// função pra facilitar
function showPanel(panel) {
  fundo.forEach((p) => p.classList.remove("active"));
  if (panel) panel.classList.add("active");
}

// login começa visível
showPanel(loginPainel);

novoUsuario.addEventListener("click", () => showPanel(cadastroPainel));
entrar.addEventListener("click", () => showPanel(loginPainel));

// formata esses campos
const telefone = document.getElementById("telefone-cad");
const cpf = document.getElementById("cpf-cad");
const nome = document.getElementById("nome-cad");

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
      6,
    )}-${valor.substring(6)}`;
  } else {
    // se tiver 11 dígitos, formata como celular (5 dígitos antes do traço)
    telefone.value = `(${valor.substring(0, 2)}) ${valor.substring(
      2,
      7,
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
const mensagemCad = document.getElementById("mensagem-cadastro");

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

    mensagemCad.classList.remove("escondido");
    mensagemCad.classList.add("form-success");
    mensagemCad.textContent =
      "Cadastrado com sucesso! Redirecionando para autenticar...";

    setTimeout(() => {
      showPanel(loginPainel);
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
const btnEntrar = document.getElementById("btn-entrar");
const mensagemLog = document.getElementById("mensagem-login");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  removeErrorMessage(loginForm);

  const email = document.getElementById("email-login").value.trim();
  const senha = document.getElementById("senha-login").value;

  btnEntrar.disabled = true;
  btnEntrar.textContent = "Entrando...";

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
      if (result.message) {
        showErrorMessage(result.message, loginForm);
      }
      if (result.errors) {
        const errors = result.errors ? Object.values(result.errors).flat() : {};
        if (errors.length === 1) {
          showErrorMessage(errors[0], loginForm);
        } else {
          showErrors(errors, loginForm);
        }
      }
      return;
    }

    mensagemLog.classList.remove("escondido");
    mensagemLog.classList.add("form-success");
    mensagemLog.textContent = "Autenticado com sucesso! Redirecionando...";

    try {
      const response = await fetch(`${API_URL}/territories/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) showErrorMessage("Falha ao buscar dados", loginForm);
      const result = await response.json();
      if (result.length === 0) {
        setTimeout(() => showPanel(territorioPainel), 2000);
      } else {
        setTimeout(() => (window.location.href = "./home.html"), 2000);
      }
    } catch (error) {
      showErrorMessage(
        "Erro interno do servidor. Tente novamente.",
        loginForm,
      );
    }
  } catch (error) {
    console.error(error);
    showErrorMessage("Erro ao conectar com o servidor", loginForm);
  } finally {
    btnEntrar.disabled = false;
    btnEntrar.textContent = "Entrar";
  }
});

const territorioForm = document.getElementById("territorio");
const btnCadTer = document.getElementById("btn-cadastrar-territorio");
const mensagemTer = document.getElementById("mensagem-territorio");

const cep = document.getElementById("cep");

cep.addEventListener("input", () => {
  let valor = cep.value.replace(/\D/g, "");

  // limita a 11 números
  valor = valor.substring(0, 9);

  if (valor.length <= 5) {
    cep.value = valor;
  } else if (valor.length <= 9) {
    cep.value = `${valor.substring(0, 5)}-` + `${valor.substring(5, 9)}`;
  }
});

territorioForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  removeErrorMessage(territorioForm);

  const body = {
    cep: cep.value,
    area: document.getElementById("area").value,
    unidadeArea: document.getElementById("unidade").value,
  };

  btnCadTer.disabled = true;
  btnCadTer.textContent = "Cadastrando...";

  try {
    const response = await fetch(`${API_URL}/territories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(body),
    });

    const result = await response.json();

    if (!response.ok) {
      if (result.message) {
        showErrorMessage(result.message, territorioForm);
      }
      if (result.errors) {
        const errors = result.errors ? Object.values(result.errors).flat() : {};
        if (errors.length === 1) {
          showErrorMessage(errors[0], territorioForm);
        } else {
          showErrors(errors, territorioForm);
        }
      }
      return;
    }

    mensagemTer.classList.remove("escondido");
    mensagemTer.classList.add("form-success");
    mensagemTer.textContent = "Cadastrado com sucesso! Redirecionando...";

    setTimeout(() => {
      window.location.href = "./home.html";
    }, 2000);
  } catch (error) {
    console.error(error);
    showErrorMessage("Erro ao conectar com o servidor", territorioForm);
  } finally {
    btnCadTer.disabled = false;
    btnCadTer.textContent = "Cadastrar território";
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
    .querySelectorAll(".form-error, .form-error-list, .form-success")
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
