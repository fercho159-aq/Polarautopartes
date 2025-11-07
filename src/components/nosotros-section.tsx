'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShieldCheck, Target, Users } from 'lucide-react';

export function NosotrosSection() {
  return (
    <section className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/Images/a2.png"
              alt="Instalaciones de Polar Autopartes"
              fill
              objectFit="cover"
              data-ai-hint="automotive parts warehouse"
            />
          </div>
          <div>
            <h2 className="text-3xl font-headline font-bold text-primary mb-4">
              Tu Aliado de Confianza en Autopartes
            </h2>
            <p className="text-muted-foreground mb-6">
              Desde 2004, en Polar Autopartes nos dedicamos a proveer soluciones de enfriamiento automotriz confiables y accesibles, garantizando el rendimiento y la durabilidad que nuestros clientes merecen en todo México.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full"><Target className="h-5 w-5 text-primary" /></div>
                <p className="text-muted-foreground"><strong className="text-foreground">Misión:</strong> Ser la empresa líder y de primera elección en México para refacciones del sistema de enfriamiento.</p>
              </div>
               <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full"><ShieldCheck className="h-5 w-5 text-primary" /></div>
                <p className="text-muted-foreground"><strong className="text-foreground">Calidad:</strong> Ofrecemos productos que cumplen con los más altos estándares de la industria.</p>
              </div>
            </div>
            <Button asChild size="lg">
              <Link href="/nosotros">
                Conoce más sobre nosotros
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}