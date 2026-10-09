# AGENTS.md — Rediseño AN Asociados

Sitio: Eleventy 3 + Nunjucks + Tailwind 4 (`src/`). Referencia visual: **réplica de la estructura de Stonework/Talven** (vividsites) con identidad propia; sin copiar su código, fotos ni textos. Dirección, tres reglas del sitio (GSAP cinematográfico, seguridad con propósito, ritmo de secciones) y tokens: ver [DESIGN.md](DESIGN.md).

## Reglas comunes
1. **Una fase a la vez.** No empezar la siguiente sin aprobación explícita del usuario.
2. **Skills obligatorias:** una fase no se cierra sin haber invocado las skills de su tabla (y de los agentes que intervinieron).
3. **Imágenes:** solo la foto del hero del cliente (`design-source/hero_background.png`) y recortes de ella; el resto, placeholders marcados con `data-placeholder` hasta tener el set generado. Sin stock de la web.
4. **No copiar** código, fotos ni textos de Stonework (licencia Pro). Se replica la composición, no el material.
5. **Un agente no edita fuera de su contexto.** Si necesita un cambio ajeno, lo pide al agente dueño.
6. Movimiento solo con GSAP en `src/assets/js/motion.js`, con `gsap.matchMedia()` y `prefers-reduced-motion`; el contenido debe verse sin JS; contraste AA; HTML semántico.
7. Textos en español neutro, tono sobrio, sin superlativos vacíos ("líderes", "excelencia").
8. Comentarios mínimos; datos en `src/_data/*.json`, no hardcodeados en plantillas.
9. Datos de ejemplo (p. ej. `equipo.json`) se confirman con el cliente antes de publicar.

## Agentes por Bounded Context

| Contexto | Agente | Alcance | Skills obligatorias |
|---|---|---|---|
| Design System & Brand | `design-system-agent` | `src/assets/css/style.css`, tokens (`@theme`), `DESIGN.md` | `design:design-system`, `ui-ux-pro-max`, `impeccable` |
| Layout & Shell | `shell-agent` | `layouts/base.njk`, `header.njk`, `footer.njk`, `whatsapp-button.njk`, SEO / JSON-LD | `impeccable`, `ui-ux-pro-max` |
| Landing / Home | `home-agent` | `index.njk`, `hero.njk`, `servicios.njk`, `eleginos.njk`, `_data/hero.json`, `_data/servicios.json`, `servicios/` | `apple-design`, `motion-design`, `design:design-critique` |
| Credibilidad | `trust-agent` | `clientes.njk`, `clientes_destacados/`, `proyectos*`, `equipo/`, `_data/clientes*.json`, `proyectos.json`, `equipo.json`, logos | `impeccable`, `ui-ux-pro-max` |
| Contenido & Blog | `content-agent` | `blog/`, `recent-articles.njk`, `_data/recent_articles.json`, `politicas/` | `design:ux-copy` |
| Contacto & Conversión | `contact-agent` | `contacto/`, `popup.njk`, WhatsApp, CTAs | `design:ux-copy`, `design:accessibility-review` |
| Motion & Interacción | `motion-agent` | `src/assets/js/motion.js` (GSAP: intro, parallax, cortinas, pin horizontal, contadores) | `motion-design`, `apple-design` |
| QA & Accesibilidad | `qa-agent` | solo lectura, Playwright, reportes | `design:accessibility-review`, `playwright-cli`, `ponytail:ponytail-review` |
| Build & Despliegue | `build-agent` | `.eleventy.js`, `package.json`, `postcss.config.js`, hosting | `ponytail:ponytail` |

## Pasos (plan v2 aprobado)
0. Docs y memoria · 1. Hero v2 con foto + base GSAP · 2. Enfoque · 3. Servicios (galería horizontal) · 4. Clientes + Nosotros · 5. Artículos + Contacto + footer · 6. QA y entrega (incluye pack de prompts de imágenes).

## Skills externas instaladas en `.claude/skills/` (MIT, revisadas antes de instalar)
- `landing-page-design` (elayadesign/ai-design-skills @1c1e97c): usar la **Parte A** (intake, estructura, conversión, SEO) y los apartados B8 a B11 (contenido realista, estados, requisitos de entrega, sección de lema). **No aplicar la Parte B1 a B6** (tipografías, escala, espaciado, gradientes, íconos, colores oscuros): contradicen el brief fijado por el usuario (réplica de Stonework con Syne / General Sans / DM Mono, Tabler, tokens propios). Regla de precedencia: **DESIGN.md y el brief del usuario ganan sobre la skill**.
- `scroll-world` (oso95/scroll-world @71cc36d): genera videos con IA (Higgsfield / Monid, de pago) y requiere CLIs con sesión. **No ejecutar ninguna generación sin aprobación explícita del usuario** (costo estimado en USD y créditos). No se usa en el plan actual.

Cierre de cada fase de UI: `impeccable` (critique/polish), `playwright-cli` a 375/768/1440 px y `ponytail:ponytail-review`.
