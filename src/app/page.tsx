
'use client';

import { useState } from 'react';
import { ProductList } from '@/components/product-list';
import { SearchFilters, type SearchCriteria } from '@/components/search-filters';
import { mockProducts } from '@/lib/mock-data';
import { Card } from '@/components/ui/card';
import type { Product } from '@/types';

export default function Home() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);

  const handleSearch = (criteria: SearchCriteria) => {
    const { keyword, brand, model, year, line } = criteria;
    
    let products = mockProducts.filter(product => {
      const keywordMatch = keyword 
        ? product.name.toLowerCase().includes(keyword.toLowerCase()) ||
          product.sku.toLowerCase().includes(keyword.toLowerCase()) ||
          product.description.toLowerCase().includes(keyword.toLowerCase())
        : true;

      const brandMatch = brand 
        ? product.applications.some(app => app.brand === brand)
        : true;
      
      const modelMatch = model
        ? product.applications.some(app => app.model === model)
        : true;

      const yearMatch = year
        ? product.applications.some(app => {
            const yearNumber = parseInt(year);
            const [startYear, endYear] = app.years.split(' - ').map(Number);
            if (endYear) {
              return yearNumber >= startYear && yearNumber <= endYear;
            }
            return yearNumber === startYear;
          })
        : true;

      const lineMatch = line ? product.line === line : true;

      return keywordMatch && brandMatch && modelMatch && yearMatch && lineMatch;
    });

    setFilteredProducts(products);
  };
  
  const handleClear = () => {
    setFilteredProducts(mockProducts);
  };

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
          <SearchFilters onSearch={handleSearch} onClear={handleClear} />
        </div>
      </Card>
      
      <div className="container mx-auto px-4 py-8">
        <ProductList products={filteredProducts} />
      </div>
    </div>
  );
}
