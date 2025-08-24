
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Car, MapPin, Phone, ShieldCheck, Star, ThumbsUp, Truck, Users, Wrench } from 'lucide-react';
import { mockLines, mockProducts } from '@/lib/mock-data';
import { SearchFilters } from '@/components/search-filters';
import { ProductCard } from '@/components/product-card';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

  const handleSearch = (criteria: any) => {
    const params = new URLSearchParams();
    if (criteria.keyword) params.set('keyword', criteria.keyword);
    if (criteria.brand) params.set('brand', criteria.brand);
    if (criteria.model) params.set('model', criteria.model);
    if (criteria.year) params.set('year', criteria.year);
    if (criteria.line) params.set('line', criteria.line);
    router.push(`/search?${params.toString()}`);
  };


  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[70vh] flex items-center justify-center text-white">
          <Image
            src="https://placehold.co/1920x1080.png"
            alt="Sistema de enfriamiento de un auto"
            layout="fill"
            objectFit="cover"
            className="absolute z-0 brightness-50"
            data-ai-hint="car engine cooling system"
          />
          <div className="relative z-10 text-center p-4">
            <h1 className="text-4xl md:text-6xl font-headline font-bold mb-4 drop-shadow-lg">
              Encuentra la Refacción Ideal para tu Auto
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto drop-shadow-md">
              Calidad y cobertura para el sistema de enfriamiento de tu vehículo.
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-10 py-6">
              <Link href="/search">Buscar Refacción</Link>
            </Button>
          </div>
        </section>

        {/* Search Block */}
        <section id="search" className="py-12 bg-muted">
            <div className="container mx-auto px-4">
                <SearchFilters onSearch={handleSearch} onClear={() => router.push('/search')} />
            </div>
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {mockLines.slice(0, 12).map((line) => (
                <Link key={line} href={`/search?line=${line}`}>
                  <Card className="group text-center p-4 transition-all hover:bg-primary hover:text-primary-foreground hover:shadow-xl hover:-translate-y-2 cursor-pointer h-full">
                    <CardContent className="flex flex-col items-center justify-center h-full p-2">
                      <Wrench className="h-10 w-10 mb-3 text-primary transition-colors group-hover:text-primary-foreground" />
                      <h3 className="font-headline font-semibold">{line}</h3>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
             <div className="text-center mt-12">
                <Button asChild variant="outline">
                    <Link href="/search">Explorar Todas las Líneas</Link>
                </Button>
            </div>
          </div>
        </section>
        
        {/* Featured Products */}
        <section id="destacados" className="py-16 bg-muted">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-headline font-bold text-center text-primary mb-12">Productos Destacados</h2>
                <div className="grid grid-cols-1 gap-6">
                    {mockProducts.slice(0, 2).map(product => (
                        <div key={product.id} className="relative">
                            <Badge className="absolute top-4 left-4 z-10 bg-accent text-accent-foreground">Más Vendido</Badge>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
                 <div className="text-center mt-12">
                    <Button asChild>
                        <Link href="/search">Ver Todo el Catálogo</Link>
                    </Button>
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
                    src="https://placehold.co/600x400.png"
                    alt="Equipo de Polar Autopartes"
                    layout="fill"
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
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                     {testimonials.map((testimonial, index) => (
                         <Card key={index} className="flex flex-col bg-card">
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
                                 <div className="flex text-yellow-400">
                                     {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
                                 </div>
                             </CardContent>
                         </Card>
                     ))}
                 </div>
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
                     <div className="mt-6 h-64 w-full bg-muted rounded-lg overflow-hidden relative">
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

