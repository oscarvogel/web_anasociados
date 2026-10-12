import Link from "next/link";
import Foto from "@/components/Foto";
import Linterna from "@/components/Linterna";
import { servicios } from "@/lib/datos";

// Rodales del plano: el primero ocupa una franja ancha, el resto se reparte en parcelas iguales
const parcela = ["md:col-span-2 lg:col-span-4 min-h-[26rem] lg:min-h-[32rem]", "lg:col-span-2", "lg:col-span-2", "lg:col-span-2", "md:col-span-2 lg:col-span-2"];

export default function Servicios() {
  return (
    <section id="servicios" className="bg-monte py-28 md:py-40" aria-labelledby="servicios-titulo">
      <div className="mx-auto max-w-[120rem] px-4 md:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <h2 id="servicios-titulo" className="max-w-[20ch] text-[clamp(2.1rem,4.4vw,4.25rem)] font-semibold leading-[1.04] tracking-[-0.03em]">
            Servicios de consultoría <span className="text-liquen">con más de 13 años de experiencia.</span>
          </h2>
          <Link href="/servicios/" className="enlace shrink-0">Ver el detalle de cada servicio →</Link>
        </div>

        <Linterna as="ul" className="mt-14 grid gap-3 md:mt-20 md:grid-cols-2 lg:grid-cols-6">
          {servicios.map((s, i) => (
            <li key={s.slug} className={`overflow-hidden rounded-2xl border border-linea ${parcela[i]}`}>
              <Link href={`/servicios/#${s.slug}`} className="group relative flex h-full min-h-[22rem] flex-col justify-end p-6 md:p-7">
                <Foto base={s.foto} alt={s.fotoAlt} anchos={[560, 828, 1122]} sizes={i === 0 ? "(min-width: 1024px) 64vw, 100vw" : "(min-width: 1024px) 32vw, (min-width: 768px) 50vw, 100vw"}
                  className="absolute inset-0 -z-10 h-full w-full object-cover" />
                <span aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,var(--color-noche)_10%,rgb(11_21_16/0.7)_45%,rgb(11_21_16/0.1))]" />
                <h3 className={`max-w-[22ch] font-semibold leading-tight tracking-[-0.02em] ${i === 0 ? "text-[clamp(1.6rem,2.6vw,2.5rem)]" : "text-[clamp(1.25rem,1.6vw,1.5rem)]"}`}>{s.titulo}</h3>
                <p className="mt-2 max-w-[38ch] text-[0.9375rem] leading-relaxed text-liquen">{s.descripcion}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-marfil transition-colors group-hover:text-brasa">Ver servicio <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span></span>
              </Link>
            </li>
          ))}
        </Linterna>
      </div>
    </section>
  );
}
