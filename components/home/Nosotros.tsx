import Cifra from "@/components/Cifra";
import ScrollReveal from "@/components/rb/ScrollReveal";
import { nosotros } from "@/lib/datos";

// Presentación centrada que pasa de gris a tinta con el scroll, y las cifras debajo
export default function Nosotros() {
  return (
    <section id="nosotros" className="py-28 md:py-44" aria-labelledby="nosotros-titulo">
      <div className="mx-auto max-w-[120rem] px-4 text-center md:px-8">
        <p className="dato text-salvia">{nosotros.etiqueta}</p>
        <ScrollReveal id="nosotros-titulo" baseOpacity={0.18} blurStrength={0} baseRotation={0}
          className="mx-auto mt-6 max-w-[32ch] text-[clamp(1.75rem,3.6vw,3.25rem)] font-medium leading-[1.15] tracking-[-0.025em]">
          {nosotros.presentacion}
        </ScrollReveal>
        <p className="mx-auto mt-10 max-w-[42ch] text-[clamp(1.25rem,2vw,1.75rem)] leading-snug tracking-[-0.01em] text-salvia">{nosotros.cierre}</p>

        <ul className="mx-auto mt-20 grid max-w-[80rem] grid-cols-2 gap-x-6 gap-y-12 text-left md:mt-28 lg:grid-cols-4">
          {nosotros.cifras.map((c) => (
            <li key={c.descripcion} className="border-t border-linea pt-5">
              <p className="font-display text-[clamp(3rem,6vw,5.5rem)] font-semibold leading-[0.9] tracking-[-0.04em] tabular-nums">
                <Cifra valor={c.valor} /><span className="text-brasa">{c.sufijo}</span>
              </p>
              <p className="mt-3 max-w-[22ch] text-[0.9375rem] leading-snug text-salvia">{c.descripcion}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
