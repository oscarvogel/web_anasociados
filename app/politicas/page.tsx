import Pagina from "@/components/Pagina";
import politica from "@/data/politica.json";

export const metadata = { title: "Política de privacidad" };

export default function Politicas() {
  return (
    <Pagina h1="Política de privacidad" bajada={`Última actualización: ${politica.fecha}`}>
      <div className="prosa">
        {politica.secciones.map((s) => (
          <section key={s.titulo}>
            <h2>{s.titulo}</h2>
            <ul>{s.lista.map((i) => <li key={i}>{i}</li>)}</ul>
          </section>
        ))}
      </div>
    </Pagina>
  );
}
