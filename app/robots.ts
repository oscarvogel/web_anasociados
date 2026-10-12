import type { MetadataRoute } from "next";
import { sitio } from "@/lib/datos";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${sitio.url}/sitemap.xml` };
}
