import type { Product } from '@/types';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-4">
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
          <div className="text-sm">
            <p className="font-bold text-green-600">#KG: <span className="text-foreground font-normal">{product.sku}</span></p>
            <p className="font-bold text-green-600">Línea: <span className="text-foreground font-normal">{product.line}</span></p>
            <p className="font-bold text-green-600">OEM: <span className="text-foreground font-normal">{product.oem}</span></p>
            {product.specifications && <p className="font-bold text-green-600">Especificaciones: <span className="text-foreground font-normal">{product.specifications}</span></p>}
            {product.characteristics && <p className="font-bold text-green-600">Caracteristicas: <span className="text-foreground font-normal">{product.characteristics}</span></p>}
          </div>
        </div>
      </CardContent>
      <div className="px-4 pb-4">
        <Table>
          <TableHeader>
            <TableRow className="bg-green-600 hover:bg-green-700">
              <TableHead className="text-white font-bold">Marca</TableHead>
              <TableHead className="text-white font-bold">Modelo</TableHead>
              <TableHead className="text-white font-bold">Motor</TableHead>
              <TableHead className="text-white font-bold">Años</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {product.applications.map((app, index) => (
              <TableRow key={index} className={index % 2 === 0 ? 'bg-gray-800 text-white' : 'bg-white'}>
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
