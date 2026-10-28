"use client";

import Link from "next/link";
import { useState } from "react";
import { LogoLoop } from "@/components/rb/LogoLoop";
import { clientes } from "@/lib/datos";

const logos = clientes.clientes.map((c) => ({ src: c.logo, alt: c.alt }));

export default function Clientes() {
  // WCAG 2.2.2: lo que se mueve solo necesita un control para detenerlo
  const [pausada, setPausada] = useState(false);
  return (
    <section id="clientes" className="py-28 md:py-40" aria-labelledby="clientes-titulo">
      <div className="mx-auto max-w-[120rem] px-4 text-center md:px-8">
        <p className="dato text-salvia">{clientes.etiqueta}</p>
        <h2 id="clientes-titulo" className="mx-auto mt-6 max-w-[22ch] text-[clamp(2rem,4.4vw,4rem)] font-semibold leading-[1.04] tracking-[-0.03em]">
          {clientes.tituloSeccion}, <span className="text-salvia">{clientes.lema}</span>
        </h2>
      </div>

      <div className="clientes-loop mt-16 md:mt-24">
        <LogoLoop logos={logos} speed={pausada ? 0 : 45} hoverSpeed={pausada ? 0 : 8} gap={16} logoHeight={96} fadeOut fadeOutColor="#ece9dc" ariaLabel="Empresas clientes"
          renderItem={(item) => "src" in item && (
            <span className="grid h-24 w-44 place-items-center rounded-xl border border-linea bg-papel px-6 md:w-52">
              <img src={item.src} alt={item.alt} loading="lazy" decoding="async" className="max-h-14 w-auto max-w-full object-contain mix-blend-multiply" />
            </span>
          )} />
        <button type="button" aria-pressed={pausada} onClick={() => setPausada(!pausada)}
          className="dato mx-auto mt-6 flex min-h-11 items-center rounded-full border border-linea px-4 text-salvia transition-colors hover:border-noche hover:text-noche motion-reduce:hidden">
          {pausada ? "Reanudar logos" : "Pausar logos"}
        </button>
      </div>

      <div className="mx-auto mt-14 flex max-w-[120rem] flex-wrap justify-center gap-x-10 gap-y-4 px-4 md:px-8">
        <Link href="/clientes_destacados/" className="enlace">Ver los trabajos con nuestros clientes →</Link>
        <Link href="/contacto/" className="enlace">¿Sumamos a tu empresa a la lista? →</Link>
      </div>
    </section>
  );
}
