import type { Product } from '@/types';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="relative aspect-square w-full">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            data-ai-hint="car part"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Badge variant="secondary" className="mb-2">{product.line}</Badge>
        <CardTitle className="font-headline text-lg mb-1">{product.name}</CardTitle>
        <p className="text-sm text-muted-foreground mb-2">SKU: {product.sku}</p>
        <p className="font-headline text-2xl font-bold text-primary">
          ${product.price.toFixed(2)}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="w-full flex flex-col sm:flex-row gap-2">
            <Button className="w-full bg-primary hover:bg-primary/90">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Agregar
            </Button>
            <Button variant="outline" className="w-full bg-accent hover:bg-accent/80 border-accent-foreground/20 text-accent-foreground">
                Comprar Ahora
            </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
