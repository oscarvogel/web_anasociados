import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import Header from "@/components/Header";
import ScrollSuave from "@/components/ScrollSuave";
import Footer from "@/components/Footer";
import WhatsApp from "@/components/WhatsApp";
import { contacto, sitio } from "@/lib/datos";
import "./globals.css";

const archivo = localFont({
  src: "./fonts/Archivo-variable.woff2",
  variable: "--font-archivo",
  weight: "100 900",
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
});
const general = localFont({
  src: [
    { path: "./fonts/GeneralSans-400.woff2", weight: "400" },
    { path: "./fonts/GeneralSans-500.woff2", weight: "500" },
    { path: "./fonts/GeneralSans-600.woff2", weight: "600" },
  ],
  variable: "--font-general",
});
const dmMono = localFont({
  src: [
    { path: "./fonts/DMMono-400.woff2", weight: "400" },
    { path: "./fonts/DMMono-500.woff2", weight: "500" },
  ],
  variable: "--font-dm-mono",
  preload: false,
});

const descripcion = "Consultoría en Higiene, Seguridad y Medio Ambiente, sistemas de gestión integrados y gestión forestal sostenible en Argentina y Paraguay.";

export const metadata: Metadata = {
  metadataBase: new URL(sitio.url),
  title: { template: "%s | AN Asociados - Consultoría Almada Neri & Asociados", default: "AN Asociados - Consultoría Almada Neri & Asociados" },
  description: descripcion,
  keywords: ["higiene y seguridad", "medio ambiente", "gestión forestal sostenible", "sistemas de gestión integrados", "Almada Neri", "AN Asociados"],
  authors: [{ name: "AN Asociados" }],
  icons: { icon: "/assets/images/logo_almada_neri.png" },
  alternates: { canonical: "./" },
  openGraph: { type: "website", url: "./", description: descripcion, images: sitio.ogImagen, locale: "es_AR", siteName: "AN Asociados" },
  twitter: { card: "summary_large_image", images: sitio.ogImagen },
};

export const viewport: Viewport = { themeColor: "#0b1510" };

const organizacion = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AN Asociados",
  url: sitio.url,
  logo: `${sitio.url}/assets/images/logo_almada_neri.png`,
  description: descripcion,
  address: { "@type": "PostalAddress", streetAddress: "B° Industrial, calle Río Paraná S/N°", addressLocality: "Puerto Esperanza", addressRegion: "Misiones", addressCountry: "AR" },
  contactPoint: { "@type": "ContactPoint", telephone: "+54 9 3757 67-7124", contactType: "customer service", email: contacto.correoDestino },
  sameAs: ["https://www.facebook.com/anasociados", "https://www.twitter.com/anasociados", "https://www.linkedin.com/company/anasociados"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${archivo.variable} ${general.variable} ${dmMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Marca "motion" antes de pintar para ocultar lo que entra animado; si el JS no arranca en 3 s, se quita y todo queda visible */}
        <script dangerouslySetInnerHTML={{ __html: "if(matchMedia('(prefers-reduced-motion: no-preference)').matches){document.documentElement.classList.add('motion');setTimeout(function(){if(!window.__animado)document.documentElement.classList.remove('motion')},3000)}" }} />
      </head>
      <body className="min-h-screen">
        <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded focus:bg-marfil focus:px-4 focus:py-2 focus:text-noche">Saltar al contenido</a>
        <ScrollSuave />
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
        <WhatsApp />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizacion) }} />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-5P6G7KP4XY" strategy="afterInteractive" />
        <Script id="ga" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-5P6G7KP4XY');`}</Script>
      </body>
    </html>
  );
}
