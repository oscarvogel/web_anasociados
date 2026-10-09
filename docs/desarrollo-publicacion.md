# Desarrollo y publicación

## Requisitos

- Node.js 18 o superior.
- npm.

## Instalar y ejecutar

Desde la raíz del repositorio:

```bash
npm install
npx @11ty/eleventy --serve
```

El servidor de desarrollo informa la URL local en la consola y reconstruye el sitio cuando detecta cambios. Para generar una compilación estática:

```bash
npx @11ty/eleventy
```

La salida queda en `_site/`. Ese directorio se genera localmente y está excluido de Git.

## Estilos, fuentes y movimiento

- **Tailwind 4** se compila solo: `npx @11ty/eleventy` ejecuta antes `@tailwindcss/cli` (ver `.eleventy.js`) y genera `src/assets/css/app.css`, que no se versiona. El hosting debe correr `npm install` antes del build.
- **Fuentes** (Syne, DM Mono, General Sans) y **GSAP 3.13.0** están alojadas en `src/assets/fonts/` y `src/assets/js/vendor/`; no hay CDN salvo Google Analytics.
- **Movimiento:** todo en `src/assets/js/motion.js`. Con "reducir movimiento" o sin JS el contenido se ve igual.
- **Imágenes:** los originales viven en `design-source/` (no se publica); las versiones optimizadas, en `src/assets/images/`. Guía y nombres en `docs/imagenes-pendientes.md`.
- **Datos de las secciones:** `src/_data/*.json` (`hero`, `enfoque`, `servicios`, `clientes`, `nosotros`, `contacto`, `recent_articles`, `navigation`). La página de equipo y la de proyectos están ocultas (`permalink: false`) hasta tener contenido real.
- **Formulario de contacto:** abre el programa de correo del visitante con la consulta redactada (`src/assets/js/contacto.js`); no usa servidor ni terceros.
- `servicios.json > necesidad` debe coincidir con una opción de `contacto.json > necesidades`; el build falla si no.

## Publicación

El artefacto que se publica es el contenido de `_site/`. El repositorio no define actualmente un proveedor ni un flujo CI/CD de publicación. Configura el hosting para ejecutar la generación con Node.js/npm y servir `_site/` como raíz pública. Las URLs de recursos usan rutas desde la raíz (por ejemplo `/assets/...`), por lo que el sitio espera servirse desde la raíz de un dominio.

## Mantenimiento de dependencias

Las dependencias y sus versiones bloqueadas están declaradas en `package.json` y `package-lock.json`. Instala con `npm install` y conserva ambos archivos versionados al modificar dependencias.

## Problemas frecuentes

- **No aparece una imagen:** comprueba que exista bajo `src/assets/` y que la ruta empiece por `/assets/`.
- **Una página no se genera:** revisa el nombre `index.njk`, el front matter y los errores de plantilla que muestra Eleventy.
- **Faltan estilos:** comprueba que `npm install` se haya ejecutado (el build compila Tailwind).
- **`--serve` no refleja un cambio en un parcial incluido:** detén el servidor y vuelve a iniciarlo, o ejecuta `npx @11ty/eleventy`.
