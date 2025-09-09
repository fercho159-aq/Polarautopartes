
'use client';

import type { Product } from '@/types';
import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';
import { ArrowRight, CheckCircle, MessageSquareQuote } from 'lucide-react';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface ProductListItemProps {
  product: Product;
}

export function ProductListItem({ product }: ProductListItemProps) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-card p-4 transition-shadow hover:shadow-lg">
        <div className="flex flex-col sm:flex-row sm:gap-6">
          <Link href={`/products/${product.sku}`} className="flex-shrink-0 sm:w-1/4">
              <div className="relative aspect-square w-full overflow-hidden rounded-lg border bg-card">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
                  data-ai-hint="car part"
                />
              </div>
          </Link>
          <div className="mt-4 flex-grow flex flex-col sm:mt-0">
            <div>
                <Link href={`/products/${product.sku}`}>
                    <h3 className="font-headline text-xl font-bold text-primary hover:underline">{product.name}</h3>
                </Link>
                <p className="text-sm text-muted-foreground mt-1">{product.line}</p>
                <p className="text-sm mt-2 line-clamp-2">{product.description}</p>
                <div className="flex flex-wrap gap-2 mt-3 text-xs">
                  <Badge variant="secondary">SKU: {product.sku}</Badge>
                  <Badge variant="secondary">OEM: {product.oem || 'N/A'}</Badge>
                  <Badge variant="secondary">Marca: {product.brand}</Badge>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mt-4 sm:mt-auto pt-4 border-t sm:border-0">
                <div className='mb-4 sm:mb-0'>
                    <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
                        <CheckCircle className="h-4 w-4" />
                        <span>En Stock</span>
                    </div>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Button asChild variant="outline" className="w-full sm:w-auto">
                         <Link href={`/contact?sku=${product.sku}&product_name=${encodeURIComponent(product.name)}`}>
                            <MessageSquareQuote className="mr-2 h-4 w-4"/>
                            Cotizar
                        </Link>
                    </Button>
                    <Button asChild className="w-full sm:w-auto">
                        <Link href={`/products/${product.sku}`}>
                            Ver Detalles
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
          </div>
      </div>
      
      <div className="mt-2">
        <h4 className="text-sm font-semibold text-primary mb-2">Modelos Compatibles ({product.applications.length})</h4>
        <div className="max-h-60 overflow-y-auto border rounded-lg">
          <Table>
            <TableHeader className="sticky top-0 bg-muted">
              <TableRow>
                <TableHead className="font-bold">Marca</TableHead>
                <TableHead className="font-bold">Modelo</TableHead>
                <TableHead className="font-bold">Motor</TableHead>
                <TableHead className="font-bold">Años</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {product.applications.map((app, index) => (
                <TableRow key={index} className={index % 2 === 0 ? 'bg-muted/50' : 'bg-card'}>
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
