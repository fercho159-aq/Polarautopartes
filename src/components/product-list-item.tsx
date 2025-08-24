import type { Product } from '@/types';
import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Badge } from './ui/badge';

interface ProductListItemProps {
  product: Product;
}

export function ProductListItem({ product }: ProductListItemProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-6 p-4 transition-shadow hover:shadow-lg rounded-lg bg-card border">
      <Link href={`/products/${product.sku}`} className="sm:w-1/4 flex-shrink-0">
          <div className="relative aspect-square w-full bg-card rounded-lg overflow-hidden border">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
              data-ai-hint="car part"
            />
          </div>
      </Link>
      <div className="flex-grow flex flex-col">
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
                <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
                <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
                    <CheckCircle className="h-4 w-4" />
                    <span>En Stock</span>
                </div>
            </div>
            <Button asChild className="w-full sm:w-auto">
                <Link href={`/products/${product.sku}`}>
                    Ver Detalles
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
        </div>
      </div>
    </div>
  );
}
