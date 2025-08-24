
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Award, Car, MapPin, Phone, ShieldCheck, Star, Users, Wrench } from 'lucide-react';
import { mockLines } from '@/lib/mock-data';

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
];


export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center text-white">
          <Image
            src="https://placehold.co/1920x1080.png"
            alt="Sistema de enfriamiento de un auto"
            layout="fill"
            objectFit="cover"
            className="absolute z-0 brightness-50"
            data-ai-hint="car engine cooling system"
          />
          <div className="relative z-10 text-center p-4">
            <h1 className="text-4xl md:text-6xl font-headline font-bold mb-4">
              La Refacción Ideal para tu Vehículo
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Calidad y cobertura para el sistema de enfriamiento de tu auto.
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/search">Ir al Catálogo</Link>
            </Button>
          </div>
        </section>

        {/* Nosotros Section */}
        <section id="nosotros" className="py-16 bg-card">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-headline font-bold text-primary mb-4">Sobre Polar Autopartes</h2>
              <p className="text-muted-foreground mb-4">
                Somos una empresa líder en la distribución de refacciones para el sistema de enfriamiento automotriz. Con más de 20 años de experiencia, nuestro compromiso es ofrecer productos de la más alta calidad y un servicio excepcional a nuestros clientes en todo México.
              </p>
              <div className="flex flex-col space-y-3">
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
            <div className="relative h-80 w-full">
                <Image
                    src="https://placehold.co/600x400.png"
                    alt="Equipo de Polar Autopartes"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg shadow-lg"
                    data-ai-hint="automotive parts warehouse"
                />
            </div>
          </div>
        </section>

        {/* Product Lines Section */}
        <section id="lineas" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-headline font-bold text-center text-primary mb-12">Nuestras Líneas de Producto</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {mockLines.slice(0, 12).map((line) => (
                <Link key={line} href={`/search?line=${line}`}>
                  <Card className="group text-center p-4 transition-all hover:bg-primary hover:text-primary-foreground hover:shadow-xl hover:-translate-y-2 cursor-pointer">
                    <CardContent className="flex flex-col items-center justify-center h-full">
                      <Wrench className="h-10 w-10 mb-3 text-primary transition-colors group-hover:text-primary-foreground" />
                      <h3 className="font-headline font-semibold">{line}</h3>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="opiniones" className="py-16 bg-muted">
            <div className="container mx-auto px-4">
                 <h2 className="text-3xl font-headline font-bold text-center text-primary mb-12">Opiniones de Nuestros Clientes</h2>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                     {testimonials.map((testimonial, index) => (
                         <Card key={index} className="flex flex-col">
                             <CardHeader className="flex-grow">
                                 <div className="flex items-center mb-4">
                                    <Image src={testimonial.avatar} alt={testimonial.name} width={50} height={50} className="rounded-full mr-4" data-ai-hint="person portrait"/>
                                    <div>
                                        <p className="font-bold">{testimonial.name}</p>
                                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                    </div>
                                 </div>
                                 <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                             </CardHeader>
                             <CardContent>
                                 <div className="flex text-yellow-500">
                                     {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
                                 </div>
                             </CardContent>
                         </Card>
                     ))}
                 </div>
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
                        <Label htmlFor="name">Nombre</Label>
                        <Input id="name" placeholder="Tu nombre completo" />
                      </div>
                        <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="tu@email.com" />
                      </div>
                        <div>
                        <Label htmlFor="message">Mensaje</Label>
                        <Textarea id="message" placeholder="Escribe tu consulta aquí..." rows={5} />
                      </div>
                      <Button type="submit" className="w-full bg-primary hover:bg-primary/90">Enviar</Button>
                    </form>
                </div>
                 <div>
                     <h3 className="font-headline text-2xl font-bold mb-6">Información de Contacto</h3>
                     <div className="space-y-4 text-muted-foreground">
                        <div className="flex items-start gap-4">
                            <MapPin className="h-6 w-6 text-primary mt-1"/>
                            <div>
                                <p className="font-semibold text-foreground">Dirección</p>
                                <p>Av. de las Partes 123, Col. Industrial, C.P. 54000, Tlalnepantla, Estado de México.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Phone className="h-6 w-6 text-primary mt-1"/>
                             <div>
                                <p className="font-semibold text-foreground">Teléfonos</p>
                                <p>Ventas: (55) 5555-1234</p>
                                <p>WhatsApp: (55) 9876-5432</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Users className="h-6 w-6 text-primary mt-1"/>
                            <div>
                               <p className="font-semibold text-foreground">Correos</p>
                               <p>Ventas: ventas@polarautopartes.com</p>
                               <p>Servicio Técnico: soporte@polarautopartes.com</p>
                           </div>
                        </div>
                     </div>
                     <div className="mt-6 h-64 w-full bg-muted rounded-lg overflow-hidden">
                        <Image src="https://placehold.co/600x400.png" alt="Mapa de ubicación" layout="fill" objectFit="cover" data-ai-hint="map location"/>
                     </div>
                 </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
