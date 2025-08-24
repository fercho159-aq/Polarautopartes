
'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { vehicleData, mockLines } from '@/lib/mock-data';

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
}

export function SearchFilters({ onSearch, onClear }: SearchFiltersProps) {
  const [keyword, setKeyword] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedLine, setSelectedLine] = useState('');
  
  const [availableModels, setAvailableModels] = useState<{name: string; years: number[]}[]>([]);
  const [availableYears, setAvailableYears] = useState<number[]>([]);

  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand);
    setSelectedModel('');
    setSelectedYear('');
    setAvailableYears([]);
    const brandData = vehicleData.find(item => item.brand === brand);
    setAvailableModels(brandData ? brandData.models.sort((a,b) => a.name.localeCompare(b.name)) : []);
  };

  const handleModelChange = (modelName: string) => {
    setSelectedModel(modelName);
    setSelectedYear('');
    const modelData = availableModels.find(model => model.name === modelName);
    setAvailableYears(modelData ? modelData.years.sort((a, b) => b - a) : []);
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
    <Card className="shadow-none border-none">
      <CardHeader className="p-0 mb-6">
        <CardTitle className="flex items-center gap-2 font-headline text-xl">
          <SlidersHorizontal className="h-5 w-5" />
          Búsqueda Avanzada
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <div className="relative lg:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Buscar por palabra clave..." 
              className="pl-10" 
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
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
                <SelectItem key={model.name} value={model.name}>{model.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={setSelectedYear} value={selectedYear} disabled={!selectedModel}>
            <SelectTrigger>
              <SelectValue placeholder="Año" />
            </SelectTrigger>
            <SelectContent>
              {availableYears.map((year) => (
                <SelectItem key={year} value={String(year)}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={setSelectedLine} value={selectedLine}>
            <SelectTrigger>
              <SelectValue placeholder="Línea de partes" />
            </SelectTrigger>
            <SelectContent>
              {mockLines.map((line) => (
                <SelectItem key={line} value={line}>{line}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex flex-col sm:flex-row gap-2 lg:col-span-6">
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
              <Search className="mr-2 h-4 w-4" />
              Buscar
            </Button>
            <Button type="button" variant="outline" className="w-full" onClick={handleClear}>
               <X className="mr-2 h-4 w-4" />
              Limpiar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
