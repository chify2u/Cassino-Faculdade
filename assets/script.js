window.onload = function () {
  // Toggle senha Login
  const senha_login = document.getElementById("password-login");
  const toggle_login = document.getElementById("toggleSenha");

  toggle_login.addEventListener("click", () => {
    if (senha_login.type === "password") {
      senha_login.type = "text";
      toggle_login.src = "/includes/olho_fechado.png";
    } else {
      senha_login.type = "password";
      toggle_login.src = "/includes/olho_aberto.png";
    }
  });
  // Toggle senha Cadastro e Confirmacão de senhas
  const senha = document.getElementById("cadastro-password");
  const toggle = document.getElementById("toggle_Senha");

  toggle.addEventListener("click", () => {
    if (senha.type === "password") {
      senha.type = "text";
      toggle.src = "/includes/olho_fechado.png";
    } else {
      senha.type = "password";
      toggle.src = "/includes/olho_aberto.png";
    }
  });

  const confirmSenha = document.getElementById("confirm-password");
  const toggleConfirm = document.getElementById("toggle-confirm");

  toggleConfirm.addEventListener("click", () => {
    if (confirmSenha.type === "password") {
      confirmSenha.type = "text";
      toggleConfirm.src = "/includes/olho_fechado.png";
    } else {
      confirmSenha.type = "password";
      toggleConfirm.src = "/includes/olho_aberto.png";
    }
  });

  // CPF
  const cpfInput = document.getElementById("cadastro-cpf");
  const cpfError = document.getElementById("cpf-error");

  cpfInput.addEventListener("input", () => {
    let value = cpfInput.value.replace(/\D/g, "");

    if (value.length > 3) value = value.replace(/^(\d{3})(\d)/, "$1.$2");
    if (value.length > 6)
      value = value.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
    if (value.length > 9)
      value = value.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");

    cpfInput.value = value;
  });

  cpfInput.addEventListener("blur", () => {
    if (!validarCPF(cpfInput.value)) {
      cpfError.style.display = "inline";
    } else {
      cpfError.style.display = "none";
    }
  });

  const checkbox = document.getElementById("termos");
  const submitButton = document.getElementById("submit-btn");
  checkbox.addEventListener("change", function () {
    submitButton.disabled = !this.checked;
  });

  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirm-password");

  confirmPassword.addEventListener("input", () => {
    if (password.value === confirmPassword.value) {
      confirmPassword.style.borderColor = "green";
    } else {
      confirmPassword.style.borderColor = "red";
    }
  });
};
function openOverlay() {
  document.getElementById("overlay").style.display = "flex";
}

function closeOverlay() {
  document.getElementById("overlay").style.display = "none";
}
function abrirOverlaylogin() {
  document.getElementById("overlay-login").style.display = "flex";
}

function fecharOverlaylogin() {
  document.getElementById("overlay-login").style.display = "none";
}

let users = JSON.parse(localStorage.getItem("users")) || [];

function registrar() {
  const email = document.getElementById("cadastro-email").value;
  const cpf = document.getElementById("cadastro-cpf").value;
  const password = document.getElementById("cadastro-password").value;

  if (email && cpf && password) {
    users.push({ email, cpf, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Cadastro realizado com sucesso!");
    abrirOverlaylogin();
  } else {
    alert("Por favor, preencha todos os campos.");
  }
}

function login(event) {
  if (event) event.preventDefault();
  const usert = document.getElementById("login-user").value;
  const password = document.getElementById("password-login").value;

  const user = users.find(
    (u) => (u.email === usert || u.cpf === usert) && u.password === password
  );

  if (user !== null && user !== undefined) {
    alert("Login realizado com sucesso!");
    window.location.href = "./pages/home.html";
  } else {
    alert("Usuário ou senha incorretos.");
  }
}
