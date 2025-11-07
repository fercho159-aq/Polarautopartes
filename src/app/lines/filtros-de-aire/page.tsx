'use client';

import { useEffect, useState } from 'react';
import { ProductList } from '@/components/product-list';
import type { Product } from '@/types';
import { loadProductsFromCSV } from '@/lib/data-loader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, ShieldCheck, AlertCircle, Wind } from 'lucide-react';
import { ContactSection } from '@/components/contact-section';

export default function FiltrosDeAirePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const allProducts = await loadProductsFromCSV();
      const filtered = allProducts.filter(p => p.name.toLowerCase().includes('filtro de aire'));
      setProducts(filtered);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return (
    <>
    <div className="container mx-auto px-4 py-12">
      <section className="mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4 flex items-center gap-3">
          <Wind className="h-10 w-10" />
          Filtros de Aire (Motor)
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Retienen las partículas de polvo, suciedad e impurezas del aire que entra al motor para la combustión, protegiendo los componentes internos.
        </p>
      </section>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-1 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-headline text-xl">
                        <ShieldCheck className="h-5 w-5 text-primary" />
                        Función y Tipos
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                   <p><strong>Función:</strong> Protege cilindros, pistones y el sensor MAF de daños por contaminantes.</p>
                   <p><strong>Tipos Comunes:</strong> Papel (desechables), Algodón (lavables, alto flujo) y Espuma (competición/off-road).</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-headline text-xl">
                        <AlertCircle className="h-5 w-5 text-destructive" />
                        Fallas y Soluciones
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                   <p>La falla principal es la obstrucción, que reduce el flujo de aire. Un marco roto permite el paso de aire sin filtrar.</p>
                   <p className="font-semibold">La solución es el reemplazo periódico (cada 15,000-30,000 km) o la limpieza si es un filtro de alto flujo.</p>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-2">
            <Card>
                 <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-headline text-xl">
                        <Wrench className="h-5 w-5 text-primary" />
                        Catálogo de Filtros de Aire
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
      </div>
    </div>
    <ContactSection />
    </>
  );
}
