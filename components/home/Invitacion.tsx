"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useRef } from "react";
import Foto from "@/components/Foto";
import { contacto } from "@/lib/datos";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Cierre de la home: tarjeta con la foto del hero, que vuelve como el cielo al final de la referencia
export default function Invitacion() {
  const raiz = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(".invitacion-foto", { yPercent: -8 }, { yPercent: 8, ease: "none", scrollTrigger: { trigger: raiz.current, start: "top bottom", end: "bottom top", scrub: true } });
    });
  }, { scope: raiz });

  return (
    <section ref={raiz} id="contacto" className="px-4 pb-4 md:px-8 md:pb-8" aria-labelledby="invitacion-titulo">
      <div className="relative isolate mx-auto max-w-[120rem] overflow-hidden rounded-3xl text-marfil">
        <div className="invitacion-foto absolute inset-x-0 -top-[10%] -z-20 h-[120%]">
          <Foto base="/assets/images/inicio" anchos={[828, 1280, 1806]} sizes="100vw" alt="" className="h-full w-full object-cover object-[85%_60%]" />
        </div>
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_75%_at_50%_45%,rgb(11_21_16/0.7),rgb(11_21_16/0.4))]" />

        <div className="flex flex-col items-center px-6 py-24 text-center md:py-36">
          <p className="dato">{contacto.etiqueta}</p>
          <p className="mt-6 text-[clamp(1.5rem,3vw,2.5rem)] font-semibold tracking-[-0.02em] text-marfil/75">{contacto.pregunta}</p>
          <h2 id="invitacion-titulo" className="mt-3 max-w-[20ch] text-[clamp(2rem,4.6vw,4.25rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
            {contacto.titulo} {contacto.tituloApagado}
          </h2>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
            <Link href="/contacto/" className="btn-brasa">Pedir una consulta</Link>
            <a href={contacto.whatsapp} target="_blank" rel="noopener noreferrer" className="enlace">Escribir por WhatsApp</a>
          </div>
        </div>
      </div>
    </section>
  );
}
