
import Link from 'next/link';
import Image from 'next/image';
import { mockLines } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

export default function AllLinesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4">
          Todas Nuestras Líneas de Producto
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Explora nuestro completo catálogo de refacciones para el sistema de enfriamiento y más. Calidad y rendimiento para cada componente de tu vehículo.
        </p>
      </section>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {mockLines.map((line) => (
          <Link key={line} href={`/search?line=${encodeURIComponent(line)}`} className="group">
            <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col">
              <div className="relative h-40 w-full">
                <Image
                  src="https://placehold.co/400x300.png"
                  alt={line}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 group-hover:scale-110"
                  data-ai-hint="car part"
                />
              </div>
              <CardContent className="p-4 text-center flex-grow flex flex-col justify-center">
                <h3 className="font-headline font-semibold text-base">{line}</h3>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
