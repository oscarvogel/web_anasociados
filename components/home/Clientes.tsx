"use client";

import Link from "next/link";
import { LogoLoop } from "@/components/rb/LogoLoop";
import { clientes } from "@/lib/datos";

const logos = clientes.clientes.map((c) => ({ src: c.logo, alt: c.alt }));

export default function Clientes() {
  return (
    <section id="clientes" className="bg-monte py-28 md:py-40" aria-labelledby="clientes-titulo">
      <div className="mx-auto grid max-w-[120rem] gap-8 px-4 md:grid-cols-12 md:items-end md:px-8">
        <h2 id="clientes-titulo" className="text-[clamp(2.1rem,4.4vw,4.25rem)] font-semibold leading-[1.04] tracking-[-0.03em] md:col-span-7">
          {clientes.tituloSeccion} <span className="text-liquen">{clientes.lema}</span>
        </h2>
        <p className="max-w-[48ch] leading-relaxed text-liquen md:col-span-4 md:col-start-9">{clientes.descripcion}</p>
      </div>

      <div className="clientes-loop mt-16 md:mt-24">
        <LogoLoop logos={logos} speed={45} hoverSpeed={8} gap={16} logoHeight={96} fadeOut fadeOutColor="#13211a" ariaLabel="Empresas clientes"
          renderItem={(item) => "src" in item && (
            <span className="grid h-24 w-44 place-items-center rounded-xl bg-marfil px-6 md:w-52">
              <img src={item.src} alt={item.alt} loading="lazy" decoding="async" className="max-h-14 w-auto max-w-full object-contain mix-blend-multiply" />
            </span>
          )} />
      </div>

      <div className="mx-auto mt-14 flex max-w-[120rem] flex-wrap gap-x-10 gap-y-4 px-4 md:px-8">
        <Link href="/clientes_destacados/" className="enlace">Ver los trabajos con nuestros clientes →</Link>
        <Link href="/contacto/" className="enlace">¿Sumamos a tu empresa a la lista? →</Link>
      </div>
    </section>
  );
}
