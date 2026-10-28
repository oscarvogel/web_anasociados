import Pagina from "@/components/Pagina";
import destacados from "@/data/clientes_destacados.json";

export const metadata = { title: "Clientes destacados", description: "Trabajos de AN Asociados con empresas forestales, industriales y de transporte en Argentina y Paraguay." };

export default function ClientesDestacados() {
  return (
    <Pagina h1="Clientes destacados" bajada="Trabajamos con empresas líderes en sus sectores, brindando soluciones integrales en seguridad, medio ambiente y gestión de calidad.">
      <ul className="border-t border-linea">
        {destacados.map((c) => (
          <li key={c.nombre} className="grid gap-8 border-b border-linea py-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
            <div className="flex flex-col items-start gap-4">
              {c.logo && (
                <span className="grid h-20 w-44 place-items-center rounded-xl bg-marfil px-5">
                  <img src={c.logo} alt={`Logo de ${c.nombre}`} loading="lazy" decoding="async" className="max-h-12 w-auto max-w-full object-contain mix-blend-multiply" />
                </span>
              )}
              <h2 className="text-[1.5rem] font-semibold leading-tight tracking-[-0.02em]">{c.nombre}</h2>
            </div>
            <ul className="grid gap-7">
              {c.trabajos.map((t) => (
                <li key={t.titulo}>
                  <h3 className="text-[1.125rem] font-semibold leading-snug">{t.titulo}</h3>
                  <p className="mt-2 max-w-[62ch] leading-relaxed text-salvia">{t.descripcion}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Pagina>
  );
}
