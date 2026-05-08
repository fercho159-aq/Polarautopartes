'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';
import type { Product } from '@/types';
import { loadProductsFromCSV } from '@/lib/data-loader';

/**
 * HomeFilterBar — barra horizontal del Home (boceto):
 * Marca | Modelo | Año | Refacción | ¿Qué estás buscando? | Buscar
 *
 * Los dropdowns se cascadean: al elegir Marca se filtran Modelos, al elegir
 * Modelo se filtran Años. "Refacción" corresponde al campo `name` (ej. Bomba de
 * agua, Radiador, Condensador, Soporte). Al hacer click en Buscar redirige a
 * /search con los filtros aplicados.
 */
export function HomeFilterBar() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);

  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [line, setLine] = useState('');
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    loadProductsFromCSV().then(setProducts).catch(() => setProducts([]));
  }, []);

  const brands = useMemo(() => {
    const all = products.flatMap(p => p.applications.map(a => a.brand));
    return [...new Set(all)].filter(Boolean).sort();
  }, [products]);

  const models = useMemo(() => {
    if (!brand) return [];
    const all = products
      .flatMap(p => p.applications)
      .filter(a => a.brand === brand)
      .map(a => a.model);
    return [...new Set(all)].filter(Boolean).sort();
  }, [products, brand]);

  const years = useMemo(() => {
    if (!brand || !model) return [];
    const ranges = products
      .flatMap(p => p.applications)
      .filter(a => a.brand === brand && a.model === model)
      .map(a => a.years);
    const ys = new Set<number>();
    ranges.forEach(r => {
      if (!r) return;
      const parts = r.split('-').map(s => parseInt(s.trim(), 10));
      if (parts.length === 1 && !isNaN(parts[0])) ys.add(parts[0]);
      else if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
        for (let y = parts[0]; y <= parts[1]; y++) ys.add(y);
      }
    });
    return [...ys].sort((a, b) => b - a);
  }, [products, brand, model]);

  const lines = useMemo(() => {
    return [...new Set(products.map(p => p.name))].filter(Boolean).sort();
  }, [products]);

  const handleBrandChange = (v: string) => {
    setBrand(v);
    setModel('');
    setYear('');
  };

  const handleModelChange = (v: string) => {
    setModel(v);
    setYear('');
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (keyword) params.set('keyword', keyword);
    if (line) params.set('line', line);
    if (brand) params.set('brand', brand);
    if (model) params.set('model', model);
    if (year) params.set('year', year);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="w-full bg-polar-dark py-3">
      <div className="container mx-auto px-4">
        <form
          onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
          className="flex flex-col lg:flex-row items-stretch gap-2"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 lg:flex-shrink-0">
            <Select onValueChange={handleBrandChange} value={brand}>
              <SelectTrigger className="bg-white text-gray-700 h-10 rounded-full border-0 px-4 min-w-[120px]">
                <SelectValue placeholder="Marca" />
              </SelectTrigger>
              <SelectContent>
                {brands.map(b => (<SelectItem key={b} value={b}>{b}</SelectItem>))}
              </SelectContent>
            </Select>

            <Select onValueChange={handleModelChange} value={model} disabled={!brand}>
              <SelectTrigger className="bg-white text-gray-700 h-10 rounded-full border-0 px-4 min-w-[120px]">
                <SelectValue placeholder="Modelo" />
              </SelectTrigger>
              <SelectContent>
                {models.map(m => (<SelectItem key={m} value={m}>{m}</SelectItem>))}
              </SelectContent>
            </Select>

            <Select onValueChange={setYear} value={year} disabled={!model}>
              <SelectTrigger className="bg-white text-gray-700 h-10 rounded-full border-0 px-4 min-w-[100px]">
                <SelectValue placeholder="Año" />
              </SelectTrigger>
              <SelectContent>
                {years.map(y => (<SelectItem key={y} value={String(y)}>{y}</SelectItem>))}
              </SelectContent>
            </Select>

            <Select onValueChange={setLine} value={line}>
              <SelectTrigger className="bg-white text-gray-700 h-10 rounded-full border-0 px-4 min-w-[140px]">
                <SelectValue placeholder="Refacción" />
              </SelectTrigger>
              <SelectContent>
                {lines.map(l => (<SelectItem key={l} value={l}>{l}</SelectItem>))}
              </SelectContent>
            </Select>
          </div>

          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="¿Qué estás buscando?"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="bg-white text-gray-700 h-10 rounded-full border-0 pl-10 pr-4 w-full"
            />
          </div>

          <Button type="submit" className="bg-polar-cyan hover:bg-polar-cyan/90 text-white rounded-full h-10 px-6">
            Buscar
          </Button>
        </form>
      </div>
    </div>
  );
}
