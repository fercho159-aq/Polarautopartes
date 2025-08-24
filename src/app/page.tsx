
'use client';

import { useState, useEffect } from 'react';
import { ProductList } from '@/components/product-list';
import { SearchFilters, type SearchCriteria } from '@/components/search-filters';
import { Card } from '@/components/ui/card';
import type { Product } from '@/types';
import { loadProductsFromCSV } from '@/lib/data-loader';
import { mockProducts } from '@/lib/mock-data';

export default function Home() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const products = await loadProductsFromCSV();
      // Fallback to mock data if CSV loading fails or is empty
      const initialProducts = products.length > 0 ? products : mockProducts;
      setAllProducts(initialProducts);
      setFilteredProducts(initialProducts);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const handleSearch = (criteria: SearchCriteria) => {
    const { keyword, brand, model, year, line } = criteria;
    
    let products = allProducts.filter(product => {
      const keywordMatch = keyword 
        ? product.name.toLowerCase().includes(keyword.toLowerCase()) ||
          product.sku.toLowerCase().includes(keyword.toLowerCase()) ||
          product.description.toLowerCase().includes(keyword.toLowerCase())
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
    setFilteredProducts(allProducts);
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
        {isLoading ? (
            <p>Cargando productos...</p>
        ) : (
            <ProductList products={filteredProducts} />
        )}
      </div>
    </div>
  );
}
