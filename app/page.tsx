import Articulos from "@/components/home/Articulos";
import Clientes from "@/components/home/Clientes";
import Contacto from "@/components/home/Contacto";
import Enfoque from "@/components/home/Enfoque";
import Hero from "@/components/home/Hero";
import Nosotros from "@/components/home/Nosotros";
import Servicios from "@/components/home/Servicios";

export const metadata = { title: { absolute: "Inicio | AN Asociados - Consultoría Almada Neri & Asociados" } };

export default function Inicio() {
  return (
    <>
      <Hero />
      <Enfoque />
      <Servicios />
      <Clientes />
      <Nosotros />
      <Articulos />
      <Contacto />
    </>
  );
}
