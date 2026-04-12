
'use client';

import type { Product } from '@/types';
import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface ProductListItemProps {
  product: Product;
}

export function ProductListItem({ product }: ProductListItemProps) {
  const whatsappMessage = encodeURIComponent(`Hola, me interesa cotizar: ${product.name} - SKU: ${product.sku}`);
  const whatsappUrl = `https://wa.me/5218116924693?text=${whatsappMessage}`;

  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-white p-4 transition-shadow hover:shadow-lg">
        <div className="flex flex-col sm:flex-row sm:gap-6">
          <Link href={`/products/${product.sku}`} className="flex-shrink-0 sm:w-1/4">
              <div className="relative aspect-square w-full overflow-hidden rounded-lg border bg-gray-50">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-contain p-2"
                  data-ai-hint="car part"
                />
              </div>
          </Link>
          <div className="mt-4 flex-grow flex flex-col sm:mt-0">
            <div>
                <Link href={`/products/${product.sku}`}>
                    <h3 className="font-headline text-xl font-bold text-polar-dark hover:underline">{product.name}</h3>
                </Link>
                <p className="text-sm text-muted-foreground mt-1 uppercase">{product.line}</p>
                <div className="flex flex-wrap gap-4 mt-2 text-xs text-muted-foreground">
                  <span>SKU: {product.sku}</span>
                  <span>Marca: {product.brand}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-green-600 mt-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>En Stock</span>
                </div>
            </div>
            <div className="flex items-center gap-2 mt-4">
                <Button asChild className="bg-green-500 hover:bg-green-600 text-white">
                     <Link href={whatsappUrl} target="_blank">
                        <FaWhatsapp className="mr-2 h-4 w-4"/>
                        Cotizar
                    </Link>
                </Button>
                <Button asChild className="bg-polar-dark hover:bg-polar-dark/90 text-white">
                    <Link href={`/products/${product.sku}`}>
                        Ver Detalles
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
          </div>
      </div>

      <div className="mt-2">
        <h4 className="text-sm font-semibold text-polar-dark mb-2">Modelos Compatibles ({product.applications.length})</h4>
        <div className="max-h-60 overflow-y-auto border rounded-lg">
          <Table>
            <TableHeader className="sticky top-0 bg-gray-100">
              <TableRow>
                <TableHead className="font-bold text-foreground">Marca</TableHead>
                <TableHead className="font-bold text-foreground">Modelo</TableHead>
                <TableHead className="font-bold text-foreground">Motor</TableHead>
                <TableHead className="font-bold text-foreground">Años</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {product.applications.map((app, index) => (
                <TableRow key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <TableCell>{app.brand}</TableCell>
                  <TableCell>{app.model}</TableCell>
                  <TableCell>{app.motor}</TableCell>
                  <TableCell>{app.years}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
