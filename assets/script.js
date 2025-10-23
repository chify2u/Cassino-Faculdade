window.onload = function () {
  // ===== Toggle senha Login =====
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

  // ===== Toggle senha Cadastro =====
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

  // ===== Toggle confirmação de senha =====
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

  // ===== Habilitar botão de submit apenas se o checkbox estiver marcado =====
  const checkbox = document.getElementById("termos");
  const submitButton = document.getElementById("submit-btn");

  checkbox.addEventListener("change", function () {
    submitButton.disabled = !this.checked;
  });

  // ===== Validação visual de confirmação de senha =====
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

// ===== Overlays =====
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

// ===== Registro e Login =====
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

// ===== Navegação entre seções =====
function showSection(id) {
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => section.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}
window.onload = function () {
  // ===== Toggle senha Login =====
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

  // ===== Toggle senha Cadastro =====
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

  // ===== Toggle confirmação de senha =====
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

  // ===== Habilitar botão de submit apenas se o checkbox estiver marcado =====
  const checkbox = document.getElementById("termos");
  const submitButton = document.getElementById("submit-btn");

  checkbox.addEventListener("change", function () {
    submitButton.disabled = !this.checked;
  });

  // ===== Validação visual de confirmação de senha =====
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

// ===== Overlays =====
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

// ===== Navegação entre seções =====
function showSection(id) {
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => section.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}
