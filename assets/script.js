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

let saldo = parseFloat(localStorage.getItem("saldo")) || 0;

let historicoDepositos =
  JSON.parse(localStorage.getItem("historicoDepositos")) || [];
let historicoSaques = JSON.parse(localStorage.getItem("historicoSaques")) || [];

function atualizarSaldo() {
  const saldoSpan = document.getElementById("saldo");
  if (saldoSpan) saldoSpan.textContent = saldo.toFixed(2).replace(".", ",");
}

function atualizarHistorico() {
  const tabelaBody = document.querySelector(".table-body");
  if (!tabelaBody) return;

  tabelaBody.innerHTML = "";

  const isDeposito = document.querySelector(".deposito-btn") !== null;
  const historico = isDeposito ? historicoDepositos : historicoSaques;

  historico.forEach((item) => {
    const novaLinha = document.createElement("tr");
    novaLinha.innerHTML = `
      <td>${item.data}</td>
      <td>${item.metodo}</td>
      <td>R$ ${item.valor.toFixed(2).replace(".", ",")}</td>
      <td class="${
        item.status === "Aprovado" ? "status-aprovado" : "status-pendente"
      }">${item.status}</td>
    `;
    tabelaBody.prepend(novaLinha);
  });
}

function depositar(event) {
  event.preventDefault();

  const metodoSelect = document.querySelector("select");
  const valorInput = document.querySelector("input[placeholder*='Ex: 50.00']");

  if (!metodoSelect || !valorInput) return;

  const metodo = metodoSelect.value;
  const valor = parseFloat(valorInput.value.replace(",", "."));

  if (isNaN(valor) || valor <= 0) {
    alert("Informe um valor válido para o depósito.");
    return;
  }

  saldo += valor;
  localStorage.setItem("saldo", saldo);

  const deposito = {
    data: new Date().toLocaleDateString("pt-BR"),
    metodo: metodo.charAt(0).toUpperCase() + metodo.slice(1),
    valor: valor,
    status: "Aprovado",
  };
  historicoDepositos.push(deposito);
  localStorage.setItem(
    "historicoDepositos",
    JSON.stringify(historicoDepositos)
  );

  valorInput.value = "";
  atualizarSaldo();
  atualizarHistorico();
  alert("Depósito realizado com sucesso!");
}

function sacar(event) {
  event.preventDefault();

  const metodoSelect = document.querySelector("select");
  const contaInput = document.querySelector(
    "input[placeholder*='Pix ou conta']"
  );
  const valorInput = document.querySelector("input[placeholder*='Ex: 50.00']");

  if (!metodoSelect || !contaInput || !valorInput) return;

  const metodo = metodoSelect.value;
  const conta = contaInput.value.trim();
  const valor = parseFloat(valorInput.value.replace(",", "."));

  if (!conta) {
    alert("Informe sua chave Pix ou conta bancária.");
    return;
  }

  if (isNaN(valor) || valor <= 0) {
    alert("Informe um valor válido para o saque.");
    return;
  }

  if (valor > saldo) {
    alert("Saldo insuficiente.");
    return;
  }

  saldo -= valor;
  localStorage.setItem("saldo", saldo);

  const saque = {
    data: new Date().toLocaleDateString("pt-BR"),
    metodo: metodo.charAt(0).toUpperCase() + metodo.slice(1),
    valor: valor,
    status: "Aprovado",
  };
  historicoSaques.push(saque);
  localStorage.setItem("historicoSaques", JSON.stringify(historicoSaques));

  contaInput.value = "";
  valorInput.value = "";
  atualizarSaldo();
  atualizarHistorico();
  alert("Saque realizado com sucesso!");
}

document.addEventListener("DOMContentLoaded", () => {
  const depositoBtn = document.querySelector(".deposito-btn");
  const saqueBtn = document.querySelector(".saque-btn");

  if (depositoBtn) depositoBtn.addEventListener("click", depositar);
  if (saqueBtn) saqueBtn.addEventListener("click", sacar);

  atualizarSaldo();
  atualizarHistorico();
});
