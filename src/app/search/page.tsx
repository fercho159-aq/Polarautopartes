
'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductList } from '@/components/product-list';
import { SearchFilters, type SearchCriteria } from '@/components/search-filters';
import { Card } from '@/components/ui/card';
import type { Product } from '@/types';
import { loadProductsFromCSV } from '@/lib/data-loader';

function SearchPageContent() {
  const searchParams = useSearchParams();
  const initialLine = searchParams.get('line') || '';

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const products = await loadProductsFromCSV();
      setAllProducts(products);

      // Apply initial filter if line is present in URL
      if (initialLine) {
        const initiallyFiltered = products.filter(p => p.line === initialLine);
        setFilteredProducts(initiallyFiltered);
      } else {
        setFilteredProducts(products);
      }
      
      setIsLoading(false);
    }
    fetchData();
  }, [initialLine]);

  const handleSearch = (criteria: SearchCriteria) => {
    const { keyword, brand, model, year, line } = criteria;
    
    let products = allProducts.filter(product => {
      const keywordMatch = keyword 
        ? product.name.toLowerCase().includes(keyword.toLowerCase()) ||
          product.sku.toLowerCase().includes(keyword.toLowerCase()) ||
          (product.description && product.description.toLowerCase().includes(keyword.toLowerCase()))
        : true;

      const brandMatch = brand 
        ? product.applications.some(app => app.brand.toLowerCase() === brand.toLowerCase())
        : true;
      
      const modelMatch = model
        ? product.applications.some(app => app.model.toLowerCase() === model.toLowerCase())
        : true;

      const yearMatch = year
        ? product.applications.some(app => {
            const yearNumber = parseInt(year);
            // Handle year ranges like '2006-2008' and single years like '2009'
            const yearParts = String(app.years).split('-').map(y => parseInt(y.trim()));
            if (yearParts.length > 1) {
              return yearNumber >= yearParts[0] && yearNumber <= yearParts[1];
            }
            return yearNumber === yearParts[0];
          })
        : true;

      const lineMatch = line ? product.line === line : true;

      return keywordMatch && brandMatch && modelMatch && yearMatch && lineMatch;
    });

    setFilteredProducts(products);
  };
  
  const handleClear = () => {
    setFilteredProducts(allProducts);
  };

  return (
    <div>
      <section className="text-center my-12 container mx-auto px-4">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4">
          Catálogo de Productos
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Utiliza nuestra búsqueda avanzada para localizar exactamente lo que necesitas en nuestro extenso catálogo.
        </p>
      </section>

      <Card className="rounded-none w-full sticky top-14 z-40 shadow-md">
        <div className="container mx-auto px-4 py-8">
          <SearchFilters onSearch={handleSearch} onClear={handleClear} initialLine={initialLine} />
        </div>
      </Card>
      
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
            <p className="text-center">Cargando productos...</p>
        ) : (
            <ProductList products={filteredProducts} />
        )}
      </div>
    </div>
  );
}


export default function SearchPage() {
    return (
        <Suspense fallback={<div>Cargando...</div>}>
            <SearchPageContent />
        </Suspense>
    )
}

