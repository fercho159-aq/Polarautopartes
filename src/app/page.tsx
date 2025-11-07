'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Car, ShieldCheck, ThumbsUp, Truck, Wrench } from 'lucide-react';
import { SearchFilters } from '@/components/search-filters';
import { useRouter } from 'next/navigation';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ContactSection } from '@/components/contact-section';
import { NosotrosSection } from '@/components/nosotros-section';
import { TestimonialsSection } from '@/components/testimonials-section';

const heroSlides = [
    {
      image: "/Images/Banners/polar 2.jpg",
      title: "Bombas de Agua de Alto Rendimiento",
      subtitle: "Durabilidad y eficiencia para mantener tu motor en la temperatura correcta.",
      hint: "car water pump"
    },
    {
        image: "/Images/Banners/polar 1.jpg",
        title: "Encuentra la Refacción Ideal para tu Auto",
        subtitle: "Calidad y cobertura para el sistema de enfriamiento de tu vehículo.",
        hint: "car engine cooling system"
    },
    {
        image: "/Images/Banners/polar 3.jpg",
        title: "Radiadores para Todos los Modelos",
        subtitle: "La mayor cobertura del mercado para autos nacionales e importados.",
        hint: "automotive parts warehouse"
    }
];

const productLines = [
    { name: 'Bombas de Agua', href: '/lines/bomba-de-agua', image: '/Images/Categorias/BOMBAS DE AGUA/BOMBA DE AGUA.jpg', dataAiHint: "water pump" },
    { name: 'Depósitos de Anticongelante', href: '/lines/deposito-de-anticongelante', image: '/Images/Categorias/DEPOSITOS DE ANTICONGELANTE/DEPOSITO DE ANTICONGELANTE 1.jpg', dataAiHint: "coolant reservoir" },
    { name: 'Motoventiladores', href: '/lines/motoventiladores', image: '/Images/Categorias/MOTOVENTILADORES/MOTOVENTILADOR 1.jpg', dataAiHint: "cooling fan" },
    { name: 'Radiadores', href: '/lines/radiadores', image: '/Images/Categorias/RADIADORES/RADIADOR 1.jpg', dataAiHint: "radiator" },
    { name: 'Soportes de Motor y Transmisión', href: '/lines/soportes-de-motor-y-transmision', image: 'https://picsum.photos/seed/engine-mount/600/400', dataAiHint: 'engine mount' },
    { name: 'Tapones', href: '/lines/tapones', image: '/Images/Categorias/TAPONES DE DEPOSITO Y RADIADOR/TAPON DE DEPOSITO DE ANTICONGELANTE 1.jpg', dataAiHint: "radiator cap" },
    { name: 'Tomas de Agua', href: '/lines/toma-de-agua', image: '/Images/Categorias/TOMAS DE AGUA/TOMA DE AGUA 1.jpg', dataAiHint: "water outlet" },
    { name: 'Tubos de Enfriamiento', href: '/lines/tubos-de-enfriamiento', image: '/Images/Categorias/TUBOS DE ENFRIAMIENTO/TUBO DE ENFRIAMIENTO 1.jpg', dataAiHint: "cooling pipe" },
    { name: 'Poleas y Tensores', href: '/lines/poleas-y-tensores', image: 'https://picsum.photos/seed/pulleys-tensioners/600/400', dataAiHint: 'pulleys tensioners' },
    { name: 'Mangueras', href: '/lines/mangueras', image: 'https://picsum.photos/seed/radiator-hose/600/400', dataAiHint: 'radiator hose' },
    { name: 'Todas las Líneas', href: '/lines', image: '/Images/a2.png', dataAiHint: "car parts" },
]


export default function HomePage() {
  const router = useRouter();

  const handleSearch = (criteria: any) => {
    const params = new URLSearchParams();
    if (criteria.keyword) params.set('keyword', criteria.keyword);
    if (criteria.brand) params.set('brand', criteria.brand);
    if (criteria.model) params.set('model', criteria.model);
    if (criteria.year) params.set('year', criteria.year);
    if (criteria.motor) params.set('motor', criteria.motor);
    router.push(`/search?${params.toString()}`);
  };


  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">

        {/* Top Search Bar */}
        <section className="py-4 bg-card border-b shadow-sm">
            <div className="container mx-auto px-4">
                <SearchFilters 
                    onSearch={handleSearch} 
                    onClear={() => router.push('/search')} 
                    variant="compact"
                    hideKeywordSearch
                    hideTitle
                />
            </div>
        </section>


        {/* Hero Section */}
         <section className="relative w-full">
            <Carousel className="w-full" opts={{ loop: true }}>
                <CarouselContent>
                    {heroSlides.map((slide, index) => (
                        <CarouselItem key={index}>
                            <div className="relative w-full aspect-[1900/670]">
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
        </section>


        {/* Benefits Section */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <Car className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-headline font-bold mb-2">Cobertura Nacional</h3>
                <p className="text-muted-foreground">Más del 80% del parque vehicular cubierto.</p>
              </div>
              <div className="flex flex-col items-center">
                <Truck className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-headline font-bold mb-2">Envío Rápido y Seguro</h3>
                <p className="text-muted-foreground">Recibe tus productos en tiempo récord y en perfecto estado.</p>
              </div>
              <div className="flex flex-col items-center">
                <ThumbsUp className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-headline font-bold mb-2">Calidad Garantizada</h3>
                <p className="text-muted-foreground">Productos que cumplen con los más altos estándares.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Product Lines Section */}
        <section id="lineas" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-headline font-bold text-center text-primary mb-12">Nuestras Líneas de Producto</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {productLines.map((line) => (
                <Link key={line.name} href={line.href} className="group">
                  <Card className="overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1">
                     <div className="relative h-40 w-full">
                        <Image
                          src={line.image}
                          alt={line.name}
                          fill
                          objectFit="cover"
                          className="transition-transform duration-300 group-hover:scale-110"
                          data-ai-hint={line.dataAiHint || "car part"}
                        />
                      </div>
                    <CardContent className="p-4 text-center">
                      <h3 className="font-headline font-semibold text-lg">{line.name}</h3>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* Nosotros Section */}
        <NosotrosSection />

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* Intermediate CTA */}
        <section className="bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 py-12 text-center">
                <h2 className="text-3xl font-headline font-bold mb-4">¿Listo para encontrar tu refacción?</h2>
                <p className="text-lg mb-6 max-w-2xl mx-auto">Compra ahora y aprovecha nuestros precios competitivos y envío rápido.</p>
                <Button asChild size="lg" variant="secondary" className="text-secondary-foreground hover:bg-white/90 font-bold">
                    <Link href="/search">Ir al Catálogo</Link>
                </Button>
            </div>
        </section>


        {/* Contact Section */}
        <ContactSection />
      </main>
    </div>
  );
}
