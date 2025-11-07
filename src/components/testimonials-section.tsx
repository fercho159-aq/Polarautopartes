'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Star } from 'lucide-react';

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


export function TestimonialsSection() {
    return (
        <section id="opiniones" className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-headline font-bold text-center text-primary mb-12">Lo que Dicen Nuestros Clientes</h2>
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
              <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10 -translate-x-8 hidden md:flex" />
              <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10 translate-x-8 hidden md:flex" />
            </Carousel>
          </div>
        </section>
    );
}