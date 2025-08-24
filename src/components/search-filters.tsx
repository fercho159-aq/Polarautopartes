

'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { vehicleData, mockLines } from '@/lib/mock-data';
import { Label } from '@/components/ui/label';

const brands = [...new Set(vehicleData.map(item => item.brand))].sort();

export interface SearchCriteria {
    keyword: string;
    brand: string;
    model: string;
    year: string;
    line: string;
}

interface SearchFiltersProps {
    onSearch: (criteria: SearchCriteria) => void;
    onClear: () => void;
    initialLine?: string;
}

export function SearchFilters({ onSearch, onClear, initialLine = '' }: SearchFiltersProps) {
  const [keyword, setKeyword] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedLine, setSelectedLine] = useState(initialLine);
  
  const [availableModels, setAvailableModels] = useState<{name: string; years: number[]}[]>([]);
  const [availableYears, setAvailableYears] = useState<number[]>([]);

  useEffect(() => {
    setSelectedLine(initialLine);
  }, [initialLine]);

  useEffect(() => {
    if (initialLine) {
        handleSubmit(new Event('submit') as unknown as React.FormEvent);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialLine]);

  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand);
    setSelectedModel('');
    setSelectedYear('');
    setAvailableYears([]);
    
    const modelsForBrand = vehicleData
      .filter(item => item.brand === brand)
      .flatMap(item => item.models);
      
    const uniqueModels = Array.from(new Map(modelsForBrand.map(m => [m.name, m])).values())
      .sort((a, b) => a.name.localeCompare(b.name));
      
    setAvailableModels(uniqueModels);
  };

  const handleModelChange = (modelName: string) => {
    setSelectedModel(modelName);
    setSelectedYear('');
    
    const yearsForModel = vehicleData
      .filter(item => item.brand === selectedBrand)
      .flatMap(item => item.models)
      .filter(model => model.name === modelName)
      .flatMap(model => model.years);
      
    const uniqueYears = [...new Set(yearsForModel)].sort((a, b) => b - a);
    setAvailableYears(uniqueYears);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
        keyword,
        brand: selectedBrand,
        model: selectedModel,
        year: selectedYear,
        line: selectedLine,
    });
  };

  const handleClear = () => {
    setKeyword('');
    setSelectedBrand('');
    setSelectedModel('');
    setSelectedYear('');
    setSelectedLine('');
    setAvailableModels([]);
    setAvailableYears([]);
    onClear();
  };

  return (
    <Card className="shadow-lg border-border bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-2xl text-primary">
          <SlidersHorizontal className="h-6 w-6" />
          Búsqueda Avanzada
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-3 relative">
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
          <div>
            <Label htmlFor="brand-select">Marca</Label>
            <Select onValueChange={handleBrandChange} value={selectedBrand}>
              <SelectTrigger id="brand-select">
                <SelectValue placeholder="Selecciona Marca" />
              </SelectTrigger>
              <SelectContent>
                {brands.map((brand) => (
                  <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
             <Label htmlFor="model-select">Modelo</Label>
            <Select onValueChange={handleModelChange} value={selectedModel} disabled={!selectedBrand}>
              <SelectTrigger id="model-select">
                <SelectValue placeholder="Selecciona Modelo" />
              </SelectTrigger>
              <SelectContent>
                {availableModels.map((model) => (
                  <SelectItem key={model.name} value={model.name}>{model.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
           <div>
            <Label htmlFor="year-select">Año</Label>
            <Select onValueChange={setSelectedYear} value={selectedYear} disabled={!selectedModel}>
              <SelectTrigger id="year-select">
                <SelectValue placeholder="Selecciona Año" />
              </SelectTrigger>
              <SelectContent>
                {availableYears.map((year) => (
                  <SelectItem key={year} value={String(year)}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>
           </div>
          <div className="lg:col-span-3">
             <Label htmlFor="line-select">Línea de Producto</Label>
            <Select onValueChange={setSelectedLine} value={selectedLine}>
              <SelectTrigger id="line-select">
                <SelectValue placeholder="Selecciona Línea de partes" />
              </SelectTrigger>
              <SelectContent>
                {mockLines.map((line) => (
                  <SelectItem key={line} value={line}>{line}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 lg:col-span-3">
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-lg py-6">
              <Search className="mr-2 h-5 w-5" />
              Buscar
            </Button>
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
