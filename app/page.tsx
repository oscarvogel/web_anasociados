import { hero } from "@/lib/datos";

export const metadata = { title: { absolute: "Inicio | AN Asociados - Consultoría Almada Neri & Asociados" } };

// shortcut: home provisoria de la fase 1, las secciones llegan en la fase 2
export default function Inicio() {
  return (
    <section id="inicio" className="grid min-h-svh place-items-end px-4 pb-16 md:px-8" aria-labelledby="hero-titulo">
      <h1 id="hero-titulo" className="max-w-[22ch] text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
        <span className="text-liquen">{hero.intro} </span>{hero.titulo}
      </h1>
    </section>
  );
}
