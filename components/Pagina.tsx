import Curvas from "@/components/Curvas";

type Props = { h1: string; bajada?: string; fecha?: string; children: React.ReactNode };

// Página interna: banda de título con curvas de nivel + contenido sobre noche
export default function Pagina({ h1, bajada, fecha, children }: Props) {
  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-linea bg-monte pb-16 pt-36 md:pb-24 md:pt-44" aria-labelledby="pagina-titulo">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-30 [mask-image:linear-gradient(to_left,black_20%,transparent_75%)]">
          <Curvas lowColor="#556150" midColor="#a9b6a1" highColor="#e8714a" bands={2.6} thickness={0.012} glow={0.1} contrast={2} speed={0.12} morphAmount={2.4} mouseInteraction={false} />
        </div>
        <div className="mx-auto max-w-[120rem] px-4 md:px-8">
          <h1 id="pagina-titulo" className="max-w-[24ch] text-[clamp(2.1rem,4.6vw,4.5rem)] font-semibold leading-[1.04] tracking-[-0.03em]">{h1}</h1>
          {bajada && <p className="mt-8 max-w-[58ch] text-[1.0625rem] leading-relaxed text-liquen">{bajada}</p>}
          {fecha && <p className="dato mt-6 text-liquen">{fecha}</p>}
        </div>
      </section>
      <div className="mx-auto max-w-[120rem] px-4 py-16 md:px-8 md:py-24">{children}</div>
    </>
  );
}
