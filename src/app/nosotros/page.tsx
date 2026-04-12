
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Target, Rocket, Heart, ShieldCheck, Globe, ThumbsUp, Star, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useState } from 'react';

const teamMembers = [
  {
    name: 'Juan Pérez',
    role: 'Director General',
    avatar: '/Images/WebPolar/Nosotros/director.jpg',
    bio: 'Con más de 20 años de experiencia en el sector automotriz, Juan lidera nuestra visión estratégica.'
  },
  {
    name: 'Ana García',
    role: 'Gerente de Ventas',
    avatar: '/Images/WebPolar/Nosotros/ventas.jpg',
    bio: 'Ana se asegura de que cada cliente reciba la mejor atención y encuentre la pieza perfecta.'
  },
  {
    name: 'Luis Hernández',
    role: 'Jefe de Almacén',
    avatar: '/Images/WebPolar/Nosotros/almacen.jpg',
    bio: 'Luis garantiza que nuestro inventario esté siempre al día y que los envíos salgan a tiempo.'
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
    quote: 'El catálogo es muy completo y fácil de usar. Siempre encuentro la pieza exacta que necesito para los modelos más comerciales. ¡Excelente servicio!',
    avatar: '/Images/5.png',
  },
  {
    name: 'Javier L.',
    role: 'Cliente Particular',
    quote: 'Compré un radiador para mi Passat y el ajuste fue perfecto. La entrega fue rápida y el empaque protegió muy bien la pieza. ¡Recomendado!',
    avatar: '/Images/5.png',
  },
];

const timeline = [
    { year: '2004', event: 'Nacimiento de Polar Autopartes', description: 'Fundamos la empresa con la misión de ofrecer refacciones de alta calidad para el sistema de enfriamiento.' },
    { year: '2010', event: 'Primera Expansión', description: 'Ampliamos nuestro catálogo para incluir nuevas líneas de productos y duplicamos nuestro almacén.' },
    { year: '2015', event: 'Lanzamiento E-commerce', description: 'Inauguramos nuestra primera tienda en línea, llegando a clientes en todo el país.' },
];

export default function NosotrosPage() {
  return (
    <div className="bg-white">
      {/* 1. Hero Section - using the designed hero image */}
      <section className="relative w-full">
        <div className="relative w-full aspect-[16/7] md:aspect-[16/5]">
          <Image
            src="/Images/WebPolar/Nosotros/hero-nosotros.png"
            alt="Conoce Quiénes Somos - Polar Autopartes"
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* 2. Years stat + Intro */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start gap-8 max-w-5xl mx-auto">
            <div className="shrink-0">
              <span className="text-6xl md:text-7xl font-headline font-bold text-polar-dark">20+</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Somos más que un distribuidor de autopartes; somos tu aliado de confianza para mantener los vehículos de México en movimiento. Desde 2004, nos dedicamos a resolver el principal problema de nuestros clientes: encontrar refacciones de calidad para el sistema de enfriamiento con la cobertura más amplia y un servicio excepcional.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Timeline Carousel */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <Carousel
            opts={{ align: "center", loop: true }}
            className="w-full max-w-4xl mx-auto"
          >
            <CarouselContent>
              {timeline.map((item, index) => (
                <CarouselItem key={index} className="md:basis-1/3">
                  <Card className={`text-center p-6 h-full ${index === 1 ? 'bg-polar-dark text-white shadow-xl scale-105' : 'bg-white'}`}>
                    <p className={`text-3xl font-headline font-bold mb-3 ${index === 1 ? 'text-white' : 'text-polar-dark'}`}>
                      {item.year}
                    </p>
                    <h3 className={`font-headline text-lg font-bold mb-2 ${index === 1 ? 'text-white' : 'text-foreground'}`}>
                      {item.event}
                    </h3>
                    <p className={`text-sm ${index === 1 ? 'text-white/80' : 'text-muted-foreground'}`}>
                      {item.description}
                    </p>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4 md:-left-8" />
            <CarouselNext className="-right-4 md:-right-8" />
          </Carousel>
        </div>
      </section>

      {/* 4. Misión / Visión / Valores */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-polar-dark/10 flex items-center justify-center mb-4">
                <Target className="h-8 w-8 text-polar-dark" />
              </div>
              <h3 className="font-headline text-xl font-bold mb-2">Misión</h3>
              <p className="text-muted-foreground text-sm">Proveer soluciones de enfriamiento automotriz confiables y accesibles, garantizando el rendimiento y la durabilidad que nuestros clientes merecen.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-polar-dark/10 flex items-center justify-center mb-4">
                <Rocket className="h-8 w-8 text-polar-dark" />
              </div>
              <h3 className="font-headline text-xl font-bold mb-2">Visión</h3>
              <p className="text-muted-foreground text-sm">Ser la empresa líder y de primera elección en México para refacciones del sistema de enfriamiento, reconocida por nuestra innovación, calidad y cobertura.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-polar-dark/10 flex items-center justify-center mb-4">
                <Heart className="h-8 w-8 text-polar-dark" />
              </div>
              <h3 className="font-headline text-xl font-bold mb-2">Valores</h3>
              <p className="text-muted-foreground text-sm">Proveer soluciones de enfriamiento automotriz confiables y accesibles, garantizando el rendimiento y la durabilidad que nuestros clientes merecen.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ¿Por qué elegir Polar Autopartes? */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-headline font-bold text-center mb-8">¿Por Qué Elegir Polar Autopartes?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="flex items-start gap-3">
              <div className="bg-polar-dark/10 p-2 rounded-full shrink-0">
                <ShieldCheck className="h-5 w-5 text-polar-dark" />
              </div>
              <div>
                <h4 className="font-bold text-sm mb-1">Calidad Garantizada</h4>
                <p className="text-muted-foreground text-xs">Solo ofrecemos productos que cumplen con los más altos estándares de la industria.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-polar-dark/10 p-2 rounded-full shrink-0">
                <Globe className="h-5 w-5 text-polar-dark" />
              </div>
              <div>
                <h4 className="font-bold text-sm mb-1">Amplia Cobertura</h4>
                <p className="text-muted-foreground text-xs">Nuestro catálogo cubre la mayoría de los vehículos que circulan en México.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-polar-dark/10 p-2 rounded-full shrink-0">
                <ThumbsUp className="h-5 w-5 text-polar-dark" />
              </div>
              <div>
                <h4 className="font-bold text-sm mb-1">Atención Personalizada</h4>
                <p className="text-muted-foreground text-xs">Nuestro equipo de expertos está listo para asesorarte en cada paso de tu compra.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Nuestro Equipo */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-headline font-bold text-center mb-2">Nuestro Equipo</h2>
          <p className="text-center text-muted-foreground text-sm mb-10 max-w-xl mx-auto">
            Detrás de cada pieza hay un equipo de profesionales apasionados por el mundo automotriz, listos para ayudarte.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member) => (
              <Card key={member.name} className="text-center border-0 shadow-md overflow-hidden">
                <div className="relative h-48 w-full bg-gray-100">
                  <Image src={member.avatar} alt={member.name} fill className="object-cover" />
                </div>
                <CardContent className="p-5">
                  <h4 className="font-headline text-lg font-bold">{member.name}</h4>
                  <p className="text-polar-dark text-sm font-medium mb-2">{member.role}</p>
                  <p className="text-xs text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Map + CTA */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
            <div className="relative h-[300px] rounded-2xl overflow-hidden">
              <Image
                src="/Images/a8.png"
                alt="Mapa de ubicación"
                fill
                className="object-cover"
                data-ai-hint="map location"
              />
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-headline font-bold mb-4">¿Listo para encontrar tu refacción?</h2>
              <p className="text-muted-foreground mb-6">
                Explora nuestro catálogo y descubre por qué miles de talleres y refaccionarias confían en nosotros.
              </p>
              <Button asChild size="lg" variant="outline" className="border-2 border-polar-dark text-polar-dark hover:bg-polar-dark hover:text-white font-bold px-8">
                <Link href="/lines">ir a productos</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Client testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-headline font-bold text-center mb-10">Lo que Dicen Nuestros Clientes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 bg-gray-200">
                  <Image src={t.avatar} alt={t.name} fill className="object-cover" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-sm text-polar-dark">{t.name}</span>
                    <span className="text-xs text-muted-foreground">{t.role}</span>
                  </div>
                  <p className="text-xs text-muted-foreground italic">"{t.quote}"</p>
                  <div className="flex mt-1">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
