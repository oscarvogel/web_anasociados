// Foto optimizada en <picture> AVIF/WebP. base = ruta sin ancho ni extensión; anchos = tamaños generados (ver docs/imagenes-pendientes.md).
type Props = { base: string; alt: string; anchos: number[]; sizes: string; className?: string; prioridad?: boolean };

export default function Foto({ base, alt, anchos, sizes, className, prioridad }: Props) {
  const set = (ext: string) => anchos.map((w) => `${base}-${w}.${ext} ${w}w`).join(", ");
  return (
    <picture>
      <source type="image/avif" srcSet={set("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={set("webp")} sizes={sizes} />
      <img src={`${base}-${anchos.at(-1)}.webp`} alt={alt} className={className} loading={prioridad ? "eager" : "lazy"} fetchPriority={prioridad ? "high" : undefined} decoding="async" />
    </picture>
  );
}
