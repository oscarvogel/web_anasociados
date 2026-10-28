type Props = { h1: string; bajada?: string; fecha?: string; children: React.ReactNode };

// Página interna: banda de título + contenido sobre marfil
export default function Pagina({ h1, bajada, fecha, children }: Props) {
  return (
    <>
      <section className="border-b border-linea bg-papel pb-16 pt-36 md:pb-24 md:pt-44" aria-labelledby="pagina-titulo">
        <div className="mx-auto max-w-[120rem] px-4 md:px-8">
          <h1 id="pagina-titulo" className="max-w-[24ch] text-[clamp(2.1rem,4.6vw,4.5rem)] font-semibold leading-[1.04] tracking-[-0.03em]">{h1}</h1>
          {bajada && <p className="mt-8 max-w-[58ch] text-[1.0625rem] leading-relaxed text-salvia">{bajada}</p>}
          {fecha && <p className="dato mt-6 text-salvia">{fecha}</p>}
        </div>
      </section>
      <div className="mx-auto max-w-[120rem] px-4 py-16 md:px-8 md:py-24">{children}</div>
    </>
  );
}
