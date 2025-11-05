
'use client';

import { useEffect, useState } from 'react';
import { ProductList } from '@/components/product-list';
import type { Product } from '@/types';
import { loadProductsFromCSV } from '@/lib/data-loader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, CheckCircle, Info, Settings } from 'lucide-react';
import { ContactSection } from '@/components/contact-section';
import Image from 'next/image';

export default function TubosDeEnfriamientoPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const allProducts = await loadProductsFromCSV();
      const filtered = allProducts.filter(p => p.name.toLowerCase() === 'tubo de enfriamiento');
      setProducts(filtered);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return (
    <>
    <div className="container mx-auto px-4 py-12">
      <section className="mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4">
          Tubos de Enfriamiento
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          El tubo de enfriamiento del motor es un elemento de gran importancia para el sistema. Su vida está directamente relacionada con el mantenimiento y reposición de líquido refrigerante (anticongelante).
        </p>
        <p className="text-sm text-amber-700 mt-4 bg-amber-50 p-3 rounded-md border border-amber-200 max-w-3xl">
          Cuando el anticongelante no es el correcto, el tubo libera una capa de corrosión que circula en el sistema, afectando todos los componentes.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-1 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-headline text-xl">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        Puntos Clave
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
                        <li>Mantener el nivel correcto de líquido refrigerante.</li>
                        <li>Mantener la presión del sistema con el tapón adecuado.</li>
                        <li>Nunca remover el termostato.</li>
                        <li>Reemplazar el líquido refrigerante periódicamente.</li>
                    </ol>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-headline text-xl">
                        <Settings className="h-5 w-5 text-primary" />
                        Tips de Reemplazo
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground text-sm">
                    <p>Al efectuar un reemplazo, asegúrese de utilizar abrazaderas que no dañen la superficie de la manguera y que el apriete sea el correcto para evitar fugas.</p>
                    <p>Revisa el O-ring y reemplázalo de ser necesario, ya que por las variaciones de temperatura pierden sus propiedades.</p>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-2 space-y-6">
            <Card>
                 <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-headline text-xl">
                        <Info className="h-5 w-5 text-primary" />
                        Funcionamiento y Materiales
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                    <p>Los tubos pueden ser fabricados de Nylon, Aluminio o Fierro Tropicalizado.</p>
                    <p>Algunos motores cuentan hasta con 2 tubos de enfriamiento. Por ejemplo, en un motor Honda 1.7 litros (Civic 2001-2005), un tubo sale de la base de la bomba de agua y se conecta a una manguera, mientras que otro tubo sale de la manguera y se conecta al housing del termostato.</p>
                    <div className="relative aspect-video w-full bg-muted rounded-lg mt-4 overflow-hidden">
                      <Image
                        src="https://picsum.photos/seed/honda-engine/800/450"
                        alt="Diagrama de motor Honda 1.7L"
                        fill
                        objectFit="cover"
                        data-ai-hint="engine diagram"
                      />
                       <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <p className="text-white font-bold text-center p-4">Diagrama de ejemplo: Motor Honda 1.7L</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
      <Card>
           <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline text-xl">
                  <Wrench className="h-5 w-5 text-primary" />
                  Catálogo de Tubos de Enfriamiento
              </CardTitle>
          </CardHeader>
          <CardContent>
              {isLoading ? (
                  <div className="text-center py-16">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                      <p className="mt-4 text-muted-foreground">Cargando productos...</p>
                  </div>
              ) : (
                  <ProductList products={products} />
              )}
          </CardContent>
      </Card>
    </div>
    <ContactSection />
    </>
  );
}
