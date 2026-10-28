"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Cifra que cuenta hasta su valor al entrar en pantalla. El HTML ya trae el valor final (SEO, sin JS, reducir movimiento).
export default function Cifra({ valor, className }: { valor: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useGSAP(() => {
    gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
      const el = ref.current!;
      const o = { v: 0 };
      gsap.to(o, {
        v: valor, duration: 1.6, ease: "power2.out", snap: { v: 1 },
        onStart: () => { el.textContent = "0"; },
        onUpdate: () => { el.textContent = String(o.v); },
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      });
      return () => { el.textContent = String(valor); };
    });
  }, { scope: ref });
  return <span ref={ref} className={className}>{valor}</span>;
}
