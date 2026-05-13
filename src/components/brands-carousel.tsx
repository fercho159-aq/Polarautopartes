'use client';

import * as React from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const brands = [
  { name: 'GM y ACDelco', src: '/Images/Logos/gm-y-acdelco-logo.png' },
  { name: 'Motorcraft', src: '/Images/Logos/motorcraft-logo.png' },
  { name: 'Engine Fil', src: '/Images/Logos/engine-fil-logo.png' },
  { name: 'Quezada', src: '/Images/Logos/quezada-logo.png' },
  { name: 'Cauplas', src: '/Images/Logos/cauplas-logo.png' },
  { name: '4KAR', src: '/Images/Logos/4kar-logo.jpg' },
  { name: 'Knadian', src: '/Images/Logos/knadian-logo.jpg' },
  { name: 'Keep on Green', src: '/Images/Logos/keep-on-green-logo.png' },
  { name: 'Radiadores Polar', src: '/Images/Logos/radiadores-polar-logo.png' },
];

export function BrandsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });

  const scrollPrev = React.useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = React.useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  // Auto-scroll cada 2.5 s; se pausa si el usuario interactúa
  React.useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => emblaApi.scrollNext(), 2500);
    const stop = () => clearInterval(interval);
    emblaApi.on('pointerDown', stop);
    return () => {
      clearInterval(interval);
      emblaApi.off('pointerDown', stop);
    };
  }, [emblaApi]);

  return (
    <section className="py-14 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-headline font-bold text-center mb-2">
          Distribuidores Oficiales
        </h2>
        <p className="text-center text-muted-foreground text-sm mb-10">
          Las marcas más reconocidas del mercado están con Polar Autopartes
        </p>

        <div className="relative flex items-center">
          {/* Prev */}
          <button
            onClick={scrollPrev}
            aria-label="Anterior"
            className="shrink-0 flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 bg-white shadow-sm hover:bg-gray-50 transition-colors mr-3 z-10"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>

          {/* Track */}
          <div className="overflow-hidden flex-1" ref={emblaRef}>
            <div className="flex gap-4">
              {brands.map((brand) => (
                <div
                  key={brand.name}
                  className="shrink-0 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
                >
                  <div className="flex items-center justify-center h-24 border border-gray-100 rounded-xl bg-white px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
                    <div className="relative w-full h-full">
                      <Image
                        src={brand.src}
                        alt={brand.name}
                        fill
                        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 18vw"
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next */}
          <button
            onClick={scrollNext}
            aria-label="Siguiente"
            className="shrink-0 flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 bg-white shadow-sm hover:bg-gray-50 transition-colors ml-3 z-10"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>
    </section>
  );
}
