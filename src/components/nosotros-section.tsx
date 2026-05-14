'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShieldCheck, Target } from 'lucide-react';

export function NosotrosSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-0 items-stretch rounded-xl overflow-hidden shadow-lg max-w-5xl mx-auto">
          {/* Image side */}
          <div className="relative min-h-[350px]">
            <Image
              src="/Images/WebPolar/Contacto/tienda-2.png"
              alt="Polar Autopartes"
              fill
              className="object-cover"
            />
            <div className="absolute top-4 left-4">
              <Image src="/Images/polar-logo-white.png" alt="Polar Logo" width={92} height={30} />
            </div>
          </div>
          {/* Text side */}
          <div className="bg-white p-8 flex flex-col justify-center">
            <h2 className="text-2xl font-headline font-bold text-polar-dark mb-4">
              Tu Aliado de Confianza en Autopartes
            </h2>
            <p className="text-muted-foreground text-sm mb-6">
              Desde 2004, en Polar Autopartes nos dedicamos a proveer soluciones de enfriamiento automotriz confiables y accesibles, garantizando el rendimiento y la durabilidad que nuestros clientes merecen en todo México.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="bg-polar-cyan/20 p-2 rounded-full shrink-0">
                  <Target className="h-4 w-4 text-polar-dark" />
                </div>
                <p className="text-sm text-muted-foreground"><strong className="text-foreground">Misión:</strong> Ser la empresa líder y de primera elección en México para refacciones del sistema de enfriamiento.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-polar-cyan/20 p-2 rounded-full shrink-0">
                  <ShieldCheck className="h-4 w-4 text-polar-dark" />
                </div>
                <p className="text-sm text-muted-foreground"><strong className="text-foreground">Calidad:</strong> Ofrecemos productos que cumplen con los más altos estándares de la industria.</p>
              </div>
            </div>
            <Button asChild className="bg-polar-dark hover:bg-polar-dark/90 text-white w-fit">
              <Link href="/nosotros">
                Conoce más sobre nosotros
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
