import { contacto } from "@/lib/datos";

export default function WhatsApp() {
  return (
    <aside aria-label="Contacto rápido">
      <a
        href={contacto.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escríbenos por WhatsApp"
        className="fixed bottom-4 right-4 z-40 inline-flex h-12 items-center gap-2 rounded-full border border-marfil/15 bg-monte/90 px-4 text-sm font-medium shadow-[0_8px_24px_-8px_rgb(0_0_0/0.6)] backdrop-blur-sm transition-colors duration-300 hover:bg-brasa hover:text-noche md:bottom-6 md:right-6"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m3 21 1.65-3.8a9 9 0 1 1 3.4 2.9z" /><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0 5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" /></svg>
        <span className="hidden sm:inline">Escríbenos</span>
      </a>
    </aside>
  );
}
