import Link from "next/link";
import ScrollReveal from "@/components/rb/ScrollReveal";
import { enfoque } from "@/lib/datos";

export default function Enfoque() {
  return (
    <section id="enfoque" className="bg-noche pb-8 pt-28 md:pb-12 md:pt-44" aria-labelledby="enfoque-frase">
      <div className="mx-auto max-w-[120rem] px-4 md:px-8">
        <ScrollReveal id="enfoque-frase" className="max-w-[24ch] text-[clamp(2.1rem,5.2vw,5rem)] font-semibold leading-[1.04] tracking-[-0.035em]">
          {`${enfoque.fraseA} ${enfoque.fraseB}`}
        </ScrollReveal>

        <ul className="mt-20 grid gap-10 md:mt-32 md:grid-cols-3 md:gap-8">
          {enfoque.paneles.map((p) => (
            <li key={p.titulo} className="border-t border-marfil/20 pt-6">
              <h3 className="text-[clamp(1.5rem,2.2vw,2rem)] font-semibold leading-tight tracking-[-0.02em]">
                {p.titulo} <span className="text-liquen">{p.tituloHoja}</span>
              </h3>
              <p className="mt-4 max-w-[38ch] leading-relaxed text-liquen">{p.texto}</p>
              <Link href={p.enlace} className="enlace mt-6 inline-block text-sm">{p.enlaceTexto} →</Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
