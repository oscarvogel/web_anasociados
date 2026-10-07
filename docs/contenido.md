# Contenido y mantenimiento

## Editar una página

Las páginas viven en `src/`. Las plantillas con front matter pueden definir título, descripción, imagen, fecha y otros metadatos que utiliza el layout base. Mantén las rutas en minúsculas y usa `index.njk` para conservar las rutas de directorio, por ejemplo `/equipo/`.

## Editar datos compartidos

Actualiza los JSON de `src/_data/` para cambiar contenido repetido en componentes. Algunos ejemplos:

- `navigation.json`: enlaces del encabezado.
- `servicios.json`: servicios presentados en la portada y la sección de servicios.
- `clientes.json` y `clientes_destacados.json`: clientes y logotipos.
- `equipo.json`: perfiles del equipo.
- `proyectos.json`: contenido de proyectos destacados.
- `recent_articles.json`: tarjetas de artículos recientes.

Respeta la sintaxis JSON: comillas dobles, sin comentarios y sin coma final. Verifica que las rutas de imagen correspondan a archivos de `src/assets/images/`.

## Agregar una página

1. Crea una carpeta y un `index.njk` bajo `src/`.
2. Agrega el front matter con el layout `layouts/base.njk` y los metadatos de la página.
3. Incluye los parciales necesarios o escribe el contenido de la página.
4. Agrega el enlace a `src/_data/navigation.json` si debe aparecer en el menú.
5. Genera el sitio con `npx @11ty/eleventy` y comprueba la ruta en `_site/`.

## Agregar una imagen o recurso

Guarda el archivo en la carpeta correspondiente dentro de `src/assets/` y refiérelo desde las plantillas con una ruta que empiece por `/assets/`. Eleventy copia esa carpeta completa al resultado.

## Artículos

Los artículos actuales están como plantillas Nunjucks dentro de `src/blog/<slug>/index.njk`. Para publicar uno nuevo, crea una carpeta con un slug estable, agrega metadatos y contenido, y registra su tarjeta en `src/_data/recent_articles.json` cuando corresponda.
