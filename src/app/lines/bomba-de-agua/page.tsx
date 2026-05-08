
'use client';

import { useEffect, useState } from 'react';
import { ProductList } from '@/components/product-list';
import type { Product } from '@/types';
import { loadProductsFromCSV } from '@/lib/data-loader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, SlidersHorizontal, Info } from 'lucide-react';
import { LineInfoSection } from '@/components/line-info-section';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function BombaDeAguaPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  const [modelFilter, setModelFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const allProducts = await loadProductsFromCSV();
      const filtered = allProducts.filter(p => p.name.toLowerCase() === 'bomba de agua');
      setProducts(filtered);
      setFilteredProducts(filtered);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    let result = products;
    if (searchQuery) {
      result = result.filter(p =>
        p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (brandFilter) {
      result = result.filter(p =>
        p.applications.some(a => a.brand.toLowerCase().includes(brandFilter.toLowerCase()))
      );
    }
    if (modelFilter) {
      result = result.filter(p =>
        p.applications.some(a => a.model.toLowerCase().includes(modelFilter.toLowerCase()))
      );
    }
    if (yearFilter) {
      result = result.filter(p =>
        p.applications.some(a => a.years.includes(yearFilter))
      );
    }
    setFilteredProducts(result);
  }, [searchQuery, brandFilter, modelFilter, yearFilter, products]);

  // Get unique brands and models from applications
  const uniqueBrands = [...new Set(products.flatMap(p => p.applications.map(a => a.brand)))].filter(Boolean).sort();
  const uniqueModels = [...new Set(products.flatMap(p => p.applications.map(a => a.model)))].filter(Boolean).sort();

  return (
    <div className="bg-white min-h-screen">
      <LineInfoSection
        title="la Bomba de Agua"
        description="Es un componente mecánico o eléctrico que impulsa el refrigerante (agua o anticongelante) a través del motor, el radiador y el sistema de calefacción. Se acciona normalmente por una banda o cadena conectada al cigüeñal."
        quote="La bomba de agua es el corazón del sistema de enfriamiento: hace circular la vida del motor."
        anatomyImage="/Images/Anatomia/bomba-de-agua-anatomia.png"
        anatomyImageAlt="Anatomía de la bomba de agua — partes y componentes"
        steps={[
          { text: 'La bomba toma el refrigerante frío del radiador.' },
          { text: 'Lo impulsa hacia el bloque del motor, donde absorbe el calor.' },
          { text: 'Luego el líquido caliente vuelve al radiador, donde se enfría nuevamente.' },
          { text: 'Este ciclo se repite constantemente mientras el motor está encendido.' },
          { text: 'Si la bomba se detiene, el motor se sobrecalienta en minutos.' },
        ]}
      />

      {/* Filter Bar */}
      <div className="bg-gray-50 border-b sticky top-[104px] z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-wrap items-center gap-3">
            <Select value={brandFilter} onValueChange={setBrandFilter}>
              <SelectTrigger className="w-[140px] bg-white border-polar-dark">
                <SelectValue placeholder="Marca" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                {uniqueBrands.map(b => (
                  <SelectItem key={b} value={b}>{b}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={modelFilter} onValueChange={setModelFilter}>
              <SelectTrigger className="w-[140px] bg-white border-polar-dark">
                <SelectValue placeholder="Modelo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {uniqueModels.map(m => (
                  <SelectItem key={m} value={m}>{m}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={yearFilter} onValueChange={setYearFilter}>
              <SelectTrigger className="w-[120px] bg-white border-polar-dark">
                <SelectValue placeholder="Año" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {Array.from({ length: 30 }, (_, i) => String(2025 - i)).map(y => (
                  <SelectItem key={y} value={y}>{y}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-polar-dark text-white cursor-pointer">
              <SlidersHorizontal className="h-5 w-5" />
            </div>

            <div className="flex-1 min-w-[200px] relative">
              <Input
                placeholder="Buscar por pieza"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10 bg-white border-polar-dark"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-polar-dark" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Title and description */}
        <section className="mb-8">
          <h1 className="font-headline text-3xl md:text-4xl font-bold text-foreground mb-3">
            Bomba de Agua
          </h1>
          <p className="text-muted-foreground max-w-3xl">
            La bomba de agua se encarga de circular el líquido a través del circuito, proporcionando al refrigerante la presión y flujo necesarios en cualquier condición.
          </p>
          <div className="flex items-start gap-3 mt-4 bg-polar-dark/5 p-4 rounded-lg border border-polar-dark/20">
            <Info className="h-5 w-5 text-polar-dark mt-0.5 shrink-0" />
            <p className="text-sm text-muted-foreground">
              <strong>Nota:</strong> Una correcta instalación puede prevenir severos daños en el motor, es necesario verificar la ruta de la banda de accesorios en el manual de taller.
            </p>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Common failures */}
          <div className="lg:col-span-1">
            <Card className="bg-polar-dark text-white">
              <CardHeader>
                <CardTitle className="font-headline text-xl text-white">
                  Causas de Falla Comunes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-white/90">
                  <li>Existencia de sarro y óxido en el sistema.</li>
                  <li>Uso de anticongelante de mala calidad.</li>
                  <li>Fugas en los sellos.</li>
                  <li>Balero amarrado.</li>
                  <li>Defecto de fabricación.</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Product listing */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="text-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-polar-dark mx-auto"></div>
                <p className="mt-4 text-muted-foreground">Cargando productos...</p>
              </div>
            ) : (
              <ProductList products={filteredProducts} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
