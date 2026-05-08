import type { Product } from '@/types';
import { ProductListItem } from './product-list-item';
import { Separator } from './ui/separator';
import React from 'react';

interface ProductListProps {
  products: Product[];
}

export function ProductList({ products }: ProductListProps) {
  if (products.length === 0) {
    return (
        <div className="text-center py-16 px-4">
            <h3 className="font-headline text-2xl font-bold text-primary mb-2">Catálogo en actualización</h3>
            <p className="text-muted-foreground mb-4">
              Estamos cargando los productos de esta categoría. Para cotizaciones inmediatas
              contáctanos por WhatsApp.
            </p>
            <a
              href="https://wa.me/5218116924693"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-polar-cyan hover:bg-polar-cyan/90 text-white font-semibold px-6 py-2 rounded-full transition-colors"
            >
              Cotizar por WhatsApp
            </a>
        </div>
    )
  }

  return (
    <div>
      <h2 className="font-headline text-3xl font-bold mb-4">Resultados de la Búsqueda <span className="text-muted-foreground font-normal text-2xl">({products.length})</span></h2>
      <div className="flex flex-col gap-4">
        {products.map((product, index) => (
          <React.Fragment key={product.id}>
            <ProductListItem product={product} />
            {index < products.length - 1 && <Separator />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
