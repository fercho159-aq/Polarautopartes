
'use client';

import { useEffect, useState } from 'react';
import { ProductList } from '@/components/product-list';
import type { Product } from '@/types';
import { loadProductsFromCSV } from '@/lib/data-loader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Wrench } from 'lucide-react';
import { ContactSection } from '@/components/contact-section';

export default function BombaDeAguaPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const allProducts = await loadProductsFromCSV();
      const filtered = allProducts.filter(p => p.name.toLowerCase() === 'bomba de agua');
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
          Bomba de Agua
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          La bomba de agua se encarga de circular el líquido a través del circuito, proporcionando al refrigerante la presión y flujo necesarios en cualquier condición.
        </p>
        <p className="text-sm text-amber-700 mt-4 bg-amber-50 p-3 rounded-md border border-amber-200">
            <strong>Nota:</strong> Una correcta instalación puede prevenir severos daños en el motor, es necesario verificar la ruta de la banda de accesorios en el manual de taller.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-1">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-headline text-xl">
                        <AlertTriangle className="h-5 w-5 text-destructive" />
                        Causas de Falla Comunes
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li>Existencia de sarro y óxido en el sistema.</li>
                        <li>Uso de anticongelante de mala calidad.</li>
                        <li>Fugas en los sellos.</li>
                        <li>Balero amarrado.</li>
                        <li>Defecto de fabricación.</li>
                    </ul>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-2">
            <Card>
                 <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-headline text-xl">
                        <Wrench className="h-5 w-5 text-primary" />
                        Catálogo de Bombas de Agua
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

