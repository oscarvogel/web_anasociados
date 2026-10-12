import Link from "next/link";
import Foto from "@/components/Foto";
import { articulos, formatoFecha } from "@/lib/datos";

export default function Articulos() {
  return (
    <section id="articulos" className="bg-noche py-28 md:py-40" aria-labelledby="articulos-titulo">
      <div className="mx-auto max-w-[120rem] px-4 md:px-8">
        <h2 id="articulos-titulo" className="max-w-[20ch] text-[clamp(2.1rem,4.4vw,4.25rem)] font-semibold leading-[1.04] tracking-[-0.03em]">
          Artículos recientes <span className="text-liquen">sobre seguridad y prevención.</span>
        </h2>

        <ul className="mt-14 border-t border-linea md:mt-20">
          {articulos.map((a) => {
            const fila = (
              <>
                <span className="block aspect-[4/3] w-full overflow-hidden rounded-lg md:w-36">
                  <Foto base={a.foto} alt="" anchos={[600, 1000]} sizes="(min-width: 768px) 9rem, 100vw" className="h-full w-full object-cover" />
                </span>
                <time dateTime={a.date} className="dato text-liquen">{formatoFecha(a.date)}</time>
                <span>
                  <span className="block font-display text-[clamp(1.25rem,2vw,1.75rem)] font-semibold leading-tight tracking-[-0.02em]">{a.title}</span>
                  <span className="mt-1.5 block text-liquen">{a.excerpt}</span>
                </span>
                <span className={`dato ${a.publicado ? "text-brasa" : "text-liquen"}`}>{a.publicado ? "Leer →" : "Próximamente"}</span>
              </>
            );
            const clases = "group grid items-center gap-4 py-6 md:grid-cols-[9rem_10rem_1fr_auto] md:gap-8";
            return (
              <li key={a.url} className="border-b border-linea">
                {a.publicado ? <Link href={a.url} className={`${clases} transition-colors hover:bg-monte/60`}>{fila}</Link> : <div className={`${clases}`}>{fila}</div>}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
