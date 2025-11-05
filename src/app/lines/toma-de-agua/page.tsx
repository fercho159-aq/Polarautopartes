
'use client';

import { useEffect, useState } from 'react';
import { ProductList } from '@/components/product-list';
import type { Product } from '@/types';
import { loadProductsFromCSV } from '@/lib/data-loader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, CheckCircle, List } from 'lucide-react';
import { ContactSection } from '@/components/contact-section';

export default function TomaDeAguaPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const allProducts = await loadProductsFromCSV();
      const filtered = allProducts.filter(p => p.name.toLowerCase() === 'toma de agua');
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
          Toma de Agua
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Es la cubierta del termostato y soporta la salida del anticongelante cuando este se encuentra en la temperatura más alta del ciclo. Pueden ser fabricadas en aluminio o nylon acorde a especificaciones de OE (Equipo Original).
        </p>
         <p className="text-muted-foreground mt-2 max-w-3xl">
          Los Kits de Toma y Termostato garantizan el correcto funcionamiento e instalación acorde a especificaciones de OE. Incluye O'rings y sellos cuando son necesarios.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-1 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-headline text-xl">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        Tips de Reemplazo
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                    <p>Al momento de la instalación se recomienda limpiar la base del block donde va a ser instalada, así como verificar el buen estado de las mangueras.</p>
                    <p>También es recomendable usar abrazaderas de presión. En caso de usar abrazaderas de ajuste manual, ser generoso al momento de apretarlas ya que los brazos conectores suelen ser poco resistentes, en especial los fabricados en nylon.</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-headline text-xl">
                        <List className="h-5 w-5 text-primary" />
                        Componentes
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li>Tapa</li>
                        <li>Disco de Resorte</li>
                        <li>Sello superior</li>
                        <li>Válvula de vacío</li>
                        <li>Sello inferior</li>
                        <li>Toma de llenado</li>
                        <li>Resorte de presión</li>
                        <li>Resorte de vacío</li>
                    </ul>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-2">
            <Card>
                 <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-headline text-xl">
                        <Wrench className="h-5 w-5 text-primary" />
                        Catálogo de Tomas de Agua
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
