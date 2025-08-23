import { CoverageStats } from '@/components/coverage-stats';
import { ProductList } from '@/components/product-list';
import { SearchFilters } from '@/components/search-filters';
import { mockProducts } from '@/lib/mock-data';

export default function Home() {
  // In a real app, these values would come from a database query
  const totalModelsCovered = 450;
  const fleetCoveragePercentage = 85;

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4">
          Encuentra la Parte Perfecta para tu Vehículo
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Utiliza nuestra búsqueda avanzada para localizar exactamente lo que necesitas en nuestro extenso catálogo.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <div className="sticky top-20">
            <SearchFilters />
            <CoverageStats
              modelsCovered={totalModelsCovered}
              coveragePercentage={fleetCoveragePercentage}
            />
          </div>
        </aside>

        <main className="lg:col-span-3">
          <ProductList products={mockProducts} />
        </main>
      </div>
    </div>
  );
}
