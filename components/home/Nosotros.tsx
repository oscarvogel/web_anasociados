import Link from "next/link";
import Cifra from "@/components/Cifra";
import Foto from "@/components/Foto";
import { nosotros } from "@/lib/datos";

export default function Nosotros() {
  return (
    <section id="nosotros" className="relative isolate overflow-hidden py-28 md:py-40" aria-labelledby="nosotros-titulo">
      <Foto base={nosotros.foto} alt="" anchos={[960, 1440, 1916]} sizes="100vw" className="absolute inset-0 -z-20 h-full w-full object-cover" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,var(--color-noche),rgb(11_21_16/0.78)_35%,rgb(11_21_16/0.85)_70%,var(--color-noche))]" />

      <div className="mx-auto max-w-[120rem] px-4 md:px-8">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <h2 id="nosotros-titulo" className="text-[clamp(2.1rem,4.6vw,4.5rem)] font-semibold leading-[1.04] tracking-[-0.03em] md:col-span-7">
            {nosotros.titulo} <span className="text-liquen">{nosotros.tituloApagado}</span>
          </h2>
          <div className="md:col-span-4 md:col-start-9">
            <p className="max-w-[46ch] leading-relaxed text-marfil/85">{nosotros.descripcion}</p>
            <Link href={nosotros.boton.url} className="btn-brasa mt-8">{nosotros.boton.texto}</Link>
          </div>
        </div>

        <ul className="mt-20 grid grid-cols-2 border border-marfil/20 bg-noche/50 backdrop-blur-sm md:mt-28 lg:grid-cols-4">
          {nosotros.cifras.map((c, i) => (
            <li key={c.descripcion} className={`p-5 md:p-7 ${i % 2 ? "border-l border-marfil/20" : ""} ${i > 1 ? "border-t border-marfil/20 lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""}`}>
              <p className="font-display text-[clamp(2.75rem,5.5vw,5rem)] font-semibold leading-none tracking-[-0.03em] tabular-nums [font-stretch:110%]">
                <Cifra valor={c.valor} /><span className="text-brasa">{c.sufijo}</span>
              </p>
              <p className="mt-3 max-w-[22ch] text-[0.9375rem] leading-snug text-liquen">{c.descripcion}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
