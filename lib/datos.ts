import servicios from "@/data/servicios.json";
import contacto from "@/data/contacto.json";

export { default as hero } from "@/data/hero.json";
export { default as navegacion } from "@/data/navigation.json";
export { default as sitio } from "@/data/site.json";
export { default as enfoque } from "@/data/enfoque.json";
export { default as clientes } from "@/data/clientes.json";
export { default as nosotros } from "@/data/nosotros.json";
export { default as articulos } from "@/data/recent_articles.json";
export { servicios, contacto };

// Cada servicio enlaza a contacto con su necesidad preseleccionada: si no existe como chip, el build falla
for (const s of servicios) {
  if (!contacto.necesidades.includes(s.necesidad)) {
    throw new Error(`servicios.json: "${s.necesidad}" no está en contacto.json > necesidades`);
  }
}

export const formatoFecha = (iso: string) =>
  new Date(iso).toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
