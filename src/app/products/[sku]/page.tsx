
'use client';

import { useEffect, useState } from 'react';
import { loadProductsFromCSV } from '@/lib/data-loader';
import type { Product } from '@/types';
import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// This is a workaround for a Next.js bug where params are not properly decoded
function safeDecode(uriComponent: string) {
    try {
        return decodeURIComponent(uriComponent)
    } catch {
        return uriComponent
    }
}

function ProductDetailContent({ sku }: { sku: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProduct() {
      if (!sku) return;
      setLoading(true);
      const allProducts = await loadProductsFromCSV();
      const foundProduct = allProducts.find(p => p.sku === sku);
      setProduct(foundProduct || null);
      setLoading(false);
    }
    getProduct();
  }, [sku]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-muted-foreground">Cargando producto...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="font-headline text-3xl font-bold text-destructive">Producto no encontrado</h1>
        <p className="text-muted-foreground mt-2">No pudimos encontrar un producto con el SKU: {sku}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="lg:col-span-2">
            <ProductCard product={product} />
        </div>
      </div>

      <section id="contacto" className="py-16 mt-8">
        <div className="container mx-auto px-4">
           <h2 className="text-3xl font-headline font-bold text-center text-primary mb-12">¿Tienes Dudas sobre este Producto?</h2>
          <Card className="shadow-lg">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-12">
                  <div>
                      <h3 className="font-headline text-2xl font-bold mb-6">Envíanos un Mensaje</h3>
                      <form className="space-y-4">
                        <div>
                          <Label htmlFor="name-contact">Nombre</Label>
                          <Input id="name-contact" placeholder="Tu nombre completo" />
                        </div>
                          <div>
                          <Label htmlFor="email-contact">Email</Label>
                          <Input id="email-contact" type="email" placeholder="tu@email.com" />
                        </div>
                        <div>
                          <Label htmlFor="product-inquiry">Producto</Label>
                          <Input id="product-inquiry" readOnly value={`${product.name} (SKU: ${product.sku})`} />
                        </div>
                          <div>
                          <Label htmlFor="message-contact">Mensaje</Label>
                          <Textarea id="message-contact" placeholder="Escribe tu consulta aquí..." rows={5} />
                        </div>
                        <Button type="submit" className="w-full bg-primary hover:bg-primary/90">Enviar Consulta</Button>
                      </form>
                  </div>
                   <div>
                       <h3 className="font-headline text-2xl font-bold mb-6">Información de Contacto</h3>
                       <div className="space-y-6 text-muted-foreground">
                          <div className="flex items-start gap-4">
                              <MapPin className="h-6 w-6 text-primary mt-1"/>
                              <div>
                                  <p className="font-semibold text-foreground">Dirección</p>
                                  <p>Jesus Cantu Leal #1423, Monterrey, Mexico</p>
                              </div>
                          </div>
                          <div className="flex items-start gap-4">
                              <Phone className="h-6 w-6 text-primary mt-1"/>
                               <div>
                                  <p className="font-semibold text-foreground">Teléfonos</p>
                                  <p>+52 81 1692 4693</p>
                                  <p>WhatsApp: +52 1 81 1692 4693</p>
                              </div>
                          </div>
                          <div className="flex items-start gap-4">
                              <Mail className="h-6 w-6 text-primary mt-1"/>
                              <div>
                                 <p className="font-semibold text-foreground">Correos</p>
                                 <p>admon@polarautopartes.com</p>
                             </div>
                          </div>
                       </div>
                   </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}


export default function ProductDetailPage({ params }: { params: { sku: string } }) {
    // We decode the sku here and pass it to the client component
    const sku = safeDecode(params.sku);

    return <ProductDetailContent sku={sku} />;
}
