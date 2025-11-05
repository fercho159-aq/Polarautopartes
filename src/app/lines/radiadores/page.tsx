
'use client';

import { useEffect, useState } from 'react';
import { ProductList } from '@/components/product-list';
import type { Product } from '@/types';
import { loadProductsFromCSV } from '@/lib/data-loader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, Info } from 'lucide-react';
import { ContactSection } from '@/components/contact-section';

export default function RadiadoresPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const allProducts = await loadProductsFromCSV();
      const filtered = allProducts.filter(p => p.name.toLowerCase() === 'radiador');
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
          Radiadores
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Se encarga de transferir el calor que el líquido refrigerante disipa en el interior del motor hacia el medio ambiente. El objetivo del radiador es enfriar el motor y mantenerlo en una temperatura óptima para su funcionamiento, garantizando la eficiencia del motor en periodos largos y con un rendimiento energético correcto.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-1">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-headline text-xl">
                        <Info className="h-5 w-5 text-primary" />
                        ¿Cómo funciona un Radiador?
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                    <p>Consiste en dos tanques fabricados en nylon que están conectados uno contra otro por medio de un núcleo (malla de tubos delgados y aletas).</p>
                    <p>Las mangueras se utilizan para unir el radiador al motor permitiendo la circulación al sistema. Estas se sujetan con abrazaderas metálicas a los tubos que salen de ambos elementos.</p>
                    <p>Los radiadores que tienen el tanque de entrada en la parte superior y el tanque de salida en la parte inferior se llaman radiadores de <strong>flujo vertical</strong>.</p>
                    <p>Los radiadores que poseen un tanque a cada lado se conocen como radiadores de <strong>flujo horizontal</strong>. En este tipo, el tanque de entrada está conectado con el termostato, mientras que el tanque de salida está conectado a la entrada de la bomba de agua.</p>
                    <p className="font-semibold text-foreground pt-2 border-t mt-4">Solo se utiliza material de primera calidad para la fabricación de estos productos, lo que garantiza un periodo de vida útil mucho mayor.</p>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-2">
            <Card>
                 <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-headline text-xl">
                        <Wrench className="h-5 w-5 text-primary" />
                        Catálogo de Radiadores
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
