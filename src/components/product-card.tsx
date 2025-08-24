import type { Product } from '@/types';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-4">
        <h1 className="font-headline text-2xl font-bold mb-4 text-primary">{product.name}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <Carousel className="w-full">
            <CarouselContent>
              <CarouselItem>
                <div className="relative aspect-square w-full">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover rounded-lg"
                    data-ai-hint="car part"
                  />
                </div>
              </CarouselItem>
                <CarouselItem>
                <div className="relative aspect-square w-full">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover rounded-lg"
                    data-ai-hint="car part detail"
                  />
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <div className="text-sm space-y-1">
            <p className="font-bold text-primary">#KG: <span className="text-foreground font-normal">{product.sku}</span></p>
            <p className="font-bold text-primary">Línea: <span className="text-foreground font-normal">{product.line}</span></p>
            <p className="font-bold text-primary">OEM: <span className="text-foreground font-normal">{product.oem}</span></p>
            {product.specifications && <p className="font-bold text-primary">Especificaciones: <span className="text-foreground font-normal">{product.specifications}</span></p>}
            {product.characteristics && <p className="font-bold text-primary">Caracteristicas: <span className="text-foreground font-normal">{product.characteristics}</span></p>}
          </div>
        </div>
      </CardContent>
      <div className="px-4 pb-4">
        <Table>
          <TableHeader>
            <TableRow className="bg-primary hover:bg-primary/90">
              <TableHead className="text-primary-foreground font-bold">Marca</TableHead>
              <TableHead className="text-primary-foreground font-bold">Modelo</TableHead>
              <TableHead className="text-primary-foreground font-bold">Motor</TableHead>
              <TableHead className="text-primary-foreground font-bold">Años</TableHead>
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
    </Card>
  );
}
