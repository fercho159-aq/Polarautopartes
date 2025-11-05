
'use client';

import { useEffect, useState } from 'react';
import { ProductList } from '@/components/product-list';
import type { Product } from '@/types';
import { loadProductsFromCSV } from '@/lib/data-loader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, AlertCircle } from 'lucide-react';
import { ContactSection } from '@/components/contact-section';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const fallas = [
  {
    falla: 'El motoventilador no enciende',
    causa: 'El bulbo no realiza su función cerrando el circuito; el bulbo o ventilador no tiene toma de tierra; alguna terminal floja o desconectada (en cualquier parte del circuito).',
    solucion: 'Realizar prueba de banco al bulbo, si este no realiza su función al alcanzar la temperatura determinada el bulbo está defectuoso, se recomienda el reemplazo. Revisar el circuito completo, especialmente terminales tanto del motoventilador, relay y/o bulbo de temperatura, revisar que estén bien conectados, libres de polvo, óxido o cualquier otro elemento que impida el flujo de corriente.'
  },
  {
    falla: 'Motoventilador siempre encendido',
    causa: 'El circuito interno del bulbo puede estar cerrado, lo que provoca el flujo de energía todo el tiempo.',
    solucion: 'Revisa la continuidad del bulbo, si éste tiene continuidad aún en frío el bulbo está defectuoso, se recomienda el reemplazo.'
  },
  {
    falla: 'Motoventilador con función intermitente',
    causa: 'Falso contacto en terminales o cableado del circuito.',
    solucion: 'El falso contacto puede ser ocasionado por el movimiento del automóvil, revisar que los cables del circuito estén debidamente sujetos con sus terminales a manera que con el movimiento del auto éstas permanezcan bien conectadas, si alguna terminal se encuentra muy abierta (por ejemplo en el Relay) es recomendable cambiarla. Si con la revisión anterior no se soluciona el problema, revisar con una prueba de banco el bulbo de temperatura, ya que la continuidad debe ser estable por encima de la temperatura determinada; si la continuidad es interrumpida el bulbo está defectuoso.'
  },
  {
    falla: 'El motoventilador se activa a muy altas temperaturas',
    causa: 'El circuito interno del bulbo puede estar cerrado, lo que provoca el flujo de energía todo el tiempo.',
    solucion: 'Realizar prueba de banco al bulbo, si éste realiza su función a una mayor temperatura que la especificada para el bulbo, reemplazarlo.'
  }
];


export default function MotoventiladoresPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const allProducts = await loadProductsFromCSV();
      const filtered = allProducts.filter(p => p.name.toLowerCase() === 'motoventilador');
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
          Motoventiladores
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Los motoventiladores tienen sus ventajas cuando se trata de los autos compactos donde el tamaño es el factor principal. Es pequeño, potente y se tiene un mejor control de la temperatura además que le resta esfuerzo al motor.
        </p>
         <p className="text-muted-foreground mt-2 max-w-3xl">
          Pueden montarse enfrente de la parrilla para empujar el aire o detrás del radiador para succionarlo. La mayoría de los motoventiladores están equipados con sensores térmicos que lo activan cuando alcanza altas temperaturas. En algunos vehículos se activan después de que el motor se ha apagado para llevar la temperatura de nuevo a las especificaciones normales.
        </p>
      </section>
      
      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline text-xl">
              <AlertCircle className="h-5 w-5 text-destructive" />
              Tabla de Fallas y Soluciones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-bold">Falla</TableHead>
                  <TableHead className="font-bold">Posible Causa</TableHead>
                  <TableHead className="font-bold">Solución</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fallas.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-semibold">{item.falla}</TableCell>
                    <TableCell>{item.causa}</TableCell>
                    <TableCell>{item.solucion}</TableCell>
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
                  Catálogo de Motoventiladores
              </CardTitle>
          </Header>
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
