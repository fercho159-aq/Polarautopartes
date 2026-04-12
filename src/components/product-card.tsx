import type { Product } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const whatsappMessage = encodeURIComponent(`Hola, me interesa cotizar: ${product.name} - SKU: ${product.sku}`);
  const whatsappUrl = `https://wa.me/5218116924693?text=${whatsappMessage}`;

  return (
    <div className="bg-white">
      {/* Product header section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Image */}
        <div>
          <div className="relative aspect-square w-full border rounded-xl overflow-hidden bg-gray-50">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-contain p-8"
              data-ai-hint="car part"
            />
          </div>
          {/* Thumbnail placeholders */}
          <div className="flex gap-3 mt-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-20 h-20 border rounded-lg bg-gray-100 overflow-hidden relative">
                <Image
                  src={product.imageUrl}
                  alt={`${product.name} vista ${i}`}
                  fill
                  className="object-contain p-2 opacity-60"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center">
          <h1 className="font-headline text-3xl md:text-4xl font-bold text-polar-dark mb-1">
            {product.name}
          </h1>
          <p className="text-lg text-muted-foreground mb-4">{product.line}</p>

          {/* Star rating */}
          <div className="flex gap-1 mb-4">
            {[1, 2, 3, 4, 5].map(i => (
              <Star
                key={i}
                className={`h-6 w-6 ${i <= 2 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
              />
            ))}
          </div>

          {/* SKU and Brand badges */}
          <div className="flex gap-3 mb-6">
            <span className="px-4 py-2 border rounded-full text-sm font-medium">SKU: {product.sku}</span>
            <span className="px-4 py-2 border rounded-full text-sm font-medium">Marca: {product.brand}</span>
          </div>

          {/* WhatsApp Cotizar button */}
          <Button asChild size="lg" className="bg-green-500 hover:bg-green-600 text-white text-lg w-fit px-8">
            <Link href={whatsappUrl} target="_blank">
              <FaWhatsapp className="mr-2 h-6 w-6" />
              Cotizar
            </Link>
          </Button>
        </div>
      </div>

      {/* Description */}
      {product.description && (
        <div className="mb-8">
          <p className="text-muted-foreground leading-relaxed">{product.description}</p>
        </div>
      )}

      {/* Specifications */}
      {product.specifications && (
        <div className="mb-8">
          <p className="text-muted-foreground leading-relaxed">{product.specifications}</p>
        </div>
      )}

      {/* Compatible models table */}
      <div>
        <h3 className="font-headline text-lg font-bold text-polar-dark mb-4">Modelos Compatibles</h3>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-polar-dark hover:bg-polar-dark">
                <TableHead className="text-white font-bold">Marca</TableHead>
                <TableHead className="text-white font-bold">Modelo</TableHead>
                <TableHead className="text-white font-bold">Motor</TableHead>
                <TableHead className="text-white font-bold">Años</TableHead>
                <TableHead className="text-white font-bold"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {product.applications.map((app, index) => {
                const appWhatsapp = encodeURIComponent(`Hola, me interesa cotizar: ${product.name} (SKU: ${product.sku}) para ${app.brand} ${app.model} ${app.years}`);
                return (
                  <TableRow key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <TableCell>{app.brand}</TableCell>
                    <TableCell>{app.model}</TableCell>
                    <TableCell>{app.motor}</TableCell>
                    <TableCell>{app.years}</TableCell>
                    <TableCell>
                      <Link
                        href={`https://wa.me/5218116924693?text=${appWhatsapp}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 text-green-600 hover:text-green-700 text-sm font-medium"
                      >
                        <FaWhatsapp className="h-4 w-4" />
                        Cotizar
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
