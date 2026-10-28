import type { MetadataRoute } from "next";
import { sitio } from "@/lib/datos";

export const dynamic = "force-static";

const rutas = ["/", "/servicios/", "/contacto/", "/clientes_destacados/", "/politicas/", "/blog/el-futuro-de-la-lucha-contra-incendios/"];

export default function sitemap(): MetadataRoute.Sitemap {
  return rutas.map((r) => ({ url: sitio.url + r }));
}
