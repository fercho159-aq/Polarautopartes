
import { ProductList } from '@/components/product-list';
import { SearchFilters } from '@/components/search-filters';
import { mockProducts } from '@/lib/mock-data';
import { Card } from '@/components/ui/card';

export default function Home() {
  return (
    <div>
      <section className="text-center my-12 container mx-auto px-4">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4">
          Encuentra la Parte Perfecta para tu Vehículo
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Utiliza nuestra búsqueda avanzada para localizar exactamente lo que necesitas en nuestro extenso catálogo.
        </p>
      </section>

      <Card className="rounded-none w-full">
        <div className="container mx-auto px-4 py-8">
          <SearchFilters />
        </div>
      </Card>
      
      <div className="container mx-auto px-4 py-8">
        <ProductList products={mockProducts} />
      </div>
    </div>
  );
}
