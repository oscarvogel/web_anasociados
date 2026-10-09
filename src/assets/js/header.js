(() => {
  // El header cambia de tema según la sección que tiene debajo
  const header = document.querySelector('[data-header]');
  const tema = () => {
    const el = document.elementFromPoint(2, 40);
    header.toggleAttribute('data-oscuro', !!(el && el.closest('.on-dark')));
  };
  if (header) {
    let espera = 0;
    tema();
    addEventListener('scroll', () => { espera = espera || requestAnimationFrame(() => { espera = 0; tema(); }); }, { passive: true });
  }

  const button = document.querySelector('[data-menu-button]');
  const menu = document.getElementById('menu-movil');
  if (!button || !menu) return;

  const setMenu = (open) => {
    menu.hidden = !open;
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  };
  button.addEventListener('click', () => setMenu(menu.hidden));
  menu.addEventListener('click', (e) => e.target.closest('a') && setMenu(false));
  addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.hidden) { setMenu(false); button.focus(); }
  });

  // Sección activa en la pastilla (solo en la home)
  if (location.pathname !== '/') return;
  const items = [...document.querySelectorAll('.pill-item[href^="/#"]')];
  const byId = new Map(items.map((a) => [a.hash.slice(1), a]));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      items.forEach((a) => a.removeAttribute('aria-current'));
      byId.get(en.target.id).setAttribute('aria-current', 'true');
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  byId.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
})();
