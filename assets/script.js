window.onload = function () {
  // Toggle senha
  const senha = document.getElementById("password");
  const toggle = document.getElementById("toggleSenha");

  toggle.addEventListener("click", () => {
    if (senha.type === "password") {
      senha.type = "text";
      toggle.src = "/includes/icons8-hide-30.png";
    } else {
      senha.type = "password";
      toggle.src = "/includes/icons8-eye-30.png";
    }
  });

  const confirmSenha = document.getElementById("confirm-password");
  const toggleConfirm = document.getElementById("toggleSenha1");

  toggleConfirm.addEventListener("click", () => {
    if (confirmSenha.type === "password") {
      confirmSenha.type = "text";
      toggleConfirm.src = "/includes/icons8-hide-30.png";
    } else {
      confirmSenha.type = "password";
      toggleConfirm.src = "/includes/icons8-eye-30.png";
    }
  });
  // Máscara e validação de CPF
  const cpfInput = document.getElementById("cpf");
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

  function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, "");
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false; // sequências iguais inválidas

    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(cpf[i]) * (10 - i);
    let resto = (soma * 10) % 11;
    if (resto === 10) resto = 0;
    if (resto !== parseInt(cpf[9])) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpf[i]) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10) resto = 0;
    if (resto !== parseInt(cpf[10])) return false;

    return true;
  }

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
function abrirOverlay() {
  document.getElementById("overlay-login").style.display = "flex";
}

function fecharOverlay() {
  document.getElementById("overlay-login").style.display = "none";
}
