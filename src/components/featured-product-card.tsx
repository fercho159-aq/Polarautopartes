import type { Product } from '@/types';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from './ui/button';
import Link from 'next/link';

interface FeaturedProductCardProps {
  product: Product;
}

export function FeaturedProductCard({ product }: FeaturedProductCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl group">
      <div className="relative aspect-video w-full">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          data-ai-hint="car part"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-headline text-lg font-bold text-primary truncate">{product.name}</h3>
        <p className="text-sm text-muted-foreground">{product.line}</p>
        <div className="flex justify-between items-center mt-4">
            <p className="font-mono text-xs bg-muted px-2 py-1 rounded-md">SKU: {product.sku}</p>
            <Button asChild variant="outline" size="sm">
                <Link href={`/search?keyword=${product.sku}`}>Ver Detalles</Link>
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
