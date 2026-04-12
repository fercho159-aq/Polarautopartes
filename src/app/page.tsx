'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { NosotrosSection } from '@/components/nosotros-section';

const heroSlides = [
    {
      image: "/Images/WebPolar/Inicio/carrusel-fuerza.png",
      title: "Fuerza y Rendimiento en Cada Autoparte",
      hint: "car auto parts"
    },
    {
      image: "/Images/WebPolar/Inicio/carrusel-stock.png",
      title: "Polar Autopartes - El Stock Más Completo",
      hint: "car water pump radiator"
    },
    {
      image: "/Images/Banners/polar 1.jpg",
      title: "Bombas de Agua de Alto Rendimiento",
      hint: "car water pump"
    },
    {
      image: "/Images/Banners/polar5.jpg",
      title: "Encuentra la Refacción Ideal para tu Auto",
      hint: "car engine cooling system"
    },
    {
      image: "/Images/Banners/polar6.jpg",
      title: "Radiadores para Todos los Modelos",
      hint: "automotive parts warehouse"
    }
];

const testimonials = [
  {
    name: 'Carlos M.',
    role: 'Taller Mecánico "El Rápido"',
    quote: 'La calidad de las bombas de agua es insuperable. Mis clientes notan la diferencia y yo tengo la confianza de instalar un producto duradero.',
    avatar: '/Images/5.png',
  },
  {
    name: 'Ana G.',
    role: 'Refaccionaria "Autopartes del Sur"',
    quote: 'El catálogo es muy completo y fácil de usar. Siempre encuentro la pieza exacta que necesito para los modelos más comerciales.',
    avatar: '/Images/5.png',
  },
  {
    name: 'Javier L.',
    role: 'Cliente Particular',
    quote: 'Compré un radiador para mi Passat y el ajuste fue perfecto. La entrega fue rápida y el empaque protegió muy bien la pieza.',
    avatar: '/Images/5.png',
  },
  {
    name: 'Sofia R.',
    role: 'Flotilla de Transporte',
    quote: 'Manejamos una flotilla grande y los tensores de accesorios han demostrado ser muy fiables.',
    avatar: '/Images/5.png',
  },
  {
    name: 'Miguel H.',
    role: 'Especialista en A/C',
    quote: 'Los condensadores tienen un rendimiento excelente. Mis clientes quedan muy satisfechos con la eficiencia del enfriamiento.',
    avatar: '/Images/5.png',
  },
];


export default function HomePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-1">

        {/* Hero Section - Large banner left + 2 smaller right */}
        <section className="relative w-full">
          <div className="container mx-auto px-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Main large banner */}
              <div className="md:col-span-2">
                <Carousel className="w-full" opts={{ loop: true }}>
                  <CarouselContent>
                    {heroSlides.map((slide, index) => (
                      <CarouselItem key={index}>
                        <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden">
                          <Image
                            src={slide.image}
                            alt={slide.title}
                            fill
                            className="object-cover"
                            priority={index === 0}
                            data-ai-hint={slide.hint}
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex" />
                  <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex" />
                </Carousel>
              </div>
              {/* Two smaller banners stacked on right */}
              <div className="hidden md:flex flex-col gap-4">
                <div className="relative w-full flex-1 rounded-lg overflow-hidden min-h-[140px]">
                  <Image
                    src="/Images/WebPolar/Inicio/garantia.png"
                    alt="Garantía Segura de 1 Año"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative w-full flex-1 rounded-lg overflow-hidden min-h-[140px]">
                  <Image
                    src="/Images/WebPolar/Inicio/envios-rapidos.png"
                    alt="Envíos Rápidos a Toda la República"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <p className="text-center text-polar-cyan text-sm mb-8">Elementos en movimiento al colocar la flecha del mouse</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center group">
                <div className="mb-4 group-hover:scale-110 transition-transform relative w-24 h-24">
                  <Image src="/Images/WebPolar/Inicio/icono-camioneta.png" alt="Cobertura Nacional" fill className="object-contain" />
                </div>
                <h3 className="text-xl font-headline font-bold mb-2 text-foreground">Cobertura Nacional</h3>
                <p className="text-muted-foreground text-sm">Más del 80% del parque vehicular cubierto.</p>
              </div>
              <div className="flex flex-col items-center group">
                <div className="mb-4 group-hover:scale-110 transition-transform relative w-24 h-24">
                  <Image src="/Images/WebPolar/Inicio/icono-reloj.jpg" alt="Envío Rápido y Seguro" fill className="object-contain" />
                </div>
                <h3 className="text-xl font-headline font-bold mb-2 text-foreground">Envío Rápido y Seguro</h3>
                <p className="text-muted-foreground text-sm">Recibe tus productos en tiempo récord y en perfecto estado.</p>
              </div>
              <div className="flex flex-col items-center group">
                <div className="mb-4 group-hover:scale-110 transition-transform relative w-24 h-24">
                  <Image src="/Images/WebPolar/Inicio/icono-estrella.png" alt="Calidad Garantizada" fill className="object-contain" />
                </div>
                <h3 className="text-xl font-headline font-bold mb-2 text-foreground">Calidad Garantizada</h3>
                <p className="text-muted-foreground text-sm">Productos que cumplen con los más altos estándares.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Comentarios / Testimonials Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-headline font-bold text-center mb-12">Comentarios</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {testimonials.map((t, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden mb-3 bg-gray-200">
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      fill
                      className="object-cover"
                      data-ai-hint="person portrait"
                    />
                  </div>
                  <div className="flex items-center gap-1 mb-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm text-muted-foreground">Opinión</span>
                  </div>
                  <p className="font-semibold text-sm">{t.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Nosotros Section - "Tu Aliado de Confianza" */}
        <NosotrosSection />

      </main>
    </div>
  );
}
