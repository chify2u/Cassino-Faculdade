window.onload = function () {
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

function showSection(id) {
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => section.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

let saldo = parseFloat(localStorage.getItem("saldo")) || 0;
let historico = JSON.parse(localStorage.getItem("historico")) || [];

const saldoEls = Array.from(document.querySelectorAll("#saldo, #saldo2"));
const listaHistoricoEl = document.getElementById("listaHistorico");

function atualizarTela() {
  saldoEls.forEach((el) => {
    el.textContent = saldo.toFixed(2).replace(".", ",");
  });

  if (listaHistoricoEl) {
    listaHistoricoEl.innerHTML = "";
    historico.forEach((item) => {
      const div = document.createElement("div");
      div.classList.add(
        "historico-item",
        item.tipo === "Depósito" ? "deposito-item" : "saque-item"
      );
      div.textContent = `${item.tipo}: R$ ${item.valor
        .toFixed(2)
        .replace(".", ",")} — ${item.data}`;
      listaHistoricoEl.prepend(div);
    });
  }
}

function salvar() {
  localStorage.setItem("saldo", saldo);
  localStorage.setItem("historico", JSON.stringify(historico));
}

function depositar() {
  const valor = parseFloat(document.getElementById("valor")?.value);
  if (!valor || valor <= 0) return alert("Informe um valor válido.");
  saldo += valor;
  historico.push({
    tipo: "Depósito",
    valor,
    data: new Date().toLocaleString(),
  });
  salvar();
  atualizarTela();
  document.getElementById("valor").value = "";
}

function sacar() {
  const valor = parseFloat(document.getElementById("valor")?.value);
  if (!valor || valor <= 0) return alert("Informe um valor válido.");
  if (valor > saldo) return alert("Saldo insuficiente.");
  saldo -= valor;
  historico.push({
    tipo: "Saque",
    valor,
    data: new Date().toLocaleString(),
  });
  salvar();
  atualizarTela();
  document.getElementById("valor").value = "";
}

atualizarTela();
