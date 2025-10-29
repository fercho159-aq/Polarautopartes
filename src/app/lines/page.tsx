

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { ContactSection } from '@/components/contact-section';
import { useEffect, useState } from 'react';
import { loadProductsFromCSV } from '@/lib/data-loader';

export default function AllLinesPage() {
  const [lines, setLines] = useState<string[]>([]);
  
  useEffect(() => {
    async function fetchLines() {
        const products = await loadProductsFromCSV();
        const uniqueLines = [...new Set(products.map(p => p.name))].sort();
        setLines(uniqueLines);
    }
    fetchLines();
  }, []);

  return (
    <>
    <div className="container mx-auto px-4 py-12">
      <section className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4">
          Todas Nuestras Líneas de Producto
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Explora nuestro completo catálogo de refacciones para el sistema de enfriamiento y más. Calidad y rendimiento para cada componente de tu vehículo.
        </p>
      </section>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {lines.map((line) => (
          <Link key={line} href={`/search?keyword=${encodeURIComponent(line)}`} className="group">
            <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col">
              <div className="relative h-40 w-full">
                <Image
                  src="/Images/10.png"
                  alt={line}
                  fill
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
    <ContactSection />
    </>
  );
}
