"use client";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useState } from "react";
import ScrollExpand from "@/components/rb/ScrollExpand";
import { enfoque, hero } from "@/lib/datos";

const foto = enfoque.paneles[2];

// Momento firma: la foto aérea de parcelas sale de un cuadro chico y llena la pantalla con la frase
export default function Territorio() {
  const [quieto, setQuieto] = useState(false);
  useEffect(() => setQuieto(matchMedia("(prefers-reduced-motion: reduce)").matches), []);
  // ScrollExpand fija su altura al montarse: lo que está debajo (los capítulos de Servicios) se vuelve a medir después
  useEffect(() => { ScrollTrigger.refresh(); }, [quieto]);
  return (
    <section aria-label="Alcance" className="bg-noche">
      <ScrollExpand key={String(quieto)} useWindowScroll enabled={!quieto} scrollDistance={quieto ? 0 : 1.1} holdDistance={quieto ? 0 : 0.5}
        src={`${foto.foto}-1672.webp`} alt={foto.fotoAlt} title={hero.etiqueta} startWidth={38} startHeight={52} startRadius={16} mediaZoom={1.25} overlayScrim={0.75}
        className="font-display [--se-title-size:clamp(1.75rem,3.6vw,3.5rem)]">
        <p className="max-w-[22ch] text-[clamp(2rem,5vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-marfil">{enfoque.fraseApagada}</p>
      </ScrollExpand>
    </section>
  );
}
