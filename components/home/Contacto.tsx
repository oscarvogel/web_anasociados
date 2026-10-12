import ContactoForm from "@/components/ContactoForm";
import Curvas from "@/components/Curvas";
import { contacto } from "@/lib/datos";

export default function Contacto({ nivel: Titulo = "h2" }: { nivel?: "h1" | "h2" }) {
  return (
    <section id="contacto" className="relative isolate overflow-hidden bg-tierra py-28 md:py-40" aria-labelledby="contacto-titulo">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-25">
        <Curvas lowColor="#ece9dc" midColor="#ece9dc" highColor="#ece9dc" colorMode="uniform" bands={5} thickness={0.012} glow={0} contrast={1.5} speed={0.1} morphAmount={2} scale={1.1} mouseInteraction={false} />
      </div>
      <div className="mx-auto grid max-w-[120rem] gap-14 px-4 md:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Titulo id="contacto-titulo" className="text-[clamp(2.1rem,4.4vw,4.25rem)] font-semibold leading-[1.04] tracking-[-0.03em]">
            {contacto.titulo} <span className="text-marfil/75">{contacto.tituloApagado}</span>
          </Titulo>
          <dl className="mt-12 grid gap-6">
            {contacto.datos.map((d) => (
              <div key={d.rotulo}>
                <dt className="dato">{d.rotulo}</dt>
                <dd className="mt-1.5 text-[1.0625rem] leading-snug">{d.enlace ? <a href={d.enlace} className="enlace">{d.texto}</a> : d.texto}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="lg:col-span-7">
          <ContactoForm />
        </div>
      </div>
    </section>
  );
}
