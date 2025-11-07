'use client';

import { useEffect, useState } from 'react';
import { ProductList } from '@/components/product-list';
import type { Product } from '@/types';
import { loadProductsFromCSV } from '@/lib/data-loader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, Thermometer, Droplets, FlaskConical, AlertTriangle, ShieldCheck, HeartPulse, Recycle } from 'lucide-react';
import { ContactSection } from '@/components/contact-section';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const details = [
  {
    aspecto: 'Función',
    detalles: '1. Evitar la congelación del agua en el sistema en invierno. 2. Elevar el punto de ebullición en verano. 3. Proteger el sistema contra la corrosión, el óxido y la cavitación.'
  },
  {
    aspecto: 'Características',
    detalles: 'Compuesto de agua destilada y Etilenglicol/Propilenglicol. Contiene aditivos inhibidores de corrosión y colorantes para identificar el tipo y fugas.'
  },
  {
    aspecto: 'Tipos',
    detalles: 'Inorgánicos (IAT - vida corta), Orgánicos (OAT - vida extendida), Híbridos (HOAT/Si-OAT - combinación para protección superior, común en autos modernos).'
  },
  {
    aspecto: 'Fallas Comunes',
    detalles: 'Pérdida de propiedades anticorrosivas (se acidifica), nivel bajo (fugas), o mezcla incorrecta (uso de agua de la llave que deja sedimentos).'
  },
  {
    aspecto: 'Soluciones',
    detalles: 'Reemplazo periódico según el manual (ej. cada 2-5 años), usar únicamente el tipo y concentración recomendada, y purgar el sistema al cambiarlo.'
  }
];

export default function AnticongelantesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const allProducts = await loadProductsFromCSV();
      // Since antifreeze itself is a consumable, we show related parts.
      const filtered = allProducts.filter(p => p.line.toLowerCase().includes('depósito de anticongelante'));
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
          <Droplets className="h-10 w-10" />
          Anticongelantes (Refrigerantes)
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          El fluido vital que protege tu motor del calor extremo y del frío intenso, garantizando su funcionamiento óptimo y previniendo la corrosión.
        </p>
      </section>
      
      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline text-xl">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Guía Esencial del Anticongelante
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


      <Card>
           <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline text-xl">
                  <Wrench className="h-5 w-5 text-primary" />
                  Productos Relacionados
              </CardTitle>
               <p className="text-sm text-muted-foreground pt-2">Aunque no vendemos el líquido, te ofrecemos las partes esenciales para contenerlo y gestionarlo.</p>
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