# DESIGN.md — Dirección visual (v2, vigente)

**Concepto:** réplica de la estructura de Stonework/Talven (hero con wordmark gigante, pastilla de navegación numerada, secciones alternando claro/oscuro, etiquetas `( 01 )`, encabezados en dos tonos, cifras en mono, formulario con chips) con identidad propia y orientada a empresas forestales e industriales. No se copia código, fotos ni textos de Stonework (licencia Pro). El brief del usuario gana sobre las reglas anti-kicker/anti-numeración de `impeccable`.

## Tres reglas para todo el sitio (del usuario)
1. **Transiciones cinematográficas con GSAP** y efectos ligados al scroll, sin exagerar. Una sola capa (`src/assets/js/motion.js`), contenido visible si falla el JS, `prefers-reduced-motion` respetado, pin horizontal solo ≥ 1024 px. Easing `expo.out` / `power3.out`, entradas 0.7–1.2 s, stagger ≤ 0.06 s, `scrub` solo en parallax y relleno de texto.
2. **Elementos de seguridad con propósito:** casco, señalética, EPP, planos técnicos y marcas de inspección. Íconos Tabler (MIT) en una sola familia de trazo; señalética con la gramática ISO 7010 (verde = condición segura, azul = obligación, amarillo = advertencia, rojo = prohibición) dibujada por nosotros, sin copiar arte ISO; planos y marcas como SVG propios (cotas, corte "A–A", flecha norte, escala, cruces de registro, tildes, curvas de nivel). Nada decorativo: cada uso se ata a un servicio.
3. **Distinción clara entre secciones:** nunca dos secciones seguidas con la misma composición ni el mismo fondo. Orden: Hero (foto) → Enfoque (editorial, marfil) → Servicios (galería horizontal, verde) → Clientes (planilla, marfil-2) → Nosotros (banda fotográfica + cifras) → Artículos (índice editorial) → Contacto (bloque tierra) → Footer (verde). Transiciones por "cortina" `clip-path` y cotas con etiqueta mono.

## Decisiones confirmadas
- Acento **tierra colorada**; **luz de cursor** (overlay CSS cálido sobre la foto, sin WebGL); **logo actual**.
- Foto del hero (`design-source/hero_background.png`, 1672×941): colores naturales + degradado verde profundo a izquierda y abajo. Optimizada en `src/assets/images/hero-{828,1280,1672}.{avif,webp}`.
- Resto de imágenes: recortes de la foto del hero + pack de prompts para generar un set consistente (Paso 6). Sin stock de la web.
- Cifras "13 años" y "15+ clientes" de la web actual (sin fuente verificable, aceptadas). Equipo oculto. Sin proyectos/testimonios todavía. Permiso para mostrar todos los logos.

## Tokens (`src/assets/css/main.css`, `@theme`)
| Token | Valor | Uso | Contraste |
|---|---|---|---|
| `verde` | `#14231C` | Tinta y fondos oscuros | marfil sobre verde 13.3 |
| `verde-2` | `#1D3229` | Superficie sobre oscuro | — |
| `marfil` | `#EAE8DC` | Fondo claro | verde sobre marfil >13 |
| `marfil-2` | `#F3F1E7` | Paneles | — |
| `tierra` | `#A63E24` | Acento / bloques de color | marfil sobre tierra 5.1 |
| `tierra-clara` | `#E0775A` | Acento sobre oscuro | sobre verde 5.4 |
| `salvia` | `#556150` | Texto secundario sobre claro | sobre marfil 5.3 |
| `salvia-clara` | `#B5BFAD` | Texto secundario sobre oscuro | sobre verde 8.6 |
| `apagado` | `#76826F` | Segundo tono de titulares (solo texto grande) | sobre marfil 3.3 |

## Tipografía (fijadas por la referencia)
Syne (titulares, 500–800) · General Sans (cuerpo, Fontshare) · DM Mono (etiquetas y datos). Pendiente: autoalojar en el paso de QA.

## Componentes ya existentes
`.glass`, `.logo-tile`, `.pill-nav`, `.btn-chip`, `.link-under`, `.etiqueta`, `.mono`, `.hero-wordmark` (autoajuste por JS), `figure` (placeholder).

## Patrones permitidos (nombrados por el brief; ver `genjutsu/tells`)
Auditoría del 2026-10-10: estos patrones los detecta el auditor como "tells", pero los pide la réplica de Stonework o el diseño aportado por el usuario, y por eso no cuentan como problema:
- **Etiquetas numeradas** `( 01 )` y `01 / Experiencia`: gramática de Stonework (el brief las permite expresamente).
- **Vidrio** (`backdrop-filter`) en la pastilla de navegación, la ficha de logo y la tarjeta del hero: pieza central de la cabecera de Stonework.
- **Luz de cursor** (degradado radial sobre la foto del hero): decisión confirmada del usuario.
- **Tres tarjetas iguales** en el Enfoque: rediseño aportado por el usuario.
- **Indicación "Scroll"** en el hero: presente en Stonework.
- **Mono en etiquetas, fechas y cifras** (DM Mono): fuente de la referencia, usada para datos y rótulos.
- **Empalmes difuminados** entre secciones (`.fusion`): pedido del usuario; sustituyen al recuadro "cortina".
