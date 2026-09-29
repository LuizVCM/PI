import { API_URL } from "../config/api.js";
import {
  showErrorMessage,
  removeMessage,
  showErrors,
} from "../utils/show-message.js";
import { capitalizar } from "../utils/formatter.js";
import {
  aplicarMascaraTelefone,
  aplicarMascaraCpf,
  aplicarMascaraCep,
  aplicarCapitalizacao,
} from "../utils/masks.js";

// todos os painéis
const fundo = document.querySelectorAll(".fundo");

// botões de criar novo usuário, ou direcionar para login
const novoUsuario = document.getElementById("novo-usuario");
const entrar = document.getElementById("entrar");

// painéis especificos pra controlar quem aparece
const cadastroPainel = document.getElementById("cadastro-painel");
const loginPainel = document.getElementById("login-painel");
const territorioPainel = document.getElementById("territorio-painel");
const sensorPainel = document.getElementById("sensor-painel");

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
const nomeInput = document.getElementById("nome-cad");
const sobrenomeInput = document.getElementById("sobrenome-cad");

aplicarCapitalizacao(nomeInput);
aplicarCapitalizacao(sobrenomeInput);
aplicarMascaraTelefone(telefone);
aplicarMascaraCpf(cpf);

const cadastroForm = document.getElementById("cadastro");
const btnCadastro = document.getElementById("btn-cadastro");
const mensagemCad = document.getElementById("mensagem-cadastro");

cadastroForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  removeMessage(cadastroForm);

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

    mensagemCad.classList.remove("hidden");
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

  removeMessage(loginForm);

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
      if (result.info) {
        showErrorMessage(capitalizar(result.info), loginForm);
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

    mensagemLog.classList.remove("hidden");
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
        return;
      } else {
        try {
          const response = await fetch(`${API_URL}/sensors/me`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          });
          if (!response.ok)
            showErrorMessage("Falha ao buscar dados", loginForm);
          const result = await response.json();
          if (result.length === 0) {
            setTimeout(() => showPanel(sensorPainel), 2000);
            return;
          } else {
            setTimeout(() => (window.location.href = "./home.html"), 2000);
            return;
          }
        } catch (error) {
          showErrorMessage(
            "Erro interno do servidor. Tente novamente.",
            loginForm
          );
        }
      }
    } catch (error) {
      showErrorMessage("Erro interno do servidor. Tente novamente.", loginForm);
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
aplicarMascaraCep(cep);

territorioForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  removeMessage(territorioForm);

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

    mensagemTer.classList.remove("hidden");
    mensagemTer.classList.add("form-success");
    mensagemTer.textContent = "Cadastrado com sucesso! Redirecionando...";

    try {
      const response = await fetch(`${API_URL}/sensors/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok)
        showErrorMessage("Falha ao buscar dados", territorioForm);
      const result = await response.json();
      if (result.length === 0) {
        setTimeout(() => showPanel(sensorPainel), 2000);
        return;
      } else {
        setTimeout(() => (window.location.href = "./home.html"), 2000);
        return;
      }
    } catch (error) {
      showErrorMessage(
        "Erro interno do servidor. Tente novamente.",
        territorioForm
      );
    }
  } catch (error) {
    console.error(error);
    showErrorMessage("Erro ao conectar com o servidor", territorioForm);
  } finally {
    btnCadTer.disabled = false;
    btnCadTer.textContent = "Cadastrar território";
  }
});

const sensorForm = document.getElementById("sensores");
const btnCadSen = document.getElementById("btn-cadastrar-sensor");
const mensagemSen = document.getElementById("mensagem-sensor");
const acoesSen = document.getElementById("acoes-sensor");

sensorForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  removeMessage(sensorForm);

  const body = {
    modelo: document.getElementById("modelo").value,
    tipo: document.getElementById("tipo").value,
  };

  btnCadSen.disabled = true;
  btnCadSen.textContent = "Cadastrando...";

  let territorioId;
  try {
    const response = await fetch(`${API_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (!response.ok) {
      showErrorMessage("Erro ao conectar com o servidor", sensorForm);
    }
    const usuario = await response.json();
    territorioId = usuario.territorios[0].id;
  } catch (error) {
    console.error("Erro ao carregar usuário: " + error);
  }

  try {
    const response = await fetch(
      `${API_URL}/sensors/territory/${territorioId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      if (result.message) {
        showErrorMessage(result.message, sensorForm);
      }
      if (result.errors) {
        const errors = result.errors ? Object.values(result.errors).flat() : {};
        if (errors.length === 1) {
          showErrorMessage(errors[0], sensorForm);
        } else {
          showErrors(errors, sensorForm);
        }
      }
      return;
    }

    mensagemSen.classList.remove("hidden");
    mensagemSen.classList.add("form-success");
    mensagemSen.textContent = "Cadastrado com sucesso!";
    acoesSen.classList.remove("hidden");
    acoesSen.classList.add("form-message");

    const btnCadNov = document.getElementById("btn-cad-nov");
    const btnPular = document.getElementById("btn-pular");

    btnCadNov.addEventListener("click", () => {
      acoesSen.classList.add("hidden");
      removeMessage(sensorForm);
      return;
    });

    btnPular.addEventListener("click", () => {
      setTimeout(() => {
        window.location.href = "./home.html";
      }, 2000);
    });
  } catch (error) {
    console.error(error);
    showErrorMessage("Erro ao conectar com o servidor", sensorForm);
  } finally {
    btnCadSen.disabled = false;
    btnCadSen.textContent = "Cadastrar sensor";
  }
});