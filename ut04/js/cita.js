// ===== cita.js · Validaciones a medida del formulario de cita =====
// Se carga con defer, así que cuando se ejecuta el HTML ya existe.

// --- Referencias a los elementos ---
const fecha = document.getElementById("fecha");
const quieroCuenta = document.getElementById("quiero-cuenta");
const cuenta = document.getElementById("cuenta");
const clave = document.getElementById("clave");
const clave2 = document.getElementById("clave2");
const averia = document.getElementById("averia");
const contador = document.getElementById("contador");

// Convierte una fecha a texto aaaa-mm-dd (el formato que usa input type="date").
// Usamos getFullYear/getMonth/getDate (hora local); toISOString() usa UTC
// y en España podría darnos el día anterior.
function aTextoFecha(d) {
  const a = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0"); // los meses empiezan en 0
  const dia = String(d.getDate()).padStart(2, "0");
  return `${a}-${m}-${dia}`;
}

// --- Regla 1: fecha mínima = mañana ---
const manana = new Date();
manana.setDate(manana.getDate() + 1);
fecha.min = aTextoFecha(manana);
// A partir de aquí, una fecha anterior la rechaza el propio navegador (min).

// --- Regla 2: los domingos el taller está cerrado ---
function comprobarDomingo() {
  if (fecha.value === "") {
    fecha.setCustomValidity(""); // vacío: ya se encarga required
    return;
  }
  // "2026-11-29" -> [2026, 11, 29]. No usamos new Date("2026-11-29")
  // porque eso se interpreta en UTC y puede dar el día anterior.
  const [a, m, d] = fecha.value.split("-").map(Number);
  const diaSemana = new Date(a, m - 1, d).getDay(); // 0 = domingo

  fecha.setCustomValidity(
    diaSemana === 0 ? "El taller cierra los domingos." : "",
  );
}
fecha.addEventListener("input", comprobarDomingo);
fecha.addEventListener("change", comprobarDomingo);

// --- Regla 3: cuenta opcional ---
// El fieldset empieza con disabled: sus campos ni se validan ni se envían.
quieroCuenta.addEventListener("change", () => {
  cuenta.disabled = !quieroCuenta.checked;

  if (quieroCuenta.checked) {
    clave.focus(); // llevamos al usuario a la contraseña
  } else {
    // Si se arrepiente, vaciamos las contraseñas
    clave.value = "";
    clave2.value = "";
    clave2.setCustomValidity("");
  }
});

// --- Regla 4: las contraseñas deben coincidir ---
// (el mínimo de 8 caracteres con letras y números lo controla el pattern del HTML)
function comprobarClaves() {
  clave2.setCustomValidity(
    clave2.value && clave2.value !== clave.value
      ? "Las contraseñas no coinciden."
      : "",
  );
}
clave.addEventListener("input", comprobarClaves);
clave2.addEventListener("input", comprobarClaves);

// --- Extra: contador de caracteres de la avería ---
function actualizarContador() {
  contador.textContent = `${averia.value.length} / 500 caracteres`;
}
averia.addEventListener("input", actualizarContador);
actualizarContador(); // por si el navegador recuerda texto al volver atrás
