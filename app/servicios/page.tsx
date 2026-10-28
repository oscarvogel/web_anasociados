import Link from "next/link";
import Foto from "@/components/Foto";
import Pagina from "@/components/Pagina";
import { servicios } from "@/lib/datos";

export const metadata = { title: "Servicios de Consultoría", description: "Higiene, seguridad y medio ambiente, sistemas de gestión, prevención de incendios, capacitación en transporte forestal y certificación de competencias laborales." };

const alianzas = [
  {
    logos: [["amitrac.png", "AMITRAC"], ["fadeeac.png", "FADEEAC"], ["fpt.png", "FPT"]],
    titulo: "Curso de perfeccionamiento para choferes profesionales",
    texto: "Programa teórico-práctico donde nuestro director actúa como instructor principal, actualmente en desarrollo para la flota forestal de Arauco Argentina.",
    listas: [
      ["Características principales", ["Cobertura total de la flota forestal", "Perspectivas de expansión a nuevos clientes", "Próximos cursos de conducción profesional"]],
      ["Beneficios clave", ["Certificación reconocida por entidades líderes", "Enfoque en seguridad y eficiencia operativa", "Actualización continua de contenidos"]],
    ],
  },
  {
    logos: [["laboratorio_barrios.png", "Laboratorios Barrios"]],
    titulo: "Servicios especializados en análisis",
    texto: "Colaboración estratégica que amplía nuestra oferta de servicios técnicos y de consultoría.",
    listas: [
      ["Áreas de análisis", ["Alimentos y seguridad alimentaria", "Calidad de suelos y aguas", "Control de efluentes industriales"]],
      ["Ventajas", ["Tecnología de última generación", "Informes técnicos detallados", "Cumplimiento normativo garantizado"]],
    ],
  },
] as const;

export default function PaginaServicios() {
  return (
    <>
      <Pagina h1="Servicios de consultoría" bajada="Asesoría en higiene, seguridad y medio ambiente para lograr una operación más segura en tu empresa.">
        <div className="border-t border-linea">
          {servicios.map((s, i) => (
            <article key={s.slug} id={s.slug} className="grid items-center gap-10 border-b border-linea py-16 md:py-24 lg:grid-cols-12 lg:gap-16">
              <div className={`lg:col-span-5 ${i % 2 ? "lg:order-last" : ""}`}>
                <h2 className="text-[clamp(1.75rem,3vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.025em]">{s.titulo}</h2>
                <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-salvia">{s.descripcion}</p>
                <Link href={`/contacto/?necesidad=${encodeURIComponent(s.necesidad)}`} className="btn-brasa mt-8">Consultar este servicio</Link>
              </div>
              <div className="aspect-[4/3] overflow-hidden rounded-2xl lg:col-span-7">
                <Foto base={s.foto} alt={s.fotoAlt} anchos={[560, 828, 1122]} sizes="(min-width: 1024px) 55vw, 100vw" className="h-full w-full object-cover object-[50%_35%]" />
              </div>
            </article>
          ))}
        </div>
      </Pagina>

      <section className="bg-tierra text-marfil py-20 md:py-28" aria-labelledby="servicios-cta">
        <div className="mx-auto flex max-w-[120rem] flex-col gap-8 px-4 md:flex-row md:items-end md:justify-between md:px-8">
          <h2 id="servicios-cta" className="max-w-[20ch] text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.03em]">Hablemos de la seguridad de tu operación</h2>
          <Link href="/contacto/" className="btn-brasa !bg-marfil hover:!bg-noche hover:!text-marfil">Contáctanos</Link>
        </div>
      </section>

      <section className="bg-papel py-24 md:py-32" aria-labelledby="alianzas-titulo">
        <div className="mx-auto max-w-[120rem] px-4 md:px-8">
          <h2 id="alianzas-titulo" className="max-w-[22ch] text-[clamp(2rem,4vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
            Alianzas estratégicas <span className="text-salvia">con la calidad y la mejora continua.</span>
          </h2>
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-linea bg-linea lg:grid-cols-2">
            {alianzas.map((a) => (
              <article key={a.titulo} className="bg-papel p-6 md:p-10">
                <div className="flex flex-wrap gap-3">
                  {a.logos.map(([archivo, nombre]) => (
                    <span key={nombre} className="grid h-20 w-40 place-items-center rounded-xl bg-marfil px-5">
                      <img src={`/assets/images/logos/${archivo}`} alt={nombre} loading="lazy" className="max-h-12 w-auto max-w-full object-contain mix-blend-multiply" />
                    </span>
                  ))}
                </div>
                <h3 className="mt-8 text-[clamp(1.35rem,1.9vw,1.75rem)] font-semibold leading-tight tracking-[-0.02em]">{a.titulo}</h3>
                <p className="mt-3 max-w-[52ch] leading-relaxed text-salvia">{a.texto}</p>
                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  {a.listas.map(([rotulo, items]) => (
                    <div key={rotulo}>
                      <h4 className="dato text-salvia">{rotulo}</h4>
                      <ul className="mt-3 grid gap-2 text-[0.9375rem] leading-snug">
                        {items.map((it) => <li key={it} className="relative pl-4 before:absolute before:left-0 before:top-[0.55em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-brasa">{it}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <p className="mt-14 max-w-[40ch] text-[clamp(1.25rem,2vw,1.75rem)] font-medium leading-snug tracking-[-0.02em]">Estas alianzas refuerzan nuestro compromiso con soluciones innovadoras y altos estándares para la industria.</p>
        </div>
      </section>
    </>
  );
}
