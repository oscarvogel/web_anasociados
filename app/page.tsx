import Clientes from "@/components/home/Clientes";
import Hero from "@/components/home/Hero";
import Invitacion from "@/components/home/Invitacion";
import Nosotros from "@/components/home/Nosotros";
import Servicios from "@/components/home/Servicios";

export const metadata = { title: { absolute: "Inicio | AN Asociados - Consultoría Almada Neri & Asociados" } };

export default function Inicio() {
  return (
    <>
      <Hero />
      <Nosotros />
      <Servicios />
      <Clientes />
      <Invitacion />
    </>
  );
}
