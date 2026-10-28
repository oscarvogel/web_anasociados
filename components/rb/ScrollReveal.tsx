"use client";
// Adaptado de React Bits "ScrollReveal" (reactbits.dev, MIT + Commons Clause). Cambios: un solo elemento con el nivel de título que se elija
// (el original anida <p> en <h2>), limpieza solo de sus propios ScrollTrigger (useGSAP) y nada de movimiento con "reducir movimiento".

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = {
  children: string;
  as?: "h2" | "h3" | "p";
  id?: string;
  className?: string;
  baseOpacity?: number;
  blurStrength?: number;
  baseRotation?: number;
};

export default function ScrollReveal({ children, as: Tag = "h2", id, className = "", baseOpacity = 0.15, blurStrength = 4, baseRotation = 2 }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
      const el = ref.current!;
      const palabras = el.querySelectorAll<HTMLElement>(".palabra");
      const tramo = { trigger: el, start: "top bottom-=15%", end: "bottom center", scrub: true };
      gsap.fromTo(el, { transformOrigin: "0% 50%", rotate: baseRotation }, { rotate: 0, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom center", scrub: true } });
      gsap.fromTo(palabras, { opacity: baseOpacity, filter: `blur(${blurStrength}px)` }, { opacity: 1, filter: "blur(0px)", ease: "none", stagger: 0.05, scrollTrigger: tramo });
    });
  }, { scope: ref });

  return (
    <Tag ref={ref} id={id} className={className}>
      {children.split(/(\s+)/).map((p, i) => (/^\s+$/.test(p) ? p : <span key={i} className="palabra inline-block">{p}</span>))}
    </Tag>
  );
}
