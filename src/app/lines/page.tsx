'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const productCategories = [
    { name: 'Bomba de Agua', href: '/lines/bomba-de-agua', image: '/Images/Categorias/BOMBAS DE AGUA/BOMBA DE AGUA.jpg' },
    { name: 'Depósito de Anticongelante', href: '/lines/deposito-de-anticongelante', image: '/Images/Categorias/DEPOSITOS DE ANTICONGELANTE/DEPOSITO DE ANTICONGELANTE 1.jpg' },
    { name: 'Anticongelantes', href: '/lines/anticongelantes', image: '/Images/Categorias/DEPOSITOS DE ANTICONGELANTE/DEPOSITO DE ANTICONGELANTE 2.jpg' },
    { name: 'Filtros de Aire', href: '/lines/filtros-de-aire', image: '/Images/Categorias/FILTROS DE AIRE/FILTRO DE AIRE 3.jpg' },
    { name: 'Mangueras', href: '/lines/mangueras', image: '/Images/Categorias/MANGUERAS/MANGUERA 1.jpg' },
    { name: 'Motoventiladores', href: '/lines/motoventiladores', image: '/Images/Categorias/MOTOVENTILADORES/MOTOVENTILADOR 1.jpg' },
    { name: 'Poleas y Tensores', href: '/lines/poleas-y-tensores', image: '/Images/Categorias/POLEAS/POLEA 1.jpg' },
    { name: 'Radiadores', href: '/lines/radiadores', image: '/Images/Categorias/RADIADORES/RADIADOR 1.jpg' },
    { name: 'Soportes de Motor', href: '/lines/soportes-de-motor-y-transmision', image: '/Images/Categorias/SOPORTES DE MOTOR Y TRANSMISION/SOPORTE DE MOTOR 1.png' },
    { name: 'Tapones', href: '/lines/tapones', image: '/Images/Categorias/TAPONES DE DEPOSITO Y RADIADOR/TAPON DE DEPOSITO DE ANTICONGELANTE 1.jpg' },
    { name: 'Tomas de Agua', href: '/lines/toma-de-agua', image: '/Images/Categorias/TOMAS DE AGUA/TOMA DE AGUA 1.jpg' },
    { name: 'Tubos de Enfriamiento', href: '/lines/tubos-de-enfriamiento', image: '/Images/Categorias/TUBOS DE ENFRIAMIENTO/TUBO DE ENFRIAMIENTO 1.jpg' },
    { name: 'Condensadores', href: '/lines/condensadores', image: '/Images/Categorias/CONDENSADORES/CONDENSADOR 1.jpg' },
];

export default function AllLinesPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero banner */}
      <section className="relative w-full">
        <div className="container mx-auto px-4 py-4">
          <Carousel className="w-full" opts={{ loop: true }}>
            <CarouselContent>
              <CarouselItem>
                <div className="relative w-full aspect-[16/5] rounded-lg overflow-hidden">
                  <Image
                    src="/Images/WebPolar/Productos/banner.jpg"
                    alt="Polar Autopartes - El Stock Más Completo"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </CarouselItem>
            </CarouselContent>
          </Carousel>
        </div>
      </section>

      {/* Product Categories Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">PRODUCTOS</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {productCategories.map((cat) => (
              <Link key={cat.name} href={cat.href} className="group">
                <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col border-0 shadow-md">
                  <div className="relative h-48 w-full bg-gray-50">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-contain p-4 transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="bg-polar-dark text-white py-3 px-4 text-center rounded-b-lg">
                    <h3 className="font-headline font-semibold text-sm md:text-base">{cat.name}</h3>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
