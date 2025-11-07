'use client';

import { useEffect, useState } from 'react';
import { ProductList } from '@/components/product-list';
import type { Product } from '@/types';
import { loadProductsFromCSV } from '@/lib/data-loader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, ShieldCheck, AlertCircle, Tool } from 'lucide-react';
import { ContactSection } from '@/components/contact-section';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const fallas = [
  {
    aspecto: 'Función',
    detalles: 'Fijan el motor y la transmisión al chasis del vehículo. Su propósito principal es amortiguar las vibraciones y los movimientos (torsión) producidos por el motor para que no se transmitan a la cabina.'
  },
  {
    aspecto: 'Características',
    detalles: 'Construidos con metal y un bloque de caucho/goma resistente, a veces con fluidos hidráulicos o vacío para mayor amortiguación (soportes hidráulicos/de vacío).'
  },
  {
    aspecto: 'Tipos',
    detalles: 'De goma/mecánicos (los más comunes), Hidráulicos (contienen fluido para absorber mejor vibraciones lentas), De Vacío (usan una manguera de vacío para endurecerse a altas revoluciones).'
  },
  {
    aspecto: 'Fallas Comunes',
    detalles: '1. Rotura o cuarteo de la goma (por envejecimiento, calor o aceite). 2. Soporte colapsado (la parte metálica toca o está muy cerca, eliminando la amortiguación).'
  },
  {
    aspecto: 'Soluciones',
    detalles: '1. Reemplazo de los soportes defectuosos. Se recomienda revisar todos, ya que el fallo de uno acelera el desgaste de los demás. 2. Identificar y corregir fugas de aceite o fluidos que puedan dañar la goma.'
  }
];

export default function SoportesMotorPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const allProducts = await loadProductsFromCSV();
      const productNamesToFilter = [
        'soporte de motor',
        'soporte de transmision',
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
          Soportes de Motor y de Transmisión
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Fijan el motor y la transmisión al chasis, amortiguando vibraciones y movimientos para que no se transmitan a la cabina.
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
                   <p><strong>Mecánicos:</strong> Los más comunes, usan un bloque de goma resistente.</p>
                   <p><strong>Hidráulicos:</strong> Contienen fluido para una absorción superior de vibraciones lentas.</p>
                   <p><strong>De Vacío:</strong> Utilizan vacío para endurecerse a altas revoluciones, mejorando la estabilidad.</p>
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
                   <p>La goma puede romperse por calor, aceite o envejecimiento. Un soporte colapsado genera vibraciones y ruidos excesivos.</p>
                   <p className="font-semibold">Se recomienda reemplazar todos los soportes si uno falla y corregir cualquier fuga de fluido que pueda dañarlos.</p>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-2">
            <Card>
                 <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-headline text-xl">
                        <Wrench className="h-5 w-5 text-primary" />
                        Catálogo de Soportes
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
