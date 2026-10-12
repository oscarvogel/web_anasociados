"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { hero, navegacion } from "@/lib/datos";

export default function Header() {
  const [abierto, setAbierto] = useState(false);
  const [activo, setActivo] = useState<string | null>(null);
  const [scrolleado, setScrolleado] = useState(false);
  const boton = useRef<HTMLButtonElement>(null);
  const ruta = usePathname();

  useEffect(() => {
    const alScroll = () => setScrolleado(scrollY > 24);
    alScroll();
    addEventListener("scroll", alScroll, { passive: true });
    return () => removeEventListener("scroll", alScroll);
  }, []);

  useEffect(() => {
    if (!abierto) return;
    const alTecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setAbierto(false); boton.current?.focus(); }
    };
    addEventListener("keydown", alTecla);
    return () => removeEventListener("keydown", alTecla);
  }, [abierto]);

  // Sección activa en la navegación (solo en la home)
  useEffect(() => {
    if (ruta !== "/") return setActivo(null);
    const io = new IntersectionObserver(
      (entradas) => entradas.forEach((en) => en.isIntersecting && setActivo(en.target.id)),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    navegacion.forEach((n) => { const s = document.getElementById(n.url.split("#")[1]); if (s) io.observe(s); });
    return () => io.disconnect();
  }, [ruta]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter] duration-500 ${scrolleado || abierto ? "bg-noche/85 backdrop-blur-md" : "bg-[linear-gradient(to_bottom,rgb(11_21_16/0.7),transparent)]"}`}>
      <div className="mx-auto flex h-16 max-w-[120rem] items-center justify-between gap-4 px-4 md:h-20 md:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="AN Asociados, inicio">
          <img src="/assets/images/logo_almada_neri.png" alt="" width={36} height={36} className="h-9 w-auto" />
          <span className="rotulo text-[0.8125rem] text-marfil">AN Asociados</span>
        </Link>

        <nav aria-label="Principal" className="hidden h-11 items-stretch rounded-full border border-marfil/15 bg-noche/40 p-1 backdrop-blur-sm lg:flex">
          {navegacion.map((n) => (
            <Link key={n.url} href={n.url} className="nav-item" aria-current={activo === n.url.split("#")[1] ? "true" : undefined}>
              {n.title}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href={hero.portal.url} target="_blank" rel="noopener" className="enlace hidden px-3 text-sm lg:block">{hero.portal.texto}</a>
          <Link href={hero.contacto.url} className="btn-brasa hidden lg:inline-flex">{hero.contacto.texto}</Link>
          <button
            ref={boton}
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-marfil/30 bg-noche/50 backdrop-blur-sm lg:hidden"
            aria-expanded={abierto}
            aria-controls="menu-movil"
            aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setAbierto(!abierto)}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" viewBox="0 0 24 24" aria-hidden="true">
              <path d={abierto ? "M6 6l12 12M18 6 6 18" : "M4 9h16M4 15h16"} />
            </svg>
          </button>
        </div>
      </div>

      <nav id="menu-movil" aria-label="Principal (móvil)" hidden={!abierto} className="border-t border-linea px-4 pb-6 lg:hidden" onClick={(e) => (e.target as HTMLElement).closest("a") && setAbierto(false)}>
        <ul className="grid">
          {navegacion.map((n) => (
            <li key={n.url} className="border-b border-linea">
              <Link href={n.url} className="rotulo block py-4 text-lg">{n.title}</Link>
            </li>
          ))}
          <li className="border-b border-linea"><a href={hero.portal.url} target="_blank" rel="noopener" className="rotulo block py-4 text-lg">{hero.portal.texto}</a></li>
        </ul>
        <Link href={hero.contacto.url} className="btn-brasa mt-6">{hero.contacto.texto}</Link>
      </nav>
    </header>
  );
}
