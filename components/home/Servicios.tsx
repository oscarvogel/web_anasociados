"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useRef } from "react";
import Foto from "@/components/Foto";
import { servicios } from "@/lib/datos";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Grilla de dos columnas; con cantidad impar, el último servicio ocupa todo el ancho
const ancho = (i: number) => i === servicios.length - 1 && servicios.length % 2 === 1;

export default function Servicios() {
  const raiz = useRef<HTMLElement>(null);

  // Cada foto entra apagada y algo más chica, y se aclara al llegar a pantalla
  useGSAP(() => {
    gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
      gsap.set(".servicio-foto", { filter: "brightness(0.55)", scale: 0.96 });
      ScrollTrigger.batch(".servicio-foto", {
        start: "top 88%",
        once: true,
        onEnter: (lote) => gsap.to(lote, { filter: "brightness(1)", scale: 1, duration: 1.1, ease: "expo.out", stagger: 0.08 }),
      });
    });
  }, { scope: raiz });

  return (
    <section ref={raiz} id="servicios" className="py-28 md:py-40" aria-labelledby="servicios-titulo">
      <div className="mx-auto max-w-[120rem] px-4 md:px-8">
        <div className="text-center">
          <p className="dato text-salvia">[02] · Servicios</p>
          <h2 id="servicios-titulo" className="mx-auto mt-6 max-w-[22ch] text-[clamp(2rem,4.4vw,4rem)] font-semibold leading-[1.04] tracking-[-0.03em]">
            Servicios para trabajar seguro <span className="text-salvia">en el monte y en la planta.</span>
          </h2>
        </div>

        <ul className="mt-16 grid gap-x-6 gap-y-14 md:mt-24 md:grid-cols-2">
          {servicios.map((s, i) => (
            <li key={s.slug} className={ancho(i) ? "md:col-span-2" : undefined}>
              <Link href={`/servicios/#${s.slug}`} className="group block rounded-2xl transition-transform duration-150 active:scale-[0.99]">
                <div className={`servicio-foto overflow-hidden rounded-2xl will-change-transform ${ancho(i) ? "aspect-[4/3] md:aspect-[21/9]" : "aspect-[4/3]"}`}>
                  <Foto base={s.foto} alt={s.fotoAlt} anchos={[560, 828, 1122]} sizes={ancho(i) ? "100vw" : "(min-width: 768px) 50vw, 100vw"}
                    className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-salida)] group-hover:scale-[1.03]" />
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-4">
                  <h3 className="text-lg font-medium leading-snug underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-brasa group-focus-visible:decoration-brasa">{s.titulo}</h3>
                  <span className="dato shrink-0 text-salvia">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <p className="mt-1 max-w-[52ch] text-[0.9375rem] leading-relaxed text-salvia">{s.descripcion}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
