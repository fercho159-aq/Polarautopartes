'use client';

import Image from 'next/image';
import { Card } from '@/components/ui/card';

interface CategoryGalleryProps {
  /** Carpeta dentro de /public/Images/Categorias (ej. "RADIADORES") */
  folder: string;
  /** Lista de archivos a mostrar (ej. ["RADIADOR 1.jpg", "RADIADOR 2.jpg"]) */
  images: string[];
  /** Nombre legible de la categoría */
  title: string;
}

/**
 * Muestra una galería de imágenes para una categoría que aún no tiene
 * productos cargados en el CSV. Resuelve el problema de páginas que se
 * ven "vacías" o con errores de imagen porque las refs no se renderizan.
 */
export function CategoryGallery({ folder, images, title }: CategoryGalleryProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((file) => (
          <Card key={file} className="overflow-hidden bg-white shadow-sm">
            <div className="relative w-full aspect-square bg-gray-50">
              <Image
                src={`/Images/Categorias/${folder}/${file}`}
                alt={`${title} - ${file}`}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-contain p-3"
              />
            </div>
          </Card>
        ))}
      </div>
      <p className="text-center text-sm text-muted-foreground italic mt-6">
        El catálogo completo de {title.toLowerCase()} está siendo actualizado.
        Para cotizaciones inmediatas contáctanos por WhatsApp al
        {' '}<a href="https://wa.me/5218116924693" className="text-polar-cyan font-semibold hover:underline">+52 81 1692 4693</a>.
      </p>
    </div>
  );
}
