"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useRef } from "react";
import Foto from "@/components/Foto";
import { hero } from "@/lib/datos";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Cada palabra dentro de una máscara para que suba desde su renglón
const palabras = (texto: string) =>
  texto.split(" ").map((p, i) => (
    <span key={i}>
      {i > 0 && " "}
      <span className="inline-block overflow-hidden pb-[0.1em] align-bottom">
        <span className="hero-palabra inline-block">{p}</span>
      </span>
    </span>
  ));

export default function Hero() {
  const raiz = useRef<HTMLElement>(null);

  // El casco sube grande desde abajo, se achica hasta su hueco en el titular y después entran las letras
  useGSAP(() => {
    gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
      (window as Window & { __animado?: boolean }).__animado = true;
      const casco = raiz.current!.querySelector<HTMLElement>(".hero-casco")!;
      const r = casco.getBoundingClientRect();
      const escala = Math.min(4, (innerWidth * 0.6) / r.width);
      const x = innerWidth / 2 - (r.left + r.width / 2);
      const centro = r.top + r.height / 2;

      gsap.timeline({ defaults: { ease: "expo.out" } })
        .from(".hero-foto", { scale: 1.14, duration: 2.6 }, 0)
        .fromTo(casco, { autoAlpha: 1, x, y: innerHeight + (r.height * escala) / 2 - centro, scale: escala, rotation: -8 },
          { y: innerHeight * 0.58 - centro, rotation: -3, duration: 0.75 }, 0.1)
        // ">": relativo al tramo anterior; "-=" contaría desde el final de la foto (2.6 s) y dejaba al casco esperando
        .to(casco, { x: 0, y: 0, scale: 1, rotation: 0, duration: 0.7, ease: "power3.inOut" }, ">-0.4")
        .fromTo(".hero-palabra", { autoAlpha: 1, yPercent: 110 }, { yPercent: 0, duration: 0.9, stagger: 0.04 }, ">-0.3")
        .fromTo(".hero-entra", { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.08 }, ">-0.7");

      gsap.to(".hero-foto", { yPercent: 12, ease: "none", scrollTrigger: { trigger: raiz.current, start: "top top", end: "bottom top", scrub: true } });
    });
  }, { scope: raiz });

  return (
    <section ref={raiz} id="inicio" className="relative isolate flex min-h-svh flex-col overflow-hidden text-marfil" aria-labelledby="hero-titulo">
      <div className="hero-foto absolute inset-0 -z-20">
        <Foto base="/assets/images/inicio" anchos={[828, 1280, 1806]} sizes="100vw" prioridad className="h-full w-full object-cover object-[80%_50%] md:object-center"
          alt="Bosque de pinos y una cosechadora forestal trabajando al atardecer" />
      </div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_75%_65%_at_50%_45%,rgb(11_21_16/0.72),rgb(11_21_16/0.4)_60%,transparent),linear-gradient(to_bottom,rgb(11_21_16/0.5),rgb(11_21_16/0.15)_60%,rgb(11_21_16/0.25)_80%,transparent)]" />
      {/* La foto se funde con el fondo de la página, como el cielo de la referencia */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-[22%] bg-[linear-gradient(to_bottom,transparent,var(--color-marfil))]" />

      <div className="mx-auto flex w-full max-w-[120rem] flex-col items-center px-4 pb-20 pt-28 text-center md:px-8 md:pt-32">
        <p className="dato hero-entra rounded-full border border-marfil/30 bg-noche/25 px-3 py-1.5 backdrop-blur-sm">{hero.etiqueta}</p>

        <h1 id="hero-titulo" className="mt-7 max-w-[17ch] text-[clamp(2.4rem,min(5.4vw,9svh),5.5rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
          {palabras(hero.antes)}{" "}
          <Foto base="/assets/images/casco" anchos={[240, 480, 960]} sizes="(min-width: 768px) 480px, 240px" prioridad alt=""
            className="hero-casco relative z-10 inline-block h-[0.95em] w-auto align-[-0.08em] drop-shadow-[0_10px_20px_rgb(11_21_16/0.35)]" />{" "}
          {palabras(hero.despues)}
        </h1>

        <p className="hero-entra mt-7 max-w-[46ch] text-[1.0625rem] leading-relaxed [text-shadow:0_1px_12px_rgb(11_21_16/0.6)]">{hero.descripcion}</p>
        <div className="hero-entra mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
          <Link href={hero.cta.url} className="btn-brasa">{hero.cta.texto}</Link>
          <a href={hero.secundario.url} className="enlace">{hero.secundario.texto}</a>
        </div>
      </div>
    </section>
  );
}
