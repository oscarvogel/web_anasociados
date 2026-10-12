"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useRef } from "react";
import Foto from "@/components/Foto";
import { servicios } from "@/lib/datos";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const total = String(servicios.length).padStart(2, "0");

// Capítulos a pantalla completa que se apilan (sticky): cada servicio tapa al anterior, que se aleja y se apaga
export default function Servicios() {
  const raiz = useRef<HTMLElement>(null);
  useGSAP(() => {
    gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
      const capitulos = gsap.utils.toArray<HTMLElement>(".capitulo", raiz.current);
      capitulos.slice(0, -1).forEach((c, i) => {
        gsap.to(c.querySelector(".capitulo-cuadro"), {
          scale: 0.9, filter: "brightness(0.35)", ease: "none",
          scrollTrigger: { trigger: capitulos[i + 1], start: "top bottom", end: "top top", scrub: true },
        });
      });
    });
  }, { scope: raiz });

  return (
    <section ref={raiz} id="servicios" className="bg-noche" aria-labelledby="servicios-titulo">
      <div className="mx-auto flex max-w-[120rem] flex-col gap-8 px-4 pb-16 pt-28 md:flex-row md:items-end md:justify-between md:px-8 md:pb-20 md:pt-40">
        <h2 id="servicios-titulo" className="max-w-[18ch] text-[clamp(2.1rem,5.2vw,5rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
          Servicios de consultoría <span className="text-liquen">con más de 13 años de experiencia.</span>
        </h2>
        <Link href="/servicios/" className="enlace shrink-0">Ver el detalle de cada servicio →</Link>
      </div>

      <ol>
        {servicios.map((s, i) => (
          <li key={s.slug} className="capitulo sticky top-0 h-svh overflow-hidden not-last:mb-[50svh]">
            <article className="capitulo-cuadro relative isolate flex h-full origin-top flex-col justify-end will-change-transform">
              <Foto base={s.foto} alt={s.fotoAlt} anchos={[828, 1122]} sizes="100vw" className="absolute inset-0 -z-20 h-full w-full object-cover" />
              <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,var(--color-noche)_5%,rgb(11_21_16/0.65)_40%,rgb(11_21_16/0.15)_75%)]" />
              <div className="mx-auto grid w-full max-w-[120rem] gap-6 px-4 pb-12 md:grid-cols-12 md:items-end md:px-8 md:pb-16">
                <div className="md:col-span-8">
                  <p className="dato text-liquen"><span className="text-brasa">{String(i + 1).padStart(2, "0")}</span> / {total}</p>
                  <h3 className="mt-4 max-w-[18ch] text-[clamp(2.25rem,5.6vw,5.5rem)] font-semibold leading-[1.02] tracking-[-0.035em]">{s.titulo}</h3>
                </div>
                <div className="md:col-span-4">
                  <p className="max-w-[40ch] text-lg leading-relaxed text-marfil/85">{s.descripcion}</p>
                  <Link href={`/servicios/#${s.slug}`} className="btn-brasa mt-6">Ver servicio</Link>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
