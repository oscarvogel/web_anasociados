"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { TopographyProps } from "@/components/rb/Topography";

const Topography = dynamic(() => import("@/components/rb/Topography"), { ssr: false });

// Curvas de nivel del plano. En celulares o con "reducir movimiento" se dibuja un solo cuadro, sin animación.
export default function Curvas(props: Omit<TopographyProps, "animado">) {
  const [animado, setAnimado] = useState<boolean | null>(null);
  useEffect(() => {
    const mq = matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)");
    const leer = () => setAnimado(mq.matches);
    leer();
    mq.addEventListener("change", leer);
    return () => mq.removeEventListener("change", leer);
  }, []);
  if (animado === null) return null;
  return <Topography key={String(animado)} {...props} animado={animado} />;
}
