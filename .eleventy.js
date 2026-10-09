// .eleventy.js
const { execSync } = require('child_process');

module.exports = function(eleventyConfig) {
  // Compila Tailwind antes de cada build para que el passthrough copie app.css
  eleventyConfig.on("eleventy.before", () => {
    const leer = (f) => JSON.parse(require("fs").readFileSync(`src/_data/${f}.json`, "utf8"));
    const { necesidades } = leer("contacto");
    leer("servicios").forEach((s) => {
      if (!necesidades.includes(s.necesidad)) throw new Error(`servicios.json: "${s.necesidad}" no está en contacto.json > necesidades`);
    });
    execSync("npx @tailwindcss/cli -i src/assets/css/main.css -o src/assets/css/app.css --minify", { stdio: "inherit" });
  });

  // Copia archivos estáticos
  eleventyConfig.addPassthroughCopy("src/assets");
  
  // Watch CSS files for changes
  eleventyConfig.addWatchTarget("src/assets/css/");
  
  // // Depuración: Verificar datos
  // eleventyConfig.on("eleventy.before", async ({ dir, runMode, outputMode }) => {
  //   const datos = require("./src/_data/proyectos.json");
  //   console.log("Proyectos:", datos);
  // });
  // Filtro para formatear fechas
  eleventyConfig.addFilter("formatDate", (value) => {
    return new Date(value).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  });
  
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
