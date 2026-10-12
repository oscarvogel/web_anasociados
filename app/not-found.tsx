import Link from "next/link";

export const metadata = { title: "Página no encontrada" };

export default function NoEncontrada() {
  return (
    <section className="bg-tierra pb-28 pt-40 md:pb-40 md:pt-52" aria-labelledby="e404">
      <div className="mx-auto max-w-[120rem] px-4 md:px-8">
        <h1 id="e404" className="max-w-[16ch] text-[clamp(2.4rem,6vw,6rem)] font-semibold leading-[1.02] tracking-[-0.03em] [font-stretch:112%]">
          Esta página no existe <span className="text-marfil/70">o cambió de lugar.</span>
        </h1>
        <p className="mt-8 max-w-[48ch] text-[1.0625rem] leading-relaxed">Puedes volver al inicio o contarnos qué buscabas.</p>
        <div className="mt-10 flex flex-wrap items-center gap-6">
          <Link href="/" className="btn-brasa !bg-marfil hover:!bg-noche hover:!text-marfil">Volver al inicio</Link>
          <Link href="/contacto/" className="enlace">Ir a contacto</Link>
        </div>
      </div>
    </section>
  );
}
