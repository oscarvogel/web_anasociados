// Formulario de contacto: validación en línea y envío por el cliente de correo (no hay servidor ni terceros).
(() => {
  const form = document.querySelector('[data-contacto]');
  if (!form) return;
  const estado = form.querySelector('[data-estado]');

  // Llegar desde un servicio (?necesidad=...) deja ese chip marcado
  const elegido = new URLSearchParams(location.search).get('necesidad');
  const chip = elegido && [...form.querySelectorAll('input[name="necesidad"]')].find((i) => i.value === elegido);
  if (chip) chip.checked = true;
  const reglas = {
    nombre: (v) => (v.trim() ? '' : 'Escribe tu nombre.'),
    email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Escribe un correo válido, por ejemplo tu@empresa.com.'),
    mensaje: (v) => (v.trim().length >= 10 ? '' : 'Cuéntanos un poco más: al menos 10 caracteres.'),
  };

  const validar = (nombre) => {
    const campo = form.elements[nombre];
    const msg = reglas[nombre](campo.value);
    form.querySelector('#e-' + nombre).textContent = msg;
    if (msg) campo.setAttribute('aria-invalid', 'true'); else campo.removeAttribute('aria-invalid');
    return !msg;
  };
  Object.keys(reglas).forEach((n) => form.elements[n].addEventListener('blur', () => validar(n)));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const validos = Object.keys(reglas).map(validar);
    if (validos.includes(false)) {
      estado.textContent = 'Revisa los campos marcados.';
      form.querySelector('[aria-invalid]').focus();
      return;
    }
    const d = new FormData(form);
    const cuerpo = [
      `Necesidad: ${d.get('necesidad')}`, `Rubro: ${d.get('rubro')}`, `Nombre: ${d.get('nombre')}`,
      `Correo: ${d.get('email')}`, `Teléfono: ${d.get('telefono') || '-'}`, '', d.get('mensaje'),
    ].join('\n');
    const destino = form.dataset.destino;
    location.href = `mailto:${destino}?subject=${encodeURIComponent('Consulta desde el sitio web')}&body=${encodeURIComponent(cuerpo)}`;
    estado.textContent = `Se abrirá tu programa de correo con la consulta lista. Si no se abre, escríbenos a ${destino}.`;
  });
})();
