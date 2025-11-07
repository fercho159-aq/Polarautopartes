'use client';

import { useEffect, useState } from 'react';
import { ProductList } from '@/components/product-list';
import type { Product } from '@/types';
import { loadProductsFromCSV } from '@/lib/data-loader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, ShieldCheck, AlertCircle, Droplet } from 'lucide-react';
import { ContactSection } from '@/components/contact-section';

export default function ManguerasPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const allProducts = await loadProductsFromCSV();
      const filtered = allProducts.filter(p => p.name.toLowerCase().includes('manguera'));
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
          <Droplet className="h-10 w-10" />
          Mangueras de Radiador y Calefacción
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Conducen el anticongelante/refrigerante entre el motor, el radiador y el sistema de calefacción, soportando la presión y la alta temperatura del refrigerante.
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
                   <p><strong>Mangueras de Radiador:</strong> Más gruesas (superior e inferior), transportan el flujo principal de refrigerante.</p>
                   <p><strong>Mangueras de Calefacción:</strong> Más delgadas, llevan refrigerante al núcleo de calefacción de la cabina y lo retornan.</p>
                   <p>Están fabricadas de caucho sintético reforzado con malla interna para resistir altas presiones y temperaturas.</p>
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
                   <p>Fallas comunes incluyen fugas, hinchazón, endurecimiento o aplastamiento. La solución principal es el reemplazo preventivo o correctivo de la manguera dañada.</p>
                   <p className="font-semibold">Es crucial usar el anticongelante correcto y realizar inspecciones periódicas para evitar el deterioro.</p>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-2">
            <Card>
                 <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-headline text-xl">
                        <Wrench className="h-5 w-5 text-primary" />
                        Catálogo de Mangueras
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
