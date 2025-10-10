

'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import type { Product } from '@/types';
import { loadProductsFromCSV } from '@/lib/data-loader';

export interface SearchCriteria {
    keyword: string;
    brand: string;
    model: string;
    year: string;
    motor: string;
}

interface SearchFiltersProps {
    onSearch: (criteria: SearchCriteria) => void;
    onClear: () => void;
    initialLine?: string;
    variant?: 'default' | 'compact';
    hideKeywordSearch?: boolean;
    hideTitle?: boolean;
}

export function SearchFilters({ 
    onSearch, 
    onClear, 
    initialLine = '',
    variant = 'default',
    hideKeywordSearch = false,
    hideTitle = false
}: SearchFiltersProps) {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [keyword, setKeyword] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMotor, setSelectedMotor] = useState('');
  
  const [brands, setBrands] = useState<string[]>([]);
  const [availableModels, setAvailableModels] = useState<string[]>([]);
  const [availableYears, setAvailableYears] = useState<string[]>([]);
  const [availableMotors, setAvailableMotors] = useState<string[]>([]);
  
  const [debouncedKeyword, setDebouncedKeyword] = useState(keyword);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [keyword]);


  useEffect(() => {
    async function loadData() {
      const products = await loadProductsFromCSV();
      setAllProducts(products);

      const allApps = products.flatMap(p => p.applications);
      const uniqueBrands = [...new Set(allApps.map(app => app.brand))].filter(Boolean).sort();
      
      setBrands(uniqueBrands);
    }
    loadData();
  }, []);

  useEffect(() => {
    const criteria: SearchCriteria = {
        keyword: debouncedKeyword,
        brand: selectedBrand,
        model: selectedModel,
        year: selectedYear,
        motor: selectedMotor,
    };
    // Trigger search if any filter has a value.
    if (Object.values(criteria).some(val => val !== '')) {
      onSearch(criteria);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedKeyword, selectedBrand, selectedModel, selectedYear, selectedMotor]);

  const getYearsFromRange = (range: string): number[] => {
    if (!range) return [];
    const parts = range.split('-').map(y => parseInt(y.trim()));
    if (parts.length > 1 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      const years = [];
      for (let y = parts[0]; y <= parts[1]; y++) {
        years.push(y);
      }
      return years;
    }
    if (!isNaN(parts[0])) return [parts[0]];
    return [];
  };

  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand);
    setSelectedModel('');
    setSelectedYear('');
    setSelectedMotor('');

    const modelsForBrand = allProducts
      .flatMap(p => p.applications)
      .filter(app => app.brand === brand)
      .map(app => app.model);
      
    setAvailableModels([...new Set(modelsForBrand)].filter(Boolean).sort());
    setAvailableYears([]);
    setAvailableMotors([]);
  };

  const handleModelChange = (model: string) => {
    setSelectedModel(model);
    setSelectedYear('');
    setSelectedMotor('');

    const appsForModel = allProducts
        .flatMap(p => p.applications)
        .filter(app => app.brand === selectedBrand && app.model === model);

    const yearsForModel = appsForModel.flatMap(app => getYearsFromRange(app.years));
    setAvailableYears([...new Set(yearsForModel)].sort((a,b) => b-a).map(String).filter(Boolean));

    const motorsForModel = appsForModel.map(app => app.motor);
    setAvailableMotors([...new Set(motorsForModel)].filter(Boolean).sort());
  };

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
  }

  const handleClear = () => {
    setKeyword('');
    setSelectedBrand('');
    setSelectedModel('');
    setSelectedYear('');
    setSelectedMotor('');
    setAvailableModels([]);
    setAvailableYears([]);
    setAvailableMotors([]);
    onClear();
  };

  if (variant === 'compact') {
      return (
        <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center gap-3">
            <Select onValueChange={handleBrandChange} value={selectedBrand}>
              <SelectTrigger>
                <SelectValue placeholder="Marca" />
              </SelectTrigger>
              <SelectContent>
                {brands.map((brand) => (
                  <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={handleModelChange} value={selectedModel} disabled={!selectedBrand}>
              <SelectTrigger>
                <SelectValue placeholder="Modelo" />
              </SelectTrigger>
              <SelectContent>
                {availableModels.map((model) => (
                  <SelectItem key={model} value={model}>{model}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={handleYearChange} value={selectedYear} disabled={!selectedModel}>
              <SelectTrigger>
                <SelectValue placeholder="Año" />
              </SelectTrigger>
              <SelectContent>
                {availableYears.map((year) => (
                  <SelectItem key={year} value={String(year)}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>
             <Select onValueChange={setSelectedMotor} value={selectedMotor} disabled={!selectedModel}>
                <SelectTrigger>
                    <SelectValue placeholder="Motor" />
                </SelectTrigger>
                <SelectContent>
                    {availableMotors.map(motor => (
                       <SelectItem key={motor} value={motor}>{motor}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </form>
      )
  }

  return (
    <Card className="shadow-lg border-border bg-card">
        {!hideTitle && (
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline text-2xl text-primary">
                <SlidersHorizontal className="h-6 w-6" />
                Búsqueda Avanzada
                </CardTitle>
            </CardHeader>
        )}
      <CardContent className={cn(hideTitle && "pt-6")}>
        <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {!hideKeywordSearch && (
            <div className="md:col-span-2 relative">
                <Label htmlFor="keyword-search">Búsqueda por Palabra Clave</Label>
                <Search className="absolute left-3 bottom-3 h-4 w-4 text-muted-foreground" />
                <Input 
                id="keyword-search"
                placeholder="Buscar por nombre, SKU, descripción..." 
                className="pl-10" 
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                />
            </div>
          )}
          
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
                <Label htmlFor="brand-select">Marca</Label>
                <Select onValueChange={handleBrandChange} value={selectedBrand}>
                <SelectTrigger id="brand-select">
                    <SelectValue placeholder="Selecciona" />
                </SelectTrigger>
                <SelectContent>
                    {brands.map((brand) => (
                    <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                    ))}
                </SelectContent>
                </Select>
            </div>
            <div className="flex flex-col gap-1.5">
                <Label htmlFor="model-select">Modelo</Label>
                <Select onValueChange={handleModelChange} value={selectedModel} disabled={!selectedBrand}>
                <SelectTrigger id="model-select">
                    <SelectValue placeholder="Selecciona" />
                </SelectTrigger>
                <SelectContent>
                    {availableModels.map((model) => (
                    <SelectItem key={model} value={model}>{model}</SelectItem>
                    ))}
                </SelectContent>
                </Select>
            </div>
            <div className="flex flex-col gap-1.5">
                <Label htmlFor="year-select">Año</Label>
                <Select onValueChange={handleYearChange} value={selectedYear} disabled={!selectedModel}>
                <SelectTrigger id="year-select">
                    <SelectValue placeholder="Selecciona" />
                </SelectTrigger>
                <SelectContent>
                    {availableYears.map((year) => (
                    <SelectItem key={year} value={String(year)}>{year}</SelectItem>
                    ))}
                </SelectContent>
                </Select>
            </div>
             <div className="flex flex-col gap-1.5">
                <Label htmlFor="motor-select">Motor</Label>
                <Select onValueChange={setSelectedMotor} value={selectedMotor} disabled={!selectedModel}>
                    <SelectTrigger id="motor-select">
                        <SelectValue placeholder="Selecciona" />
                    </SelectTrigger>
                    <SelectContent>
                        {availableMotors.map(motor => (
                            <SelectItem key={motor} value={motor}>{motor}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 md:col-span-2">
            <Button type="button" variant="outline" className="w-full text-lg py-6" onClick={handleClear}>
               <X className="mr-2 h-5 w-5" />
              Limpiar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
