import Link from "next/link";
import Cifra from "@/components/Cifra";
import Foto from "@/components/Foto";
import Linterna from "@/components/Linterna";
import ScrollReveal from "@/components/rb/ScrollReveal";
import { enfoque } from "@/lib/datos";

export default function Enfoque() {
  return (
    <section id="enfoque" className="bg-noche py-28 md:py-40" aria-labelledby="enfoque-frase">
      <div className="mx-auto max-w-[120rem] px-4 md:px-8">
        <ScrollReveal id="enfoque-frase" className="max-w-[28ch] text-[clamp(1.9rem,4.4vw,4.25rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
          {`${enfoque.fraseA} ${enfoque.fraseB}`}
        </ScrollReveal>
        <p className="mt-8 max-w-[40ch] text-[clamp(1.125rem,1.8vw,1.5rem)] leading-snug text-liquen">{enfoque.fraseApagada}</p>

        <Linterna as="ul" className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-linea bg-linea md:mt-28 md:grid-cols-3">
          {enfoque.paneles.map((p) => (
            <li key={p.titulo} className="flex flex-col bg-noche p-5 md:p-6">
              <div className="aspect-[4/3] overflow-hidden rounded-lg">
                <Foto base={p.foto} alt={p.fotoAlt} anchos={[600, 1000, 1672]} sizes="(min-width: 768px) 33vw, 100vw" className={`h-full w-full object-cover ${p.posicion}`} />
              </div>
              <h3 className="mt-7 text-[clamp(1.5rem,2vw,1.875rem)] font-semibold leading-tight tracking-[-0.02em]">
                {p.titulo} <span className="text-liquen">{p.tituloHoja}</span>
              </h3>
              <p className="mb-8 mt-3 max-w-[40ch] leading-relaxed text-liquen">{p.texto}</p>
              <div className="mt-auto flex items-end justify-between gap-4 border-t border-linea pt-5">
                <p className="flex items-baseline gap-2">
                  <span className="font-display text-5xl font-semibold tracking-[-0.03em] tabular-nums [font-stretch:110%]">
                    <Cifra valor={p.valor} />{p.unidad === "+" && <span className="text-brasa">+</span>}
                  </span>
                  <span className="text-sm leading-tight text-liquen">{p.unidad !== "+" && <strong className="font-medium text-marfil">{p.unidad} </strong>}{p.descripcion}</span>
                </p>
                <Link href={p.enlace} aria-label={p.enlaceTexto} className="relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full border border-marfil/25 transition-colors duration-300 hover:border-brasa hover:bg-brasa hover:text-noche">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14m-6 6 6-6m-6-6 6 6" /></svg>
                </Link>
              </div>
            </li>
          ))}
        </Linterna>
      </div>
    </section>
  );
}
