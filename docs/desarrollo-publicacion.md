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

## Publicación

El artefacto que se publica es el contenido de `_site/`. El repositorio no define actualmente un proveedor ni un flujo CI/CD de publicación. Configura el hosting para ejecutar la generación con Node.js/npm y servir `_site/` como raíz pública. Las URLs de recursos usan rutas desde la raíz (por ejemplo `/assets/...`), por lo que el sitio espera servirse desde la raíz de un dominio.

## Mantenimiento de dependencias

Las dependencias y sus versiones bloqueadas están declaradas en `package.json` y `package-lock.json`. Instala con `npm install` y conserva ambos archivos versionados al modificar dependencias.

## Problemas frecuentes

- **No aparece una imagen:** comprueba que exista bajo `src/assets/` y que la ruta empiece por `/assets/`.
- **Una página no se genera:** revisa el nombre `index.njk`, el front matter y los errores de plantilla que muestra Eleventy.
- **Faltan estilos o componentes externos:** comprueba la conexión del navegador a las CDN usadas por el layout base.
