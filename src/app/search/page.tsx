
'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ProductList } from '@/components/product-list';
import { SearchFilters, type SearchCriteria } from '@/components/search-filters';
import type { Product } from '@/types';
import { loadProductsFromCSV } from '@/lib/data-loader';

function SearchPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialLine = searchParams.get('line') || '';
  const initialBrand = searchParams.get('brand') || '';
  const initialModel = searchParams.get('model') || '';
  const initialYear = searchParams.get('year') || '';
  const initialKeyword = searchParams.get('keyword') || '';


  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

   const applyFilters = (products: Product[], criteria: SearchCriteria) => {
    const { keyword, brand, model, year, line } = criteria;
    
    return products.filter(product => {
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
            if (!app.years) return false;
            const yearNumber = parseInt(year);
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
  };

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const products = await loadProductsFromCSV();
      setAllProducts(products);

      const initialCriteria = {
        line: initialLine,
        brand: initialBrand,
        model: initialModel,
        year: initialYear,
        keyword: initialKeyword,
      };

      if (initialLine || initialBrand || initialModel || initialYear || initialKeyword) {
        const initiallyFiltered = applyFilters(products, initialCriteria);
        setFilteredProducts(initiallyFiltered);
      } else {
        setFilteredProducts(products);
      }
      
      setIsLoading(false);
    }
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialLine, initialBrand, initialModel, initialYear, initialKeyword]);

  const handleSearch = (criteria: SearchCriteria) => {
     const params = new URLSearchParams();
    if (criteria.keyword) params.set('keyword', criteria.keyword);
    if (criteria.brand) params.set('brand', criteria.brand);
    if (criteria.model) params.set('model', criteria.model);
    if (criteria.year) params.set('year', criteria.year);
    if (criteria.line) params.set('line', criteria.line);
    
    router.push(`/search?${params.toString()}`);
  };
  
  const handleClear = () => {
    router.push('/search');
  };

  return (
    <div className="flex">
        <aside className="w-1/4 p-6 sticky top-16 h-screen-minus-header hidden lg:block">
           <SearchFilters onSearch={handleSearch} onClear={handleClear} initialLine={initialLine} />
        </aside>

        <main className="w-full lg:w-3/4 p-6">
            <div className="container mx-auto px-4 py-8">
                {isLoading ? (
                    <div className="text-center py-16">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                        <p className="mt-4 text-muted-foreground">Cargando productos...</p>
                    </div>
                ) : (
                    <ProductList products={filteredProducts} />
                )}
            </div>
        </main>
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

