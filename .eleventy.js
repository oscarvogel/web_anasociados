// .eleventy.js
const path = require('path');

module.exports = function(eleventyConfig) {
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
