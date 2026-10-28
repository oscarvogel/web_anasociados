// Capa única de movimiento (GSAP). Sin la clase "motion" en <html> (movimiento reducido o sin JS) todo queda visible.
(() => {
  const hero = document.querySelector('[data-hero]');
  const wordmark = hero && hero.querySelector('[data-hero-wordmark]');

  // El wordmark ocupa justo el ancho disponible, sea cual sea la tipografía cargada
  const fit = () => {
    wordmark.style.fontSize = '100px';
    const pad = parseFloat(getComputedStyle(wordmark).paddingLeft) * 2;
    const w = wordmark.firstElementChild.getBoundingClientRect().width;
    wordmark.style.fontSize = Math.min(240, (100 * (wordmark.clientWidth - pad)) / w * 0.995) + 'px';
  };
  if (wordmark) {
    let cuadro = 0;
    fit();
    document.fonts.ready.then(fit);
    addEventListener('resize', () => { cuadro = cuadro || requestAnimationFrame(() => { cuadro = 0; fit(); }); });
  }

  const root = document.documentElement;
  if (!root.classList.contains('motion')) return;
  if (!window.gsap || !window.ScrollTrigger || !window.SplitText) { root.classList.remove('motion'); return; }
  gsap.registerPlugin(ScrollTrigger, SplitText);

  // Servicios: la sección se fija y la galería avanza en horizontal (solo escritorio).
  // Se crea primero a propósito: su espaciador desplaza lo que queda debajo y ScrollTrigger mide en orden de creación.
  gsap.matchMedia().add('(min-width: 1024px) and (min-height: 800px) and (prefers-reduced-motion: no-preference)', () => {
    const sec = document.querySelector('[data-pin-h]');
    if (!sec) return;
    const track = sec.querySelector('[data-track]');
    const cuenta = sec.querySelector('[data-cuenta]');
    const barra = sec.querySelector('[data-barra]');
    const n = track.children.length;
    const dist = () => {
      const last = track.lastElementChild;
      return Math.max(0, last.offsetLeft + last.offsetWidth + parseFloat(getComputedStyle(track).paddingLeft) - innerWidth);
    };
    // Si las tarjetas caben en pantalla (menos de 80 px de recorrido) no hay nada que desplazar: se muestran todas quietas
    const indicador = cuenta.closest('.mono');
    if (dist() < 80) { indicador.style.display = 'none'; return () => { indicador.style.display = ''; }; }
    sec.classList.add('is-pinned');
    const avance = gsap.to(track, {
      x: () => -dist(), ease: 'none',
      scrollTrigger: {
        trigger: sec, start: 'top top', end: () => '+=' + dist(), pin: true, scrub: 0.6, anticipatePin: 1, invalidateOnRefresh: true,
        onUpdate: (st) => {
          cuenta.textContent = String(Math.min(n, Math.floor(st.progress * n) + 1)).padStart(2, '0');
          barra.style.transform = `scaleX(${st.progress})`;
        },
      },
    });
    // Teclado: al enfocar una tarjeta fuera de pantalla, el scroll avanza hasta mostrarla
    const alEnfocar = (e) => {
      const tarjeta = e.target.closest('.card-serv');
      const st = avance.scrollTrigger;
      if (!tarjeta || !st || !dist()) return;
      const p = Math.min(1, Math.max(0, (tarjeta.offsetLeft - parseFloat(getComputedStyle(track).paddingLeft)) / dist()));
      window.scrollTo({ top: st.start + p * (st.end - st.start), behavior: 'instant' });
    };
    track.addEventListener('focusin', alEnfocar);
    return () => { sec.classList.remove('is-pinned'); track.removeEventListener('focusin', alEnfocar); };
  });

  gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
    // Entrada del hero: dolly de la foto, wordmark por letras, texto en cascada
    if (hero) {
      const split = SplitText.create(wordmark.firstElementChild, { type: 'chars', mask: 'chars' });
      gsap.set(wordmark, { autoAlpha: 1 });
      gsap.timeline({ defaults: { ease: 'expo.out' } })
        .from('[data-hero-photo] img', { scale: 1.14, duration: 2.2 }, 0)
        .from(split.chars, { yPercent: 115, duration: 0.9, stagger: 0.035 }, 0.15);

      const trigger = { trigger: hero, start: 'top top', end: 'bottom top', scrub: true };
      gsap.to('[data-hero-photo]', { yPercent: 6, ease: 'none', scrollTrigger: trigger });
      gsap.to(wordmark, { yPercent: -30, ease: 'none', scrollTrigger: trigger });

      // Luz de cursor sobre la foto (quickTo: un único tween reutilizado)
      const pos = { x: 72, y: 38 };
      const aplicar = () => { hero.style.setProperty('--lx', pos.x + '%'); hero.style.setProperty('--ly', pos.y + '%'); };
      const luzX = gsap.quickTo(pos, 'x', { duration: 0.9, ease: 'power3', onUpdate: aplicar });
      const luzY = gsap.quickTo(pos, 'y', { duration: 0.9, ease: 'power3', onUpdate: aplicar });
      hero.addEventListener('pointermove', (e) => {
        const r = hero.getBoundingClientRect();
        luzX(((e.clientX - r.left) / r.width) * 100);
        luzY(((e.clientY - r.top) / r.height) * 100);
      });
    }

    gsap.from('.hero-reveal', { autoAlpha: 0, y: 24, duration: 0.9, stagger: 0.07, ease: 'power3.out', delay: hero ? 0.55 : 0.1 });

    // Revelado de bloques al entrar en pantalla
    ScrollTrigger.batch('[data-reveal]', {
      start: 'top 90%',
      once: true,
      onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.07, ease: 'power3.out', overwrite: true }),
    });

    // Fondos fotográficos con parallax suave y marquee de clientes
    document.querySelectorAll('[data-parallax]').forEach((el) => {
      gsap.fromTo(el, { yPercent: -7 }, { yPercent: 7, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
    document.querySelectorAll('[data-marquee]').forEach((el) => gsap.to(el, { xPercent: -50, duration: 70, ease: 'none', repeat: -1, scrollTrigger: { trigger: el, toggleActions: 'play pause resume pause' } }));

    // Frase del Enfoque: se rellena palabra por palabra
    document.querySelectorAll('[data-fill]').forEach((el) => {
      const { words } = SplitText.create(el, { type: 'words', aria: 'none' });
      gsap.to(words, { color: 'var(--color-verde)', stagger: 0.12, ease: 'none', scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: true } });
    });

    // Dibujos técnicos: se trazan solos al llegar
    document.querySelectorAll('.dibuja').forEach((svg) => {
      const trazos = [...svg.querySelectorAll('path,circle')].filter((n) => !n.closest('.sign'));
      gsap.fromTo(trazos, { strokeDasharray: 1, strokeDashoffset: 1 }, {
        strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut', stagger: 0.08, clearProps: 'strokeDasharray,strokeDashoffset',
        scrollTrigger: { trigger: svg, start: 'top 85%', once: true },
      });
    });

    // Cifras que cuentan hasta su valor
    const cifras = [...document.querySelectorAll('[data-count]')];
    cifras.forEach((el) => {
      const o = { v: 0 };
      el.textContent = 0;
      gsap.to(o, { v: +el.dataset.count, duration: 1.6, ease: 'power2.out', snap: { v: 1 }, onUpdate: () => { el.textContent = o.v; }, scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
    });

    document.fonts.ready.then(() => ScrollTrigger.refresh());

    // Si el usuario activa "reducir movimiento" con la página abierta, GSAP revierte y todo vuelve a verse
    return () => { root.classList.remove('motion'); cifras.forEach((el) => { el.textContent = el.dataset.count; }); };
  });
})();
