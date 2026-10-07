# Arquitectura y generación

## Flujo de generación

Eleventy toma como entrada `src/` y escribe el sitio generado en `_site/`. La configuración está en `.eleventy.js`:

- Usa Nunjucks para las plantillas `.njk` y Markdown.
- Busca layouts y datos en `src/_includes/` y `src/_data/`.
- Copia `src/assets/` a `/_site/assets/` sin procesar.
- Observa `src/assets/css/` durante el modo de desarrollo.
- Define el filtro `formatDate` para presentar fechas con configuración regional española.

## Plantillas y páginas

`src/_includes/layouts/base.njk` aporta la estructura HTML común, metadatos SEO y Open Graph, navegación, pie, botón de WhatsApp y dependencias visuales externas. Los componentes reutilizables están en `src/_includes/partials/`.

Cada página reside en una carpeta dentro de `src/` y normalmente se llama `index.njk`. Por ejemplo, `src/servicios/index.njk` genera `/servicios/`. La portada compone varios parciales, como servicios, clientes y artículos recientes.

## Datos y recursos

Los JSON de `src/_data/` están disponibles en las plantillas por el nombre del archivo, sin la extensión. Allí se mantienen datos compartidos de navegación, servicios, clientes, equipo, proyectos y otras secciones. Los recursos gráficos y scripts propios viven en `src/assets/`.

## Dependencias externas

La plantilla base carga Tailwind, Swiper, AOS y Font Awesome desde CDN, además de Google Analytics. Esos recursos requieren conexión a Internet en el navegador. La configuración `postcss.config.js` y `tailwind.config.js` está presente, pero la generación actual no ejecuta un paso de PostCSS/Tailwind: los estilos de `src/assets/css/style.css` se copian como archivo estático.
