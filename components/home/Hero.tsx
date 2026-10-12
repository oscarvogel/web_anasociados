"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useRef } from "react";
import Foto from "@/components/Foto";
import SplitText from "@/components/rb/SplitText";
import { hero } from "@/lib/datos";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Hero() {
  const raiz = useRef<HTMLElement>(null);

  // Entrada de cámara lenta sobre la foto y salida con parallax al scrollear
  useGSAP(() => {
    gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(".hero-foto", { scale: 1.14, duration: 2.6, ease: "expo.out" });
      (window as Window & { __animado?: boolean }).__animado = true;
      gsap.fromTo(".hero-entra", { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.08, ease: "expo.out", delay: 0.5 });
      gsap.to(".hero-foto", { yPercent: 12, ease: "none", scrollTrigger: { trigger: raiz.current, start: "top top", end: "bottom top", scrub: true } });
    });
  }, { scope: raiz });

  return (
    <section ref={raiz} id="inicio" className="relative isolate flex min-h-svh flex-col overflow-hidden" aria-labelledby="hero-titulo">
      <div className="hero-foto absolute inset-0 -z-20">
        <Foto base="/assets/images/hero" anchos={[828, 1280, 1672]} sizes="100vw" prioridad className="h-full w-full object-cover object-[62%_50%]"
          alt="Casco de seguridad con el logo de AN Asociados, guantes y planos sobre un tronco, con un bosque y maquinaria forestal al atardecer" />
      </div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,var(--color-noche)_4%,rgb(11_21_16/0.7)_38%,rgb(11_21_16/0.1)_70%),linear-gradient(to_bottom,rgb(11_21_16/0.55),transparent_22%)]" />

      <div className="mx-auto mt-auto w-full max-w-[120rem] px-4 pt-32 md:px-8">
        <div className="grid items-end gap-8 md:grid-cols-12">
          <h1 id="hero-titulo" className="hero-entra text-[clamp(1.85rem,3.4vw,3.25rem)] font-semibold leading-[1.06] tracking-[-0.03em] md:col-span-7">
            <span className="text-liquen">{hero.intro} </span>{hero.titulo}<span className="text-brasa">.</span>
          </h1>
          <div className="hero-entra md:col-span-4 md:col-start-9">
            <p className="max-w-[44ch] leading-relaxed text-marfil/85">{hero.descripcion}</p>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Link href={hero.cta.url} className="btn-brasa">{hero.cta.texto}</Link>
              <a href={hero.secundario.url} className="enlace">{hero.secundario.texto}</a>
            </div>
          </div>
        </div>

        <SplitText text={hero.marca} tag="p" ariaHidden mask="chars" splitType="chars" delay={35} duration={1.1} ease="expo.out" from={{ yPercent: 110 }} to={{ yPercent: 0 }} threshold={0} rootMargin="0px"
          className="hero-marca mt-10 block w-full whitespace-nowrap font-display text-[calc((min(100vw,120rem)-2rem)/9.85)] font-bold uppercase leading-[0.8] tracking-[-0.02em] text-marfil [font-stretch:125%] md:mt-14 md:text-[calc((min(100vw,120rem)-4rem)/9.85)]" />

        <p className="dato hero-entra mt-6 border-t border-marfil/20 py-4 text-liquen md:mt-8">Puerto Esperanza, Misiones · Argentina / Paraguay</p>
      </div>
    </section>
  );
}
