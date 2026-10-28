# Imágenes: estado y cómo reemplazarlas

**Estado (2026-10-09):** las 9 fotos pedidas están integradas (5 de servicios, `nosotros-banda` y 3 de artículos). Los originales PNG están en `design-source/originales/` (fuera de git: conviene respaldarlos). Pendiente: una foto real para el hero. La tabla y los prompts de abajo quedan como referencia para reemplazos futuros.

Hoy el sitio usa una sola foto real: el fondo del hero. Todo lo demás muestra ilustraciones de equipos de seguridad (`src/_includes/components/epp.njk`) como arte provisorio. Esta guía lista las fotos a producir, con nombre, medida y un prompt sugerido para generarlas con el mismo estilo que la foto del hero.

## Nombres y medidas

Guardar los originales en `design-source/` (esa carpeta no se publica). JPG de buena calidad, sin texto ni marcas de agua.

| Archivo | Dónde se usa | Formato | Medida mínima |
|---|---|---|---|
| `servicio-higiene-seguridad-ambiente.jpg` | Servicios, tarjeta 1 | vertical 4:5 | 1600×2000 |
| `servicio-sistemas-gestion-forestal.jpg` | Servicios, tarjeta 2 | vertical 4:5 | 1600×2000 |
| `servicio-prevencion-incendios.jpg` | Servicios, tarjeta 3 | vertical 4:5 | 1600×2000 |
| `servicio-capacitacion-transporte-forestal.jpg` | Servicios, tarjeta 4 | vertical 4:5 | 1600×2000 |
| `servicio-certificacion-competencias.jpg` | Servicios, tarjeta 5 | vertical 4:5 | 1600×2000 |
| `nosotros-banda.jpg` | Banda de "Nosotros" | panorámica 21:9 | 2400×1030 |
| `articulo-incendios.jpg`, `articulo-prl-2026.jpg`, `articulo-senforfire.jpg` | Artículos (opcional) | 16:10 | 1200×750 |
| `hero-fondo.jpg` | Reemplazo del hero (cuando haya foto real) | 16:9 | 2400×1350 |

Mínimo para publicar: las 6 primeras. La imagen para redes (`og-compartir.jpg`) ya existe y se genera a partir del hero.

## Prompts sugeridos

Cláusula de estilo común (pegarla al final de cada prompt):

> Photorealistic cinematic photograph, golden-hour backlight with warm amber sun flare, shallow depth of field, misty pine and eucalyptus plantation in Misiones, Argentina, red earth, natural colors, no text, no watermark, no brand logos.

1. **Higiene, seguridad y ambiente**, vertical 4:5: a pair of yellow-and-black work gloves, a high-visibility orange vest and clear safety glasses laid on a pine log, forestry operation softly blurred behind.
2. **Sistemas de gestión forestal**, vertical 4:5: a forestry inspector in a white hard hat and orange vest, seen from behind, reviewing blueprints on a tablet in an orderly pine plantation.
3. **Prevención de incendios**, vertical 4:5: a forest fire-prevention brigade with a water truck and hoses at the edge of a plantation, a cleared firebreak, light haze.
4. **Capacitación en transporte forestal**, vertical 4:5: a loaded timber truck on a forest road at dawn, an instructor and a trainee driver talking at the cab door.
5. **Certificación de competencias**, vertical 4:5: an evaluator with a clipboard checklist next to a forestry machine operator, machine in the background.
6. **Banda de Nosotros**, panorámica 21:9: wide landscape of a forestry operation at sunrise with mist between the trees, machinery far in the distance, no people in the foreground.
7. **Artículos** (opcional), 16:10: (a) a drone-style aerial view of a plantation with a thin line of smoke; (b) a worker with a tablet doing a risk analysis at a work site; (c) a small wireless sensor mounted on a pine trunk.

Revisar cada imagen: sin texto deformado, sin manos ni equipos con detalles extraños, y con el equipo de protección bien puesto (casco, guantes, chaleco).

## Cómo reemplazar una imagen

1. Dejar el archivo en `design-source/` con el nombre exacto de la tabla.
2. Convertirlo a AVIF y WebP en tres tamaños (se ejecuta una sola vez por imagen):

   ```bash
   for w in 828 1280 1672; do
     npx sharp-cli -i design-source/NOMBRE.jpg -o src/assets/images/NOMBRE-$w.avif -f avif -q 70 resize $w
     npx sharp-cli -i design-source/NOMBRE.jpg -o src/assets/images/NOMBRE-$w.webp -f webp -q 78 resize $w
   done
   ```

3. Completar el campo `foto` del servicio en `src/_data/servicios.json` (por ejemplo `"/assets/images/servicio-prevencion-incendios-1280.webp"`). Mientras `foto` esté vacío se muestra la ilustración.

Nota: la foto del hero actual parece generada por IA. Si el cliente consigue una foto real de sus operaciones, conviene usarla en `hero-fondo.jpg` (mismo procedimiento, con el nombre `hero`).
