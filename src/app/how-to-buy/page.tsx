
import { ContactSection } from "@/components/contact-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Search, ShoppingCart, Truck } from "lucide-react";

export default function HowToBuyPage() {
  return (
    <>
    <div className="container mx-auto px-4 py-12">
      <section className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4">
          Cómo Comprar en Polar Autopartes
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Sigue estos sencillos pasos para encontrar y comprar las partes que necesitas para tu vehículo.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit mb-4">
                <Search className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="font-headline text-xl">1. Busca tu Parte</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Utiliza nuestros filtros avanzados por marca, modelo, año y más, o busca por palabra clave.</p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit mb-4">
                <ShoppingCart className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="font-headline text-xl">2. Agrega al Carrito</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Una vez que encuentres tu producto, agrégalo a tu carrito de compras para continuar.</p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit mb-4">
                <DollarSign className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="font-headline text-xl">3. Realiza el Pago</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Procede al pago seguro. Aceptamos múltiples métodos de pago para tu conveniencia.</p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit mb-4">
                <Truck className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="font-headline text-xl">4. Recibe tu Pedido</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Enviamos tu pedido a tu domicilio de forma rápida y segura. ¡Listo para instalar!</p>
          </CardContent>
        </Card>
      </div>
    </div>
    <ContactSection />
    </>
  );
}
