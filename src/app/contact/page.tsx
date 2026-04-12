'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <h1 className="font-headline text-3xl md:text-4xl font-bold text-polar-dark text-center mb-12">
          Contáctanos
        </h1>

        {/* Map + Form grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Map */}
          <div className="relative rounded-2xl overflow-hidden min-h-[400px]">
            <Image
              src="/Images/a8.png"
              alt="Mapa de ubicación - Jesus Cantu Leal #1423, Monterrey"
              fill
              className="object-cover"
              data-ai-hint="map location"
            />
          </div>

          {/* Contact form */}
          <div>
            <h2 className="font-headline text-xl font-bold mb-6">Envíanos un Mensaje</h2>
            <form className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-sm font-medium">Nombre</Label>
                <Input id="name" placeholder="Tu nombre completo" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                <Input id="email" type="email" placeholder="tu@email.com" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="message" className="text-sm font-medium">Mensaje</Label>
                <Textarea id="message" placeholder="Escribe tu consulta aqui..." rows={6} className="mt-1" />
              </div>
              <Button type="submit" className="w-full bg-gray-400 hover:bg-gray-500 text-white">
                Enviar
              </Button>
            </form>
          </div>
        </div>

        {/* Store photos row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
            <Image src="/Images/WebPolar/Contacto/tienda-1.png" alt="Tienda Polar Autopartes - Fachada" fill className="object-cover" />
          </div>
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
            <Image src="/Images/WebPolar/Contacto/tienda-2.png" alt="Tienda Polar Autopartes - Exterior" fill className="object-cover" />
          </div>
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
            <Image src="/Images/WebPolar/Contacto/tienda-3.png" alt="Tienda Polar Autopartes - Vista lateral" fill className="object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
}
