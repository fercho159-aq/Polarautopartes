import type { Product } from '@/types';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from './ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface FeaturedProductCardProps {
  product: Product;
}

export function FeaturedProductCard({ product }: FeaturedProductCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl group h-full flex flex-col">
      <div className="relative aspect-video w-full">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          data-ai-hint="car part"
        />
      </div>
      <CardContent className="p-4 flex flex-col flex-grow">
        <h3 className="font-headline text-lg font-bold text-primary truncate flex-grow">{product.name}</h3>
        <p className="text-sm text-muted-foreground mb-4">{product.line}</p>
        <div className="flex justify-between items-center mt-auto">
            <p className="font-mono text-xs bg-muted px-2 py-1 rounded-md">SKU: {product.sku}</p>
            <Button asChild variant="outline" size="sm">
                <Link href={`/products/${product.sku}`}>
                  Ver Detalles
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
