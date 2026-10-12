import Link from "next/link";
import Curvas from "@/components/Curvas";
import Foto from "@/components/Foto";
import SplitText from "@/components/rb/SplitText";
import { hero, servicios } from "@/lib/datos";

const destacado = servicios[2];

export default function Hero() {
  return (
    <section id="inicio" className="relative isolate flex min-h-svh flex-col overflow-hidden" aria-labelledby="hero-titulo">
      <Foto base="/assets/images/hero" anchos={[828, 1280, 1672]} sizes="100vw" prioridad className="absolute inset-0 -z-20 h-full w-full object-cover object-[60%_50%]"
        alt="Casco de seguridad con el logo de AN Asociados, guantes y planos sobre un tronco, con un bosque y maquinaria forestal al atardecer" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,var(--color-noche)_6%,rgb(11_21_16/0.55)_45%,rgb(11_21_16/0.25)_75%),linear-gradient(to_right,rgb(11_21_16/0.8),transparent_65%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-45 [mask-image:linear-gradient(to_bottom,black_25%,transparent_70%)] md:[mask-image:linear-gradient(to_bottom,black,black_35%,transparent_75%),linear-gradient(to_left,black_30%,transparent_70%)] md:[mask-composite:add]">
        <Curvas lowColor="#556150" midColor="#ece9dc" highColor="#e8714a" bands={2.6} thickness={0.014} glow={0.15} contrast={2} speed={0.18} morphAmount={2.4} scale={0.9} mouseRadius={0.22} mouseStrength={0.35} />
      </div>

      <div className="mx-auto mt-auto w-full max-w-[120rem] px-4 pb-24 pt-28 md:px-8 md:pb-20">
        <SplitText text={hero.marca} tag="p" ariaHidden mask="chars" splitType="chars" delay={35} duration={1} ease="expo.out" from={{ yPercent: 110 }} to={{ yPercent: 0 }} threshold={0} rootMargin="0px"
          className="block w-full whitespace-nowrap font-display text-[calc((min(100vw,120rem)-2rem)/9.85)] md:text-[calc((min(100vw,120rem)-4rem)/9.85)] font-bold uppercase leading-[0.82] tracking-[-0.02em] text-marfil [font-stretch:125%]" />

        <div className="mt-10 grid items-end gap-10 md:mt-14 md:grid-cols-12">
          <div className="md:col-span-7 lg:col-span-6">
            <h1 id="hero-titulo" className="text-[clamp(1.75rem,3vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.025em]">
              <span className="text-liquen">{hero.intro} </span>{hero.titulo}<span className="text-brasa">.</span>
            </h1>
            <p className="mt-5 max-w-[46ch] text-[1.0625rem] leading-relaxed text-marfil/85">{hero.descripcion}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Link href={hero.cta.url} className="btn-brasa">{hero.cta.texto}</Link>
              <a href={hero.secundario.url} className="enlace">{hero.secundario.texto} ↓</a>
            </div>
          </div>

          <dl className="dato hidden self-end border border-marfil/25 bg-noche/45 backdrop-blur-sm md:col-span-4 md:col-start-9 md:grid md:grid-cols-[auto_1fr] [&>*]:border-marfil/15 [&>*]:px-4 [&>*]:py-3 [&>dd]:border-l [&>dt]:text-liquen [&>:nth-child(n+3)]:border-t">
            <dt>Base</dt><dd>Puerto Esperanza, Misiones</dd>
            <dt>Alcance</dt><dd>Argentina · Paraguay</dd>
            <dt>Destacado</dt><dd><Link href={`/servicios/#${destacado.slug}`} className="enlace">{destacado.titulo}</Link></dd>
          </dl>
        </div>
      </div>
    </section>
  );
}
