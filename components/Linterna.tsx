"use client";
// Brillo de borde que sigue al puntero, tomado de la idea de React Bits "Magic Bento" (spotlight global + borde): como una linterna sobre el plano.
// Solo el borde y un halo leve; sin partículas, inclinación ni imán. Cada hijo directo recibe --lx/--ly relativos a sí mismo.
import { useEffect, useRef } from "react";

export default function Linterna({ className = "", children, as: Tag = "div" }: { className?: string; children: React.ReactNode; as?: "div" | "ul" }) {
  const ref = useRef<HTMLDivElement & HTMLUListElement>(null);
  useEffect(() => {
    const raiz = ref.current!;
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let cuadro = 0;
    const mover = (e: PointerEvent) => {
      cancelAnimationFrame(cuadro);
      cuadro = requestAnimationFrame(() => {
        for (const hijo of raiz.children as HTMLCollectionOf<HTMLElement>) {
          const r = hijo.getBoundingClientRect();
          hijo.style.setProperty("--lx", `${e.clientX - r.left}px`);
          hijo.style.setProperty("--ly", `${e.clientY - r.top}px`);
        }
      });
    };
    const salir = () => { for (const hijo of raiz.children as HTMLCollectionOf<HTMLElement>) hijo.style.removeProperty("--lx"); };
    raiz.addEventListener("pointermove", mover);
    raiz.addEventListener("pointerleave", salir);
    return () => { cancelAnimationFrame(cuadro); raiz.removeEventListener("pointermove", mover); raiz.removeEventListener("pointerleave", salir); };
  }, []);
  return <Tag ref={ref} className={`linterna ${className}`}>{children}</Tag>;
}
