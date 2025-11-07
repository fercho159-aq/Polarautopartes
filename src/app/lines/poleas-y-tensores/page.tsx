'use client';

import { useEffect, useState } from 'react';
import { ProductList } from '@/components/product-list';
import type { Product } from '@/types';
import { loadProductsFromCSV } from '@/lib/data-loader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, ShieldCheck, AlertCircle, Settings } from 'lucide-react';
import { ContactSection } from '@/components/contact-section';

export default function PoleasYTensoresPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const allProducts = await loadProductsFromCSV();
      const productNamesToFilter = [
        'polea',
        'tensor',
      ];
      const filtered = allProducts.filter(p => productNamesToFilter.some(name => p.name.toLowerCase().includes(name)));
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
          Poleas y Tensores
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Las poleas transfieren la fuerza del motor a los accesorios mediante la banda, mientras que los tensores mantienen la tensión correcta para un agarre sin deslizamientos ni ruidos.
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
                   <p><strong>Poleas Locas/Guía:</strong> Simplemente guían la banda.</p>
                   <p><strong>Tensores:</strong> Aplican una fuerza constante (mecánica o hidráulica) sobre la banda para mantener la tensión.</p>
                   <p><strong>Tipos de Tensores:</strong> Manuales (ajustados con tornillos) y Automáticos/Hidráulicos (se autoajustan).</p>
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
                   <p>Ruidos (chillidos) por baleros secos o dañados y tensores sin fuerza son fallas comunes.</p>
                   <p className="font-semibold">La solución es el reemplazo del componente dañado. Es crucial verificar el estado de la banda al momento del cambio.</p>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-2">
            <Card>
                 <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-headline text-xl">
                        <Wrench className="h-5 w-5 text-primary" />
                        Catálogo de Poleas y Tensores
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
