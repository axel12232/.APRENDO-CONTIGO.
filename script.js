// Variables globales
let nombreUsuario = "";
let sexo = "";
let avatar = "";

// Función para síntesis de voz sin leer emojis
function hablar(texto) {
  if (!texto) return;
  // Quitar emojis del texto
  const textoSinEmoji = texto.replace(/[\u{1F300}-\u{1F6FF}\u{2600}-\u{27BF}\u{1F600}-\u{1F64F}]/gu, '').trim();
  if (!textoSinEmoji) return;
  const utterance = new SpeechSynthesisUtterance(textoSinEmoji);
  utterance.lang = "es-MX";
  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
}

// Control de pantalla activa
function mostrarPantalla(id) {
  document.querySelectorAll(".pantalla").forEach(p => {
    p.classList.remove("activa");
  });
  document.getElementById(id).classList.add("activa");
}

// --- Bienvenida ---
const inputNombre = document.getElementById("nombre");
const botonesSexo = document.querySelectorAll(".sexoBtn");
const botonesAvatar = document.querySelectorAll(".avatar");
const botonIniciar = document.getElementById("botonIniciar");
const pantallaBienvenida = document.getElementById("bienvenida");
const menuPrincipal = document.getElementById("menuPrincipal");
const saludoUsuario = document.getElementById("saludoUsuario");

botonesSexo.forEach(btn => {
  btn.addEventListener("click", () => {
    sexo = btn.dataset.sexo;
    actualizarFondoPorSexo();
    verificarIniciar();
  });
});

botonesAvatar.forEach(btn => {
  btn.addEventListener("click", () => {
    avatar = btn.dataset.emoji;
    verificarIniciar();
  });
});

inputNombre.addEventListener("input", verificarIniciar);

function verificarIniciar() {
  nombreUsuario = inputNombre.value.trim();
  if (nombreUsuario !== "" && sexo !== "" && avatar !== "") {
    botonIniciar.disabled = false;
  } else {
    botonIniciar.disabled = true;
  }
}

function actualizarFondoPorSexo() {
  if (sexo === "nina") {
    document.body.style.backgroundColor = "#ffe6f0";
  } else {
    document.body.style.backgroundColor = "#e6f0ff";
  }
}

botonIniciar.addEventListener("click", () => {
  if (nombreUsuario && sexo && avatar) {
    saludoUsuario.textContent = `¡Hola ${nombreUsuario}! ${avatar}`;
    mostrarPantalla("menuPrincipal");
    hablar(`Bienvenido ${nombreUsuario}, elige un área para comenzar.`);
  }
});

// (Aquí sigue el resto de tu código JS, igual como lo tienes listo)

