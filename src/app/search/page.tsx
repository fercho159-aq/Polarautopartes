

'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ProductList } from '@/components/product-list';
import { SearchFilters, type SearchCriteria } from '@/components/search-filters';
import type { Product } from '@/types';
import { loadProductsFromCSV } from '@/lib/data-loader';
import { ContactSection } from '@/components/contact-section';

function SearchPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialBrand = searchParams.get('brand') || '';
  const initialModel = searchParams.get('model') || '';
  const initialYear = searchParams.get('year') || '';
  const initialKeyword = searchParams.get('keyword') || '';


  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

   const applyFilters = (products: Product[], criteria: SearchCriteria) => {
    const { keyword, brand, model, year, motor } = criteria;
    
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
      
      const motorMatch = motor
        ? product.applications.some(app => app.motor === motor)
        : true;

      const line = searchParams.get('line');
      const lineMatch = line ? product.line === line : true;

      return keywordMatch && brandMatch && modelMatch && yearMatch && lineMatch && motorMatch;
    });
  };

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const products = await loadProductsFromCSV();
      setAllProducts(products);

      const initialCriteria: SearchCriteria = {
        brand: initialBrand,
        model: initialModel,
        year: initialYear,
        keyword: initialKeyword,
        motor: searchParams.get('motor') || '',
      };

      if (Object.values(initialCriteria).some(v => v) || searchParams.get('line')) {
        const initiallyFiltered = applyFilters(products, initialCriteria);
        setFilteredProducts(initiallyFiltered);
      } else {
        setFilteredProducts(products);
      }
      
      setIsLoading(false);
    }
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (criteria: SearchCriteria) => {
     const params = new URLSearchParams();
    if (criteria.keyword) params.set('keyword', criteria.keyword);
    if (criteria.brand) params.set('brand', criteria.brand);
    if (criteria.model) params.set('model', criteria.model);
    if (criteria.year) params.set('year', criteria.year);
    if (criteria.motor) params.set('motor', criteria.motor);
    
    const line = searchParams.get('line');
    if (line) params.set('line', line);

    // Using replace to avoid bloating browser history on every filter change
    router.replace(`/search?${params.toString()}`);
    
    setIsLoading(true);
    const filtered = applyFilters(allProducts, criteria);
    setFilteredProducts(filtered);
    setIsLoading(false);

  };
  
  const handleClear = () => {
    router.push('/search');
    setFilteredProducts(allProducts);
  };

  return (
    <>
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <aside className="lg:col-span-5 lg:sticky top-24 h-max z-20">
            <SearchFilters 
              onSearch={handleSearch} 
              onClear={handleClear} 
            />
        </aside>

        <main className="lg:col-span-7">
            {isLoading ? (
                <div className="text-center py-16">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-muted-foreground">Cargando productos...</p>
                </div>
            ) : (
                <ProductList products={filteredProducts} />
            )}
        </main>
      </div>
    </div>
    <ContactSection />
    </>
  );
}


export default function SearchPage() {
    return (
        <Suspense fallback={<div>Cargando...</div>}>
            <SearchPageContent />
        </Suspense>
    )
}
