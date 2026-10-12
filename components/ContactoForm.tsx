"use client";
// Formulario de contacto: validación en línea y envío por el programa de correo del visitante (no hay servidor ni terceros).

import { useEffect, useRef, useState } from "react";
import { contacto } from "@/lib/datos";

const reglas = {
  nombre: (v: string) => (v.trim() ? "" : "Escribe tu nombre."),
  email: (v: string) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? "" : "Escribe un correo válido, por ejemplo tu@empresa.com."),
  mensaje: (v: string) => (v.trim().length >= 10 ? "" : "Cuéntanos un poco más: al menos 10 caracteres."),
};
type Campo = keyof typeof reglas;
const campos = Object.keys(reglas) as Campo[];

function Aviso({ id, texto }: { id: string; texto: string }) {
  return (
    <p id={id} className="mt-2 flex min-h-5 items-center gap-1.5 text-sm font-medium" role="alert">
      {texto && (
        <svg className="h-4 w-4 shrink-0 text-senal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M12 9v4m0 4h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0" />
        </svg>
      )}
      {texto}
    </p>
  );
}

export default function ContactoForm() {
  const form = useRef<HTMLFormElement>(null);
  const [errores, setErrores] = useState<Record<Campo, string>>({ nombre: "", email: "", mensaje: "" });
  const [estado, setEstado] = useState("");
  const [necesidad, setNecesidad] = useState(contacto.necesidades[0]);

  // Llegar desde un servicio (?necesidad=...) deja ese chip marcado
  useEffect(() => {
    const elegida = new URLSearchParams(location.search).get("necesidad");
    if (elegida && contacto.necesidades.includes(elegida)) setNecesidad(elegida);
  }, []);

  const validar = (c: Campo) => {
    const msg = reglas[c]((form.current!.elements.namedItem(c) as HTMLInputElement).value);
    setErrores((e) => ({ ...e, [c]: msg }));
    return !msg;
  };

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    const validos = campos.map(validar);
    if (validos.includes(false)) {
      setEstado("Revisa los campos marcados.");
      (form.current!.elements.namedItem(campos[validos.indexOf(false)]) as HTMLElement).focus();
      return;
    }
    const d = new FormData(form.current!);
    const cuerpo = [
      `Necesidad: ${d.get("necesidad")}`, `Rubro: ${d.get("rubro")}`, `Nombre: ${d.get("nombre")}`,
      `Correo: ${d.get("email")}`, `Teléfono: ${d.get("telefono") || "-"}`, "", d.get("mensaje"),
    ].join("\n");
    location.href = `mailto:${contacto.correoDestino}?subject=${encodeURIComponent("Consulta desde el sitio web")}&body=${encodeURIComponent(cuerpo)}`;
    setEstado(`Se abrirá tu programa de correo con la consulta lista. Si no se abre, escríbenos a ${contacto.correoDestino}.`);
  };

  const control = (c: Campo) => ({
    name: c,
    required: true,
    onBlur: () => validar(c),
    "aria-invalid": errores[c] ? true : undefined,
    "aria-describedby": `e-${c}`,
    className: "campo-control mt-2",
  });

  return (
    <form ref={form} onSubmit={enviar} noValidate className="grid gap-8">
      <fieldset>
        <legend className="dato">¿Qué necesitas?</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {contacto.necesidades.map((n) => (
            <label key={n} className="chip">
              <input type="radio" name="necesidad" value={n} checked={necesidad === n} onChange={() => setNecesidad(n)} />
              <span>{n}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="dato">¿De qué rubro es tu empresa?</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {contacto.rubros.map((r, i) => (
            <label key={r} className="chip">
              <input type="radio" name="rubro" value={r} defaultChecked={i === 0} />
              <span>{r}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-x-6 gap-y-4 md:grid-cols-2">
        <div>
          <label htmlFor="f-nombre" className="dato">Nombre</label>
          <input id="f-nombre" type="text" autoComplete="name" placeholder="Tu nombre" {...control("nombre")} />
          <Aviso id="e-nombre" texto={errores.nombre} />
        </div>
        <div>
          <label htmlFor="f-email" className="dato">Correo electrónico</label>
          <input id="f-email" type="email" autoComplete="email" placeholder="tu@empresa.com" {...control("email")} />
          <Aviso id="e-email" texto={errores.email} />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="f-telefono" className="dato">Teléfono (opcional)</label>
          <input id="f-telefono" name="telefono" type="tel" autoComplete="tel" placeholder="+54 9 …" className="campo-control mt-2" />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="f-mensaje" className="dato">Cuéntanos sobre tu operación</label>
          <textarea id="f-mensaje" rows={4} maxLength={1200} placeholder="Qué hacen, dónde y qué necesitas resolver" {...control("mensaje")} />
          <Aviso id="e-mensaje" texto={errores.mensaje} />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
        <button type="submit" className="btn-brasa !bg-marfil hover:!bg-noche hover:!text-marfil">Enviar consulta</button>
        <a href={contacto.whatsapp} target="_blank" rel="noopener" className="enlace">O escríbenos por WhatsApp</a>
      </div>
      <p className="min-h-6 text-sm" role="status">{estado}</p>
    </form>
  );
}
