import Link from "next/link";
import { contacto, hero, navegacion } from "@/lib/datos";

export default function Footer() {
  const enlaces = contacto.datos.filter((d) => d.enlace);
  return (
    <footer className="border-t border-linea bg-noche pt-20 md:pt-28">
      <div className="mx-auto max-w-[120rem] px-4 md:px-8">
        <p className="max-w-[20ch] font-display text-[clamp(2rem,4.4vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.03em] [font-stretch:112%]">
          Liderando el camino <span className="text-musgo">hacia un futuro más seguro, sostenible y resiliente.</span>
        </p>

        <div className="mt-16 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3" aria-label="AN Asociados, inicio">
              <img src="/assets/images/logo_almada_neri.png" alt="" width={40} height={40} className="h-10 w-auto" />
              <span className="rotulo text-sm">AN Asociados</span>
            </Link>
            <p className="mt-4 max-w-[36ch] text-[0.9375rem] leading-relaxed text-liquen">Higiene, seguridad, medio ambiente y gestión forestal sostenible en Argentina y Paraguay.</p>
          </div>
          <nav className="md:col-span-3" aria-label="Secciones">
            <h2 className="dato text-liquen">Secciones</h2>
            <ul className="mt-4 grid gap-2">
              {navegacion.map((n) => <li key={n.url}><Link href={n.url} className="enlace">{n.title}</Link></li>)}
              <li><Link href="/servicios/" className="enlace">Detalle de servicios</Link></li>
            </ul>
          </nav>
          <div className="md:col-span-4">
            <h2 className="dato text-liquen">Contacto</h2>
            <ul className="mt-4 grid gap-2">
              {enlaces.map((d) => <li key={d.texto}><a href={d.enlace} className="enlace">{d.texto}</a></li>)}
              <li><a href={contacto.whatsapp} target="_blank" rel="noopener" className="enlace">WhatsApp</a></li>
              <li><a href={hero.portal.url} target="_blank" rel="noopener" className="enlace">{hero.portal.texto}</a></li>
            </ul>
          </div>
        </div>

        {/* Cajetín: el rótulo que cierra todo plano técnico */}
        <div className="dato mt-16 grid border border-linea text-liquen sm:grid-cols-[1fr_auto_auto] [&>*]:px-4 [&>*]:py-3 [&>*+*]:border-linea [&>*+*]:max-sm:border-t sm:[&>*+*]:border-l">
          <p>© 2026 AN Asociados · Puerto Esperanza, Misiones · AR / PY</p>
          <Link href="/politicas/" className="enlace">Política de privacidad</Link>
          <a href="#contenido" className="enlace">Volver arriba ↑</a>
        </div>
        <div className="h-24" />
      </div>
    </footer>
  );
}
