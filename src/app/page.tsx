

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Car, Mail, MapPin, Phone, ShieldCheck, Star, ThumbsUp, Truck, Users, Wrench } from 'lucide-react';
import { SearchFilters } from '@/components/search-filters';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useEffect, useState } from 'react';
import type { Product } from '@/types';
import { loadProductsFromCSV } from '@/lib/data-loader';

const testimonials = [
  {
    name: 'Carlos M.',
    role: 'Taller Mecánico "El Rápido"',
    quote: 'La calidad de las bombas de agua es insuperable. Mis clientes notan la diferencia y yo tengo la confianza de instalar un producto duradero.',
    avatar: 'https://placehold.co/100x100.png',
  },
  {
    name: 'Ana G.',
    role: 'Refaccionaria "Autopartes del Sur"',
    quote: 'El catálogo es muy completo y fácil de usar. Siempre encuentro la pieza exacta que necesito para los modelos más comerciales. ¡Excelente servicio!',
    avatar: 'https://placehold.co/100x100.png',
  },
    {
    name: 'Javier L.',
    role: 'Cliente Particular',
    quote: 'Compré un radiador para mi Passat y el ajuste fue perfecto. La entrega fue rápida y el empaque protegió muy bien la pieza. ¡Recomendado!',
    avatar: 'https://placehold.co/100x100.png',
  },
  {
    name: 'Sofia R.',
    role: 'Flotilla de Transporte "Logística Veloz"',
    quote: 'Manejamos una flotilla grande y los tensores de accesorios han demostrado ser muy fiables. Hemos reducido costos de mantenimiento gracias a su calidad.',
    avatar: 'https://placehold.co/100x100.png',
  },
  {
    name: 'Miguel H.',
    role: 'Especialista en Aire Acondicionado',
    quote: 'Los condensadores tienen un rendimiento excelente. Mis clientes de autos de alta gama quedan muy satisfechos con la eficiencia del enfriamiento.',
    avatar: 'https://placehold.co/100x100.png',
  },
];

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

const linePageMap: { [key: string]: string } = {
  'Bomba de Agua': '/lines/bomba-de-agua',
  'Depósito de Anticongelante': '/lines/deposito-de-anticongelante',
  'Motoventilador': '/lines/motoventiladores',
  'Radiador': '/lines/radiadores',
  'Tapón de Radiador': '/lines/tapones',
  'Tapón para Depósito de Anticongelante': '/lines/tapones',
  'Toma de Agua': '/lines/toma-de-agua',
  'Tubo de Enfriamiento': '/lines/tubos-de-enfriamiento',
};


export default function HomePage() {
  const router = useRouter();
  const [productLines, setProductLines] = useState<string[]>([]);

  useEffect(() => {
    async function loadInitialData() {
      const allProducts = await loadProductsFromCSV();
      
      const uniqueLines = [...new Set(allProducts.map(p => p.name))].sort();
      setProductLines(uniqueLines);
    }
    loadInitialData();
  }, []);

  const handleSearch = (criteria: any) => {
    const params = new URLSearchParams();
    if (criteria.keyword) params.set('keyword', criteria.keyword);
    if (criteria.brand) params.set('brand', criteria.brand);
    if (criteria.model) params.set('model', criteria.model);
    if (criteria.year) params.set('year', criteria.year);
    if (criteria.motor) params.set('motor', criteria.motor);
    router.push(`/search?${params.toString()}`);
  };

  const getLineHref = (line: string): string => {
    if (linePageMap[line]) {
      return linePageMap[line];
    }
    
    // Special cases for combined lines
    if (line.toLowerCase().includes('tapón')) {
        return '/lines/tapones';
    }

    if (line.toLowerCase() === 'motoventiladores') {
      return '/lines/motoventiladores';
    }

    if (line.toLowerCase() === 'radiadores') {
      return '/lines/radiadores';
    }

    return `/search?keyword=${encodeURIComponent(line)}`;
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {productLines.map((line) => (
                <Link key={line} href={getLineHref(line)} className="group">
                  <Card className="overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1">
                     <div className="relative h-40 w-full">
                        <Image
                          src="/Images/a2.png"
                          alt={line}
                          fill
                          objectFit="cover"
                          className="transition-transform duration-300 group-hover:scale-110"
                          data-ai-hint="car part"
                        />
                      </div>
                    <CardContent className="p-4 text-center">
                      <h3 className="font-headline font-semibold text-lg">{line}</h3>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* Nosotros Section */}
        <section id="nosotros" className="py-16 bg-card">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-headline font-bold text-primary mb-4">Sobre Polar Autopartes</h2>
              <p className="text-muted-foreground mb-6">
                Somos una empresa líder en la distribución de refacciones para el sistema de enfriamiento automotriz. Con más de 20 años de experiencia, nuestro compromiso es ofrecer productos de la más alta calidad y un servicio excepcional a nuestros clientes en todo México.
              </p>
              <div className="flex flex-col space-y-4">
                 <div className="flex items-center gap-3">
                    <ShieldCheck className="h-6 w-6 text-accent"/>
                    <span className="font-semibold">Confianza y Calidad Garantizada</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <Wrench className="h-6 w-6 text-accent"/>
                    <span className="font-semibold">Innovación Constante en Nuestro Catálogo</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <Car className="h-6 w-6 text-accent"/>
                    <span className="font-semibold">Amplia Cobertura para el Parque Vehicular Nacional</span>
                 </div>
              </div>
            </div>
            <div className="relative h-80 w-full rounded-lg overflow-hidden shadow-lg">
                <Image
                    src="/Images/a7.png"
                    alt="Equipo de Polar Autopartes"
                    fill
                    objectFit="cover"
                    data-ai-hint="automotive parts warehouse"
                />
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="opiniones" className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-headline font-bold text-center text-primary mb-12">Opiniones de Nuestros Clientes</h2>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-6xl mx-auto"
            >
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1 h-full">
                      <Card className="flex flex-col h-full bg-card">
                        <CardHeader className="flex-grow">
                          <div className="flex items-center mb-4">
                            <Image src={testimonial.avatar} alt={testimonial.name} width={50} height={50} className="rounded-full mr-4" data-ai-hint="person portrait"/>
                            <div>
                              <p className="font-bold">{testimonial.name}</p>
                              <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                            </div>
                          </div>
                          <blockquote className="text-muted-foreground italic">"{testimonial.quote}"</blockquote>
                        </CardHeader>
                        <CardContent>
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-4 md:-left-8" />
              <CarouselNext className="-right-4 md:-right-8" />
            </Carousel>
          </div>
        </section>

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
        <section id="contacto" className="py-16">
          <div className="container mx-auto px-4">
             <h2 className="text-3xl font-headline font-bold text-center text-primary mb-12">Ponte en Contacto</h2>
            <div className="grid md:grid-cols-2 gap-12 bg-card p-8 rounded-lg shadow-lg">
                <div>
                    <h3 className="font-headline text-2xl font-bold mb-6">Envíanos un Mensaje</h3>
                    <form className="space-y-4">
                      <div>
                        <Label htmlFor="name-contact">Nombre</Label>
                        <Input id="name-contact" placeholder="Tu nombre completo" />
                      </div>
                        <div>
                        <Label htmlFor="email-contact">Email</Label>
                        <Input id="email-contact" type="email" placeholder="tu@email.com" />
                      </div>
                        <div>
                        <Label htmlFor="message-contact">Mensaje</Label>
                        <Textarea id="message-contact" placeholder="Escribe tu consulta aquí..." rows={5} />
                      </div>
                      <Button type="submit" className="w-full bg-primary hover:bg-primary/90">Enviar</Button>
                    </form>
                </div>
                 <div>
                     <h3 className="font-headline text-2xl font-bold mb-6">Información de Contacto</h3>
                     <div className="space-y-6 text-muted-foreground">
                        <div className="flex items-start gap-4">
                            <MapPin className="h-6 w-6 text-primary mt-1"/>
                            <div>
                                <p className="font-semibold text-foreground">Dirección</p>
                                <p>Jesus Cantu Leal #1423, Monterrey, Mexico</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Phone className="h-6 w-6 text-primary mt-1"/>
                             <div>
                                <p className="font-semibold text-foreground">Teléfonos</p>
                                <p>+52 81 1692 4693</p>
                                <p>WhatsApp: +52 1 81 1692 4693</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Mail className="h-6 w-6 text-primary mt-1"/>
                            <div>
                               <p className="font-semibold text-foreground">Correos</p>
                               <p>admon@polarautopartes.com</p>
                           </div>
                        </div>
                     </div>
                     <div className="mt-6 h-64 w-full bg-muted rounded-lg overflow-hidden relative">
                        <Image src="/Images/a8.png" alt="Mapa de ubicación" layout="fill" objectFit="cover" data-ai-hint="map location"/>
                     </div>
                 </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
