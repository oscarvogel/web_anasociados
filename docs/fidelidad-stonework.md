# Fidelidad respecto de Stonework (medición con design-dna)

Fecha: 2026-10-10. Referencia: preview real de Stonework (`vividsites.app/api/preview/stonework/index.html`). Sitio medido: home en `localhost:8080`. Ventana de 1912×914 en ambos.

## Método y límites
- **Color:** capturas de pantalla de cada sección medidas con `design-dna/scripts/measure-colors.mjs` (k=6, muestreo determinista) y distancias con `color-math.mjs` (ΔE, escala CIE). Los resultados crudos están en `docs/fidelidad/*.json`.
- **Tipografía y alturas:** leídas del DOM de ambas páginas (`getComputedStyle`, `offsetHeight`).
- **Límites:** no se capturaron "Approach" de Stonework ni "Nosotros" nuestro (el navegador se trabó), así que no hay par de colores para esas dos. El hero nuestro se midió con la animación de entrada en pausa. Las secciones con foto reflejan la foto, no solo la paleta.

## Resultado en una línea
La **estructura, el ritmo y las fuentes coinciden**; difieren a propósito la paleta (verde y tierra frente a beige y negro cálido) y, **sin querer, la escala tipográfica**: nuestros titulares son ~25 % más chicos y el cuerpo, 16 px frente a 19 px.

## Comparación

| Aspecto | Stonework | AN Asociados | Veredicto |
|---|---|---|---|
| Familias | Syne + General Sans + DM Mono | Syne + General Sans + DM Mono | Igual |
| Fondo oscuro | `#16120E` / `#15110E` (negro cálido) | `#181F17` / `#14231C` (verde-negro) | ΔE 8–12: distinto a propósito |
| Fondo claro | `#F5E7D2` hero, `#E5D7CA` contacto | `#EBE9DD` marfil | ΔE 6.5–7: algo más frío |
| Acento | naranja (punto del titular, números) | tierra `#A63E24` / `#E0775A` | Equivalente en papel |
| Secciones oscuras en la home | 2 de 6 (proyectos y estudio) más el pie | 3 de 8 (servicios, nosotros, pie) más el hero con foto | Mismo ritmo claro/oscuro |
| Alto de sección (en pantallas) | hero 1.0 · approach 1.52 · work 1.0 · materials 2.25 · studio 1.68 · contact 0.99 | hero 1.0 · enfoque 1.48 · servicios 1.33 · clientes 1.37 · nosotros 0.94 · artículos 1.09 · contacto 1.16 | Hero y Enfoque casi idénticos; **Nosotros es la mitad de alto que Studio** |
| Wordmark del hero | 278 px (14.5 vw), 6 letras | 144 px (7.5 vw), 12 letras | Mitad de tamaño: "AN ASOCIADOS" es el doble de largo |
| Titular del hero | 68 px (3.6 vw) | 44 px (2.3 vw) | Nuestro texto es largo; aun así queda chico |
| Titulares de sección | 80–95 px (4.2–5.0 vw), interletrado −0.04 em | 64–72 px (3.3–3.8 vw), −0.03 em | ~25 % más chicos |
| Cuerpo | 19 px | 16 px | Menos "aire" que el original |
| Pastilla de navegación | 527×50 px, a 6 px del borde | 458×46 px, a 20 px del borde | Casi igual; la original es algo mayor y más alta |

## Ajustes sugeridos (de mayor a menor efecto, ninguno aplicado)
1. **Escala de titulares:** subir el máximo de los `h2` de 4–4.5 rem a ~5.5 rem (4.6 vw) y el interletrado a −0.04 em. Es el mayor cambio visible hacia la réplica.
2. **Cuerpo a 17–18 px** en párrafos de sección (hoy 15–16 px).
3. **Wordmark en dos renglones** ("AN" arriba, "ASOCIADOS" abajo) para llegar a ~190 px, o usar solo "ASOCIADOS" con el logo como marca.
4. **Nosotros más alto** (~1.5 pantallas): sumar una FAQ corta ("cómo trabajamos", con respuestas que dé el cliente), como hace Studio.
5. **Pastilla** a 6–10 px del borde y 50 px de alto, si se quiere calcar la proporción.
6. Opcional: acercar los fondos oscuros al negro cálido de Stonework solo si se prefiere más contraste con la foto del hero; hoy el verde es parte de la identidad.

## Hallazgo extra de la auditoría de movimiento
Al medir las posiciones de los disparadores de GSAP se vio que los que quedan **debajo de la galería fija de Servicios** estaban desfasados 543 px (la distancia del pin). Se corrigió creando el pin primero (ScrollTrigger mide en orden de creación): ahora el desfase es 0. Ver `src/assets/js/motion.js`.
