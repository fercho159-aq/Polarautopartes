import type { Product } from '@/types';
import { ProductCard } from './product-card';

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
      <h2 className="font-headline text-3xl font-bold mb-6">Resultados de la Búsqueda</h2>
      <div className="grid grid-cols-1 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
