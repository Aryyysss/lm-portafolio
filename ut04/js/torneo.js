// ===== torneo.js · Validaciones a medida de la inscripción =====
// Se carga con defer: cuando se ejecuta, el HTML ya existe.

const nacimiento = document.getElementById('nacimiento');
const plataformas = document.querySelectorAll('input[name="plataforma"]');
const EDAD_MINIMA = 16;

// --- Regla 1: edad mínima calculada a partir de la fecha de nacimiento ---
function calcularEdad(texto) {
  // "2009-05-14" -> [2009, 5, 14]. No usamos new Date("2009-05-14")
  // porque se interpreta en UTC y podría darnos el día anterior.
  const [a, m, d] = texto.split('-').map(Number);
  const hoy = new Date();

  let edad = hoy.getFullYear() - a;
  // Si este año todavía no ha llegado su cumpleaños, le restamos uno
  const yaCumplio =
    hoy.getMonth() + 1 > m || (hoy.getMonth() + 1 === m && hoy.getDate() >= d);
  if (!yaCumplio) edad--;

  return edad;
}

function comprobarEdad() {
  if (nacimiento.value === '') {
    nacimiento.setCustomValidity(''); // vacío: ya se encarga required
    return;
  }
  const edad = calcularEdad(nacimiento.value);

  if (edad < 0) {
    nacimiento.setCustomValidity('La fecha de nacimiento no puede estar en el futuro.');
  } else if (edad < EDAD_MINIMA) {
    nacimiento.setCustomValidity(
      `Tienes que tener al menos ${EDAD_MINIMA} años para inscribirte (ahora tienes ${edad}).`
    );
  } else {
    nacimiento.setCustomValidity(''); // correcto: limpiamos el error
  }
}
nacimiento.addEventListener('input', comprobarEdad);
nacimiento.addEventListener('change', comprobarEdad);

// --- Regla 2: al menos una plataforma marcada ---
// HTML no sabe exigir "uno de varios checkbox", así que lo hacemos con JS.
// El mensaje se pone en el primer checkbox, que es donde el navegador lo muestra.
function comprobarPlataformas() {
  const alguna = [...plataformas].some((casilla) => casilla.checked);
  plataformas[0].setCustomValidity(alguna ? '' : 'Marca al menos una plataforma.');
}
plataformas.forEach((casilla) => casilla.addEventListener('change', comprobarPlataformas));
comprobarPlataformas(); // al cargar no hay ninguna marcada
