import Link from "next/link";
import Cifra from "@/components/Cifra";
import { nosotros } from "@/lib/datos";

export default function Nosotros() {
  return (
    <section id="nosotros" className="bg-noche py-28 md:py-44" aria-labelledby="nosotros-titulo">
      <div className="mx-auto max-w-[120rem] px-4 md:px-8">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <h2 id="nosotros-titulo" className="text-[clamp(2.1rem,5.2vw,5rem)] font-semibold leading-[1.02] tracking-[-0.035em] md:col-span-7">
            {nosotros.titulo} <span className="text-liquen">{nosotros.tituloApagado}</span>
          </h2>
          <div className="md:col-span-4 md:col-start-9">
            <p className="max-w-[46ch] leading-relaxed text-marfil/85">{nosotros.descripcion}</p>
            <Link href={nosotros.boton.url} className="btn-brasa mt-8">{nosotros.boton.texto}</Link>
          </div>
        </div>

        <ul className="mt-20 grid grid-cols-2 gap-x-6 gap-y-14 md:mt-32 lg:grid-cols-4">
          {nosotros.cifras.map((c) => (
            <li key={c.descripcion} className="border-t border-marfil/20 pt-5">
              <p className="font-display text-[clamp(4.5rem,10vw,9.5rem)] font-semibold leading-[0.85] tracking-[-0.05em] tabular-nums">
                <Cifra valor={c.valor} /><span className="text-brasa">{c.sufijo}</span>
              </p>
              <p className="mt-4 max-w-[22ch] text-[0.9375rem] leading-snug text-liquen">{c.descripcion}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
