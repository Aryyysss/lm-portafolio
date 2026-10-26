// Muestra la fecha de hoy en español, p. ej. «viernes, 16 de octubre de 2026»
const hoy = new Date().toLocaleDateString("es-ES", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});
document.getElementById("fecha-hoy").textContent = hoy;
