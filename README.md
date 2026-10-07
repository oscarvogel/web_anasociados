# AN Asociados

Sitio web institucional de Almada Neri & Asociados, construido como sitio estático con [Eleventy](https://www.11ty.dev/) y plantillas Nunjucks. El sitio presenta los servicios, el equipo, proyectos, clientes y canales de contacto de la consultora.

## Requisitos

- Node.js 18 o superior
- npm

## Desarrollo local

```bash
npm install
npx @11ty/eleventy --serve
```

Eleventy inicia un servidor local y observa los archivos fuente. La dirección se muestra en la consola (por defecto, `http://localhost:8080`).

Para generar la versión estática sin iniciar el servidor:

```bash
npx @11ty/eleventy
```

El resultado se escribe en `_site/`, que no se versiona.

## Estructura

```text
src/
  _data/       Datos JSON compartidos por las plantillas
  _includes/   Layouts y componentes Nunjucks
  assets/      CSS, JavaScript, imágenes y otros recursos estáticos
  blog/        Artículos
  contacto/    Página de contacto
  equipo/      Página del equipo
  politicas/   Políticas
  proyectos/   Proyectos
  servicios/   Servicios
  index.njk    Página de inicio
docs/          Documentación del proyecto
```

Consulta [la documentación del proyecto](docs/README.md) para conocer la arquitectura, la edición de contenido y la publicación.

## Tecnologías

- Eleventy 3 para generar páginas estáticas con Nunjucks.
- Tailwind CSS y CSS propio para estilos. La plantilla base carga Tailwind desde CDN.
- Swiper, AOS y Font Awesome cargados desde CDN para componentes visuales.

## Licencia

No se encontró un archivo de licencia en el repositorio. Consultar con los responsables del proyecto antes de reutilizar el código o los recursos gráficos.
