
import { ProductCard } from "@/components/product-card";
import { Badge } from "@/components/ui/badge";
import { ContactSection } from "@/components/contact-section";
import { loadProductsFromCSV } from "@/lib/data-loader";
import { useEffect, useState } from "react";
import type { Product } from "@/types";

export default function NewProductsPage() {
  const [newProducts, setNewProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchNewProducts() {
      const allProducts = await loadProductsFromCSV();
      // For demo, we'll just take some as "new"
      setNewProducts(allProducts.slice(0, 4));
    }
    fetchNewProducts();
  }, []);


  return (
    <>
    <div className="container mx-auto px-4 py-12">
      <section className="text-center mb-12">
          <Badge className="mb-4 bg-accent text-accent-foreground hover:bg-accent/80">Novedad</Badge>
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4">
          Nuevos Productos y Anuncios
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Descubre las últimas adiciones a nuestro catálogo. ¡Calidad y rendimiento garantizados!
        </p>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {newProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <section className="mt-16 bg-card p-8 rounded-lg shadow-sm">
        <h2 className="font-headline text-3xl font-bold text-center mb-6">Próximamente</h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto">
          Estamos trabajando para expandir nuestra línea de productos de suspensión y dirección. ¡Espera noticias pronto sobre nuevas marcas y modelos compatibles!
        </p>
      </section>
    </div>
    <ContactSection />
    </>
  );
}
