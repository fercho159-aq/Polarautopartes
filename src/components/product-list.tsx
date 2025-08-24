import type { Product } from '@/types';
import { ProductListItem } from './product-list-item';
import { Separator } from './ui/separator';

interface ProductListProps {
  products: Product[];
}

export function ProductList({ products }: ProductListProps) {
  if (products.length === 0) {
    return (
        <div className="text-center py-16">
            <h3 className="font-headline text-2xl font-bold text-primary mb-2">No se encontraron productos</h3>
            <p className="text-muted-foreground">Intenta ajustar tus filtros de búsqueda o límpialos para ver todo el catálogo.</p>
        </div>
    )
  }

  return (
    <div>
      <h2 className="font-headline text-3xl font-bold mb-4">Resultados de la Búsqueda <span className="text-muted-foreground font-normal text-2xl">({products.length})</span></h2>
      <div className="flex flex-col gap-4">
        {products.map((product, index) => (
          <>
            <ProductListItem key={product.id} product={product} />
            {index < products.length - 1 && <Separator />}
          </>
        ))}
      </div>
    </div>
  );
}
