
'use client';

import { useEffect, useState } from 'react';
import { ProductList } from '@/components/product-list';
import type { Product } from '@/types';
import { loadProductsFromCSV } from '@/lib/data-loader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Wrench } from 'lucide-react';
import { ContactSection } from '@/components/contact-section';

export default function TaponesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const allProducts = await loadProductsFromCSV();
      const productNamesToFilter = [
        'tapón de radiador',
        'tapón para depósito de anticongelante',
      ];
      const filtered = allProducts.filter(p => productNamesToFilter.includes(p.name.toLowerCase()));
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
          Tapones de Radiador y Depósito de Anticongelante
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
            En la posición normal tanto las válvulas de presión y de vacío de la tapa permanecen cerradas. La presión en el sistema de refrigeración aumenta a medida que sube la temperatura.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-lg">Liberación de Presión</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">Cuando la presión excede el nivel nominal, la válvula de presión se abre para liberar el exceso hacia el depósito de recuperación.</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-lg">Retorno del Refrigerante</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">Al enfriarse, se crea un vacío. La válvula de vacío se abre para permitir que el refrigerante retorne al radiador, evitando daños en mangueras.</p>
            </CardContent>
        </Card>
        <div className="md:col-span-2 lg:col-span-1">
            <Card className="bg-amber-50 border-amber-200 h-full">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-headline text-xl text-amber-800">
                        <AlertTriangle className="h-5 w-5" />
                        ¡IMPORTANTE!
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-amber-700 space-y-4">
                    <p>Siempre reemplaza el tapón por otro con el mismo número de presión determinado por el fabricante.</p>
                    <p className="font-bold">Por ejemplo, si tu automóvil usa un tapón de 13 libras, es necesario reemplazarlo por otro del mismo libraje para asegurar el correcto funcionamiento y la seguridad del sistema.</p>
                </CardContent>
            </Card>
        </div>
      </div>

      <Card>
           <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline text-xl">
                  <Wrench className="h-5 w-5 text-primary" />
                  Catálogo de Tapones
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
