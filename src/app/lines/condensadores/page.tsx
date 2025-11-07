'use client';

import { useEffect, useState } from 'react';
import { ProductList } from '@/components/product-list';
import type { Product } from '@/types';
import { loadProductsFromCSV } from '@/lib/data-loader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, ShieldCheck, AlertCircle, Wind } from 'lucide-react';
import { ContactSection } from '@/components/contact-section';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const details = [
  {
    aspecto: 'Función',
    detalles: 'Forma parte del sistema de aire acondicionado (A/C). Su función es enfriar y condensar el gas refrigerante a alta presión que sale del compresor, convirtiéndolo de un gas caliente a un líquido caliente.'
  },
  {
    aspecto: 'Características',
    detalles: 'Es un intercambiador de calor (similar a un radiador), generalmente ubicado en la parte frontal del vehículo, delante del radiador del motor.'
  },
  {
    aspecto: 'Tipos',
    detalles: 'Por lo general, son de tubos y aletas de aluminio. La variación está en el diseño (tipo serpentine o parallel flow).'
  },
  {
    aspecto: 'Fallas Comunes',
    detalles: '1. Fugas de refrigerante (por impacto de piedras o corrosión). 2. Obstrucción de las aletas por suciedad, insectos o lodo (reduce la capacidad de enfriamiento). 3. Presión alta en el sistema (el condensador no puede liberar el calor de manera eficiente).'
  },
  {
    aspecto: 'Soluciones',
    detalles: '1. Limpieza externa de las aletas para asegurar el flujo de aire. 2. Reparación o reemplazo si hay fugas, seguido de una recarga de refrigerante y aceite del compresor. 3. Verificar que el ventilador de enfriamiento del condensador esté funcionando correctamente.'
  }
];

export default function CondensadoresPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const allProducts = await loadProductsFromCSV();
      const filtered = allProducts.filter(p => p.name.toLowerCase().includes('condensador'));
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
          Condensadores (A/C)
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          El componente clave que disipa el calor del refrigerante en tu sistema de aire acondicionado, asegurando que el aire frío llegue a la cabina.
        </p>
      </section>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline text-xl">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                    Guía Esencial del Condensador
                </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead className="font-bold w-[150px]">Aspecto</TableHead>
                            <TableHead className="font-bold">Detalles</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {details.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-semibold">{item.aspecto}</TableCell>
                                <TableCell>{item.detalles}</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-1">
            <Card>
                 <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-headline text-xl">
                        <Wrench className="h-5 w-5 text-primary" />
                        Catálogo de Condensadores
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
