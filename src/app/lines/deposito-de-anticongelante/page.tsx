'use client';

import { useEffect, useState } from 'react';
import { ProductList } from '@/components/product-list';
import type { Product } from '@/types';
import { loadProductsFromCSV } from '@/lib/data-loader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Info, CheckCircle, Wrench } from 'lucide-react';
import { ContactSection } from '@/components/contact-section';

export default function DepositoDeAnticongelantePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const allProducts = await loadProductsFromCSV();
      
      // La comparación se corrige aquí (todo en minúsculas)
      const filtered = allProducts.filter(p => p.name.toLowerCase() == 'depósito de anticongelante');
      
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
          Depósito de Anticongelante
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Este elemento permite conocer el estado y nivel del líquido refrigerante, además de su carga y presión adecuada. El depósito está complementado por un tapón que permite un control absoluto de la presión.
        </p>
         <p className="text-sm text-muted-foreground mt-2 max-w-3xl">
          Si el tapón se encuentra en mal estado, provocará un desequilibrio en la presión que consecuentemente llevará a un sobrecalentamiento.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-1 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-headline text-xl">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        Recomendaciones
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                        <li>Revisar el nivel del líquido observando las marcas de MAX y MIN en el exterior del depósito.</li>
                        <li>Probar el tapón del recuperador y del radiador con un medidor de presión; si difiere de la especificación, reemplazarlo.</li>
                        <li>Si el nivel del líquido es bajo, rellenar con una mezcla de anticongelante-agua (proporción 3 a 1).</li>
                    </ol>
                </CardContent>
            </Card>
             <Card className="bg-amber-50 border-amber-200">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-headline text-lg text-amber-800">
                        <AlertTriangle className="h-5 w-5" />
                        PRECAUCIÓN
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-amber-700">
                   <p>¡Antes de remover el tapón, verificar que la temperatura del radiador haya disminuido!</p>
                </CardContent>
            </Card>
             <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-headline text-lg text-blue-800">
                        <Info className="h-5 w-5" />
                        TIP
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-blue-700">
                   <p>Cuando se reemplace el depósito, se recomienda el cambio de tapón.</p>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-2">
            <Card>
                 <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-headline text-xl">
                        <Wrench className="h-5 w-5 text-primary" />
                        Catálogo de Depósitos
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
