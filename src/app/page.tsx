'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { NosotrosSection } from '@/components/nosotros-section';
import { HomeFilterBar } from '@/components/home-filter-bar';

const heroSlides = [
    {
      // Banners 1905x670 (~16:5.6) — usar aspect-[1905/670] para no recortarlos
      image: "/Images/Banners/polar 1.jpg",
      title: "Bombas de Agua de Alto Rendimiento",
      hint: "car water pump"
    },
    {
      image: "/Images/Banners/polar 2.jpg",
      title: "El Stock Más Completo Para Todas Las Marcas",
      hint: "car auto parts"
    },
    {
      image: "/Images/Banners/polar 3.jpg",
      title: "Rendimiento y Seguridad",
      hint: "car cooling system"
    },
    {
      image: "/Images/Banners/polar4.jpg",
      title: "Encuentra la Refacción Ideal para tu Auto",
      hint: "car engine"
    },
    {
      image: "/Images/Banners/polar5.jpg",
      title: "Radiadores para Todos los Modelos",
      hint: "automotive parts warehouse"
    },
    {
      image: "/Images/Banners/polar6.jpg",
      title: "Más de 6,000 aplicaciones",
      hint: "auto parts catalog"
    }
];

// Las 4 categorías destacadas del boceto: FILTROS, RADIADORES, CONDENSADORES, SOPORTES
const categoriasDestacadas = [
  {
    label: 'FILTROS',
    href: '/lines/filtros-de-aire',
    image: '/Images/Categorias/FILTROS DE AIRE/FILTRO DE AIRE 1.jpg',
  },
  {
    label: 'RADIADORES',
    href: '/lines/radiadores',
    image: '/Images/Categorias/RADIADORES/RADIADOR 1.jpg',
  },
  {
    label: 'CONDENSADORES',
    href: '/lines/condensadores',
    image: '/Images/Categorias/CONDENSADORES/CONDENSADOR 1.jpg',
  },
  {
    label: 'SOPORTES',
    href: '/lines/soportes-de-motor-y-transmision',
    image: '/Images/Categorias/SOPORTES DE MOTOR Y TRANSMISION/SOPORTE DE MOTOR 1.png',
  },
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
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-1">

        {/* Filter bar - barra horizontal con Marca / Modelo / Año / Refacción + buscador */}
        <HomeFilterBar />

        {/* Hero Section - banner principal a todo lo ancho con aspect ratio correcto */}
        <section className="relative w-full bg-white">
          <div className="container mx-auto px-4 py-4">
            <Carousel className="w-full" opts={{ loop: true }}>
              <CarouselContent>
                {heroSlides.map((slide, index) => (
                  <CarouselItem key={index}>
                    <div className="relative w-full aspect-[1905/670] rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        sizes="100vw"
                        className="object-contain md:object-cover"
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
        </section>

        {/* LINEAS - 4 categorías destacadas (boceto: FILTROS, RADIADORES, CONDENSADORES, SOPORTES) */}
        <section className="py-10 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-center text-3xl font-headline font-bold tracking-wide text-foreground mb-8">
              LINEAS
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categoriasDestacadas.map((cat) => (
                <Link
                  key={cat.label}
                  href={cat.href}
                  className="group flex flex-col items-center"
                >
                  <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-white border border-gray-100 shadow-sm group-hover:shadow-md transition-all">
                    <Image
                      src={cat.image}
                      alt={cat.label}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-contain p-4 group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="mt-3 inline-block bg-polar-cyan text-white font-headline font-semibold tracking-wide px-6 py-2 rounded-full text-sm">
                    {cat.label}
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/lines"
                className="text-polar-dark font-semibold hover:text-polar-cyan transition-colors text-sm uppercase tracking-wider"
              >
                Ver todas las líneas →
              </Link>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
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
